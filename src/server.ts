//Server bones
import express, { Express, ErrorRequestHandler } from "express";
import cors from 'cors';
import helmet from 'helmet';

//Router Imports
import {complaintRouter} from './complaints/complaintRouter';
import { commentsRouter } from "./comments/commentsRouter";
import {usersRouter} from './users/usersRouter';
import {postsRouter} from './posts/postsRouter';
import {waifuRouter} from './waifus/waifuRouter';

//Server setup
const server:Express = express();
server.use(cors());
server.use(helmet());
server.use(express.json());

//Server routers
server.use('/complaints', complaintRouter);
server.use('/comments', commentsRouter);
server.use('/users', usersRouter);
server.use('/posts', postsRouter);
server.use('/waifus', waifuRouter);

const errorHandler:ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message, stack: err.stack});
}
server.use(errorHandler);

export default server;