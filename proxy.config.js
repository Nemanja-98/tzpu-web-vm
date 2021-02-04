const PROXY_CONFIG = [
  {
      context: [
          "/VMOperation",
      ],
      target: "http://localhost:5000",
      secure: false
  }
]

module.exports = PROXY_CONFIG;
