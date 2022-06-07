const express = require("express");
const app = express();

const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const {
  province,
  district,
  menu,
  menu_detail,
  restaurant,
  comment,
} = require("./src/routes");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("swagger-jsdoc");

const swaggerOption = {
  swaggerDefinition: {
    info: {
      title: "Foody API",
      description: "Foody Description",
      contact: {
        name: "noname Developer",
      },
      servers: ["http://localhost:3333"],
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerDocument(swaggerOption);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
app
  .use("/province", province)
  .use("/district", district)
  .use("/menu", menu)
  .use("/restaurant", restaurant)
  .use("/menu_detail", menu_detail)
  .use("/comment", comment);

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

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Our app is running on port http://localhost:${PORT}`);
});
