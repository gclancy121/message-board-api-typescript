import express, {Router, Request, Response, NextFunction} from 'express';
import * as Comments from './commentsModel';
import {validatePayload} from './commentsMiddleware';

const router:Router = express.Router();

router.post('/', validatePayload, (req:Request, res:Response, next:NextFunction) => {
    Comments.addComment(req.body).then(result => {
        res.status(201).json(result);
    }).catch((err:Error) => next(err));
})

router.get('/:id', (req:Request, res:Response, next:NextFunction) => {
    const id:string = req.params.id;
    Comments.fetchAllCommentsOnPost(id).then((result:string) => {
        res.status(200).json(result);
    }).catch((err:Error) => next(err));
})

export {router as commentsRouter};