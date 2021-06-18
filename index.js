const express = require("express");
const path = require("path");
const app = express();
let led1 = false;
let led2 = false;
app.use(express.static(path.join(__dirname, "public")));
app.get("/api/status", (req, res) => {
  return res.send(led1 + "," + led2);
});
app.get("/api/led1", (req, res) => {
  led1 = !led1;
  return res.send(led1 + "," + led2);
});
app.get("/api/led2", (req, res) => {
  led2 = !led2;
  return res.send(led1 + "," + led2);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(
  process.env.PORT || 8000,
  console.log("Server Started on port " + (process.env.PORT || 8000))
);
