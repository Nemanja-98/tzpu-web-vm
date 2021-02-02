using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VMwareServer.Models;

namespace VMwareServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VMOperationController : ControllerBase
    {
        private VIMcmd prompt;
        private string ipAdr = "192.168.128.128";
        public VMOperationController(VIMcmd cmd)
        {
            prompt = cmd;
        }

        [HttpGet]
        [Route("vms")]
        public ActionResult GetVms()
        {
            try
            {
                string result = prompt.getAllVMs(ipAdr);
                return new JsonResult(new {vms = result});
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Data.ToString());
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("turnOn")]
        public ActionResult PostTurnOn(VmList vmArr)
        {
            foreach(VirtualMachine vm in vmArr.List)
            {
                if (!prompt.CorrectName(ipAdr, vm.Name))
                    return NotFound();
                else
                {
                    try
                    {
                        prompt.connectVMNetwork(ipAdr, vm.Name, prompt.PowerOn);
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex);
                    }
                }
            }
            return Ok();
        }

        [HttpPost]
        [Route("turnOff")]
        public ActionResult PostTurnOff(VmList vmArr)
        {
            foreach(VirtualMachine vm in vmArr.List)
            {
                if (!prompt.CorrectName(ipAdr, vm.Name))
                    return NotFound();
                else
                {
                    try
                    {
                        prompt.connectVMNetwork(ipAdr, vm.Name, prompt.PowerOff);
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex);
                    }
                }
            }
            return Ok();
        }

        [HttpGet]
        [Route("revertSnapshot/{vmName}")]
        public ActionResult GetRevert(string vmName)
        {
            string result;
            if (!prompt.CorrectName(ipAdr, vmName))
                return NotFound();
            else
            {
                try
                {
                    result = prompt.connectVMNetwork(ipAdr, vmName, prompt.Revert);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }
            return new JsonResult(new {curSnap = result});
        }

        [HttpGet]
        [Route("snapshots/{vmName}")]
        public ActionResult GetSnapshots(string vmName)
        {
            string result;
            if (!prompt.CorrectName(ipAdr, vmName))
                return NotFound();
            else
            {
                try
                {
                    result = prompt.connectVMNetwork(ipAdr, vmName, prompt.Snapshots);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }
            return new JsonResult(new {curSnap = result});
        }
    }
}
