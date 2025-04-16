// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  var requestDate = req.params.date;
  if (requestDate === null || requestDate === undefined)
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });

  var isUnixTimeStamp = isNumeric(requestDate);

  var isInvalid =
    new Date(isUnixTimeStamp ? +requestDate : requestDate).getTime() > 0;
  if (isInvalid === false) return res.json({ error: "Invalid Date" });

  return res.json({
    unix: isUnixTimeStamp ? +requestDate : new Date(requestDate).getTime(),
    utc: new Date(isUnixTimeStamp ? +requestDate : requestDate).toUTCString(),
  });
});

function isNumeric(str) {
  return /^\d+$/.test(str);
}

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
