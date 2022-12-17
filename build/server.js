"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const logging_1 = __importDefault(require("./library/logging"));
const router = (0, express_1.default)();
//Connect to mongoDB
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    logging_1.default.log('connected to DB');
    StartServer();
})
    .catch((error) => {
    logging_1.default.error('unable to connect to database');
    logging_1.default.error(error);
});
//Only start the server if mongoDB is connected
const StartServer = () => {
    router.use((req, res, next) => {
        //Log the request
        logging_1.default.info(`incoming -> Method : [${req.method}] - Url : [${req.url}] - IP : [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            logging_1.default.info(`incoming -> Method : [${req.method}] - Url : [${req.url}] - IP : [${req.socket.remoteAddress}] - status : [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    //Rules of the API
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'Origin, X-Requested-With, Context-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
            return res.status(200).json({});
        }
        next();
    });
    //Routes
    //HealthCheck
    router.get('/ping', (req, res) => {
        res.status(200).json({ message: 'pong' });
    });
    //Error Handler
    router.use((req, res, next) => {
        const error = new Error('Not Found');
        logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => logging_1.default.info('Server is running on port ' + config_1.config.server.port));
};
