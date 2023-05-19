const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.set("port", process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.use("/api/products", require("./routes/products.js"));

app.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "clientpublic", "index.html"));
});

module.exports = app;
