const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://127.0.0.1:27017/my_store",
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("connected to data Base");
  }
);
