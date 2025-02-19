const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/access-token", (req, res) => {
  const userId = req.query.userId;
  const rest_api = req.query.rest_api;
  const apiKeySid = process.env.YOUR_API_KEY_SID;
  const apiKeySecret = process.env.YOUR_API_KEY_SECRET;

  function getAccessToken() {
    var now = Math.floor(Date.now() / 1000);
    var exp = now + 3600;

    var header = { cty: "stringee-api;v=1" };
    var payload = {
      jti: apiKeySid + "-" + now,
      iss: apiKeySid,
      exp: exp,
      userId: userId,
    };
    if (rest_api) {
      payload.rest_api = rest_api;
    }

    var token = jwt.sign(payload, apiKeySecret, {
      algorithm: "HS256",
      header: header,
    });
    return token;
  }
  if (!userId) {
    return res.status(404);
  }

  var token = getAccessToken();
  if (!token) {
    return res.status(400).json({
      message: "invalid user",
    });
  }
  res.status(200).json({ token });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
