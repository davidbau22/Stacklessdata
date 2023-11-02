"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./routes/index"));
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const database_1 = __importDefault(require("./database"));
const Book_1 = require("./models/Book");
(0, Book_1.initBookModel)(database_1.default);
// User.hasMany(Review, { foreignKey: "userUuid" }); // Define User-Review relationship
// Book.hasMany(Review, { foreignKey: "bookUuid" }); // Define Book-Review relationship
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.use(body_parser_1.default.json({ limit: "50mb" }));
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
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //the diferents methods for the request
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    //the execution has to continue
    next();
});
app.use("/", index_1.default);
const server = http_1.default.createServer(app);
database_1.default.sync({ force: false }).then(() => {
    server.listen(config_1.PORT, () => {
        console.log(`API started at port:${config_1.PORT}`);
    });
});
//# sourceMappingURL=index.js.map