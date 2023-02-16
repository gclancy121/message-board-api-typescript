import express, {Router, Request, Response, NextFunction} from 'express';
import * as Complaints from './complaintModel';
import checkPayload from './complaintMiddleware';

const router:Router = express.Router();

router.post('/', checkPayload, (req:Request, res:Response, next:NextFunction) => {
    Complaints.addComplaint(req.body).then((result:string) => {
        res.status(201).json(result);
    }).catch((err:Error) => next(err));
})

export {router as complaintRouter};