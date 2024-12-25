const mongoose = require("mongoose");
const path = 'mongodb+srv://gallery2851:9YhhhjQtW7qUksw3@cluster0.qvkem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connectDb = async (req, res) => {
  const connection = await mongoose.connect(path);
  if (connection.STATES.connected) return console.log("Database Connected");
  if (connection.STATES.disconnected)
    return console.log("Database Disconnected");
};
module.exports = { connectDb };


// const mongoose = require("mongoose");

// const connectDb = async (req, res) => {
//   const connection = await mongoose.connect('mongodb://127.0.0.1:27017/music');
//   if (connection.STATES.connected) return console.log("Database Connected");
//   if (connection.STATES.disconnected)
//     return console.log("Database Disconnected");
// };
// module.exports = { connectDb };