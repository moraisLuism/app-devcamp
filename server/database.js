const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://127.0.0.1:27017/test";

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: "majority",
    wtimeout: 0,
    j: true,
  },
});
