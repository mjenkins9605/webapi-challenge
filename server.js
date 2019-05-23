const express = require("express");
const projectRouter = require("./routers/projectRouters");
const actionRouter = require("./routers/actionRouters");
const server = express();

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send(
    "There are three kinds of people in this world, those who can count and those who can not."
  );
});

module.exports = server;