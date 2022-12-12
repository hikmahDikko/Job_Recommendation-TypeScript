import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';

const router = express();

//Connect to mongoDB
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.log('connected to DB');
        StartServer();
    })
    .catch((error) => {
        Logging.error('unable to connect to database');
        Logging.error(error);
    });

//Only start the server if mongoDB is connected
const StartServer = () => {
    router.use((req, res, next) => {
        //Log the request
        Logging.info(`incoming -> Method : [${req.method}] - Url : [${req.url}] - IP : [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(`incoming -> Method : [${req.method}] - Url : [${req.url}] - IP : [${req.socket.remoteAddress}] - status : [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

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
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    //Error Handler
    router.use((req, res, next) => {
        const error = new Error('Not Found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen((config.server.port, () => Logging.info('Server is running on port ' + config.server.port)));
};
