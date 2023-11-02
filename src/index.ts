import http from "http";
import { PORT } from "./config";
import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index";
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
import sequelize from "./database";
import Book, { initBookModel } from "./models/Book";
import snowflakeConnection from "./snowflakeConnection";



initBookModel(sequelize);
// User.hasMany(Review, { foreignKey: "userUuid" }); // Define User-Review relationship
// Book.hasMany(Review, { foreignKey: "bookUuid" }); // Define Book-Review relationship

const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
//print in the console every time exists a request
app.use(morgan("dev"));
//Middleware to set the headers
app.use((req, res, next) => {
  // update to match the domain you will make the request from
  //!this will have to change in deployment to match the frontend domain
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  //configure the type of headers the backend is going to accept
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  //the diferents methods for the request
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  //the execution has to continue
  next();
});

app.use("/", router);

const server = http.createServer(app);

sequelize.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    snowflakeConnection();
    console.log(`API started at port:${PORT}`);
  });
});
