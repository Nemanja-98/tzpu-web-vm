using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VMwareServer.Models;
using Microsoft.AspNetCore.Cors;


namespace VMwareServer.Controllers
{
    [EnableCors("TZPUPolicy")]
    [ApiController]
    [Route("[controller]")]
    public class VMOperationController : ControllerBase
    {
        private VIMcmd prompt;
        System.Diagnostics.Process process;
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

        [HttpPost]
        [Route("revertSnapshot")]
        public ActionResult GetRevert(VmList vmArr)
        {
            foreach(VirtualMachine vm in vmArr.List)
            {
                if (!prompt.CorrectName(ipAdr, vm.Name))
                    return NotFound();
                else
                {
                    try
                    {
                        prompt.connectVMNetwork(ipAdr, vm.Name, prompt.Revert);
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

        [HttpGet]
        [Route("state/{vmName}")]
        public ActionResult GetState(string vmName)
        {
            string result;
            if (!prompt.CorrectName(ipAdr, vmName))
                return NotFound();
            else
            {
                try
                {
                    result = prompt.connectVMNetwork(ipAdr, vmName, prompt.GetState);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }
            return new JsonResult(new {state = result});
        }

        [HttpGet]
        [Route("snapshotInfo/{vmName}")]
        public ActionResult GetSnapshotInfo(string vmName)
        {
            string result;
            if (!prompt.CorrectName(ipAdr, vmName))
                return NotFound();
            else
            {
                try
                {
                    result = prompt.connectVMNetwork(ipAdr, vmName, prompt.SnapshotInfo);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }
            return new JsonResult(new {state = result});
        }

        [HttpGet]
        [Route("guest/{vmName}")]
        public ActionResult GetGuest(string vmName)
        {
            string result;
            if (!prompt.CorrectName(ipAdr, vmName))
                return NotFound();
            else
            {
                try
                {
                    result = prompt.connectVMNetwork(ipAdr, vmName, prompt.GetGuest);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }
            return new JsonResult(new {ipAddress = result});
        }
        
        [HttpGet]
        [Route("setIp/{mask}")]
        public ActionResult GetSetIp(VmList vmArr, string mask)
        {
            foreach(VirtualMachine vm in vmArr.List)
            {
                string arString = "cd \"C:\\Program Files (x" +
                     "86)\\VMware\\VMware VIX\" && vmrun -gu windows -gp windows runProgramInGuest \"C:\\-4thGrade-\\TZPU\\" + vm.Name +
                     "\\" + vm.Name + ".vmx\" -nowait -interactive \"C:\\Windows\\System32\\netsh.exe\" interface ipv4 set address \"Local Area Connection\" static" + " " +
                     vm.IpAdr + " " + mask + " " + "192.168.128.2";

                process = new System.Diagnostics.Process();
                System.Diagnostics.ProcessStartInfo startInfo = new System.Diagnostics.ProcessStartInfo();
                startInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;
                startInfo.FileName = "cmd.exe";
                startInfo.Arguments = "/c" + arString;
                process.StartInfo = startInfo;
                process.Start();
            }
            return Ok();
        }
    }
}
