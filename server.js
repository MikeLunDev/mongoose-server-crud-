const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const bookRouter = require("./services/books/");
const cors = require("cors");

const server = express();
server.set("port", process.env.PORT || 3450);

server.use(bodyParser.json());

server.use("/books", bookRouter);

mongoose
  .connect("mongodb://localhost:27017/studentproj", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    server.listen(server.get("port"), () => {
      console.log("SERVER IS RUNNING ON " + server.get("port"));
    })
  )
  .catch(err => console.log(err));
