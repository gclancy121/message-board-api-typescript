//Server bones
import express, { Express } from "express";
import cors from 'cors';
import helmet from 'helmet';

//Router Imports
import {complaintRouter} from './complaints/complaintRouter';
import { commentsRouter } from "./comments/commentsRouter";
import {usersRouter} from './users/usersRouter';
import {postsRouter} from './posts/postsRouter';

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

export default server;