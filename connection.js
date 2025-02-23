const mongoose = require("mongoose");

const connectMongo = (url) => {
  mongoose.connect(url);
};

module.exports = { connectMongo };
