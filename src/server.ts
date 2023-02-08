import express, { Express } from "express";
import cors from 'cors';
import helmet from 'helmet';

const server:Express = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

export default server;