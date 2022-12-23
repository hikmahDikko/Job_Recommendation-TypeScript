import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@jobprovider.qvony5n.mongodb.net/JobRecommendation`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 4300;

const JWT_SECRET = process.env.JWT_SECRET ? String(process.env.JWT_SECRET) : '';
const JWT_EXPIRY = process.env.JWT_EXPIRY ? String(process.env.JWT_EXPIRY) : '';

const MAX_AGE = process.env.MAX_AGE ? Number(process.env.MAX_AGE) : 15 * 60 * 60;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    jwtSecretKey: {
        secretKey: JWT_SECRET
    },
    jwtExpiresIn: {
        expiresIn: JWT_EXPIRY
    },
    maxAge: {
        age: MAX_AGE
    }
};
