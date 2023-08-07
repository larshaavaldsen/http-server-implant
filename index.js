const request = require("request");
const express = require("express");

// Simple function for triggering our webhook
function triggerWebhook(msg) {
  request.post(
    process.env.WEBHOOK_TARGET,
    {
      json: {
        content: msg,
      },
    },
    function (error, response, body) {
      console.log(
        "The webhook returned response code: %d",
        response.statusCode
      );
    }
  );
}

const app = express();
const port = 3000;

app.disable("x-powered-by");

// respond on ALL endpoints
app.all("*", (req, res) => {
  res.json({ json: { content: "api still under development" } });
  console.log("Web server was requested with the following information:");
  var timestamp = Date(Date.now);
  var reqInfo =
    "Request received to honeypot server with the following information: \n" +
    req.ip +
    " : " +
    req.method +
    " : " +
    req.url +
    " : " +
    res.statusCode +
    " : " +
    req.headers["user-agent"] +
    " : " +
    timestamp;
  console.log(reqInfo);
  triggerWebhook(reqInfo);
});

app.listen(port, () => {
  console.log(`Web server listening on ${port}`);
});
