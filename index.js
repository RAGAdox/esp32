require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
let led1 = false;
let led2 = false;
let streamResponse = undefined;
let number = 0;
//Middleware to set a static directory
app.use(express.static(path.join(__dirname, "public")));
//Stream Values of LED1 and LED2 into Arduino
app.get("/api/stream", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  streamResponse = res;
  send(streamResponse);
  streamResponse.on("close", () => {
    streamResponse = undefined;
    console.log("Client Server Connection was closed");
  });
});

const send = (res) => {
  res.write(`data: ${led1},${led2}` + "\n\n");
};
// End point to change the value of led1
app.get("/api/led1", (req, res) => {
  if (streamResponse !== undefined) {
    led1 = !led1;
    send(streamResponse);
    return res.send(led1 + "," + led2);
  } else {
    return res.send("Client Server Connection is not established");
  }
});
// End point to change the value of led2
app.get("/api/led2", (req, res) => {
  if (streamResponse !== undefined) {
    led2 = !led2;
    send(streamResponse);
    return res.send(led1 + "," + led2);
  } else {
    return res.send("Client Server Connection is not established");
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
