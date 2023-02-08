import express, {Router, Request, Response} from 'express';
import * as Comments from './commentsModel';
import {validatePayload} from './commentsMiddleware';

const router:Router = express.Router();

router.post('/', validatePayload, (req:Request, res:Response) => {
    Comments.addComment(req.body).then(result => {
        res.status(201).json(result);
    }).catch(err => console.log(err));
})

router.get('/:id', (req:Request, res:Response) => {
    const id:string = req.params.id;
    Comments.fetchAllCommentsOnPost(id).then((result:string) => {
        res.status(200).json(result);
    }).catch((err:Error) => console.error(err));
})

export {router as commentsRouter};