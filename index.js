const path = require("path");
const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = new express();

mongoose
  .connect("mongodb://localhost:27017/node-blog", { useNewUrlParser: true })
  .then(() => "You are connected to MongoDB!")
  .catch(err => console.error("Woops, something went wrong :(", err));

app.use(express.static("public"));
app.use(expressEdge);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/post/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/contact.html"));
});

app.get("/post", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages/post.html"));
});

app.listen(3000, () => {
  console.log("Listening on port 3000*");
});
