require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
let led1 = false;
let led2 = false;
let locked = false;
//Middleware to set a static directory
app.use(express.static(path.join(__dirname, "public")));
/*
  We are creating end points to access the current values of the variables led1 and led2
*/
app.get("/api/status_text", (req, res) => {
  if (locked) locked = !locked;
  return res.send(led1 + "," + led2);
});
app.get("/api/status_json", (req, res) => {
  return res.json({ led1: led1, led2: led2 });
});
// End point to change the value of led1
app.get("/api/led1", (req, res) => {
  if (!locked) {
    led1 = !led1;
    locked = true;
    return res.json({ led1: led1, led2: led2 });
  } else {
    return res.json({
      error: "Application is locked for furthur modifications to be made",
    });
  }
});
// End point to change the value of led2
app.get("/api/led2", (req, res) => {
  if (!locked) {
    led2 = !led2;
    locked = true;
    return res.json({ led1: led1, led2: led2 });
  } else {
    return res.json({
      error: "Application is locked for furthur modifications to be made",
    });
  }
});
// SEND index.html to the browser when / is requested
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
//Allow to server to listen to port 8000 for requests
app.listen(
  process.env.PORT || 6000,
  console.log("Server Started on port " + (process.env.PORT || 6000))
);
