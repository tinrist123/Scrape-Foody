const express = require("express");
const app = express();

const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

require("dotenv/config");

//Import Routes

app.use(express.json());
app.use(morgan("tiny"));

app.use(cors());
// app.all("*", (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,Accept, X-Requested-With, Content-Type,ContentType Access-Control-Request-Method, Access-Control-Request-Headers",
//   );
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

//HOMEPAGE
// app
//   .use("/user", userRoute)
//   .use("/passion", passionRoute)
//   .use("/college", collegeRoute)
//   .use("/chat", chatRoute);

app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});
const server = http.createServer(app);
//connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("connect to DB");
});

server.listen(3333);
