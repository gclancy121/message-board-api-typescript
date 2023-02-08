//Server bones
import express, { Express } from "express";
import cors from 'cors';
import helmet from 'helmet';

//Router Imports
import {complaintRouter} from './complaints/complaintRouter';

//Server setup
const server:Express = express();
server.use(cors());
server.use(helmet());
server.use(express.json());

//Server routers
server.use('/complaints', complaintRouter);

export default server;