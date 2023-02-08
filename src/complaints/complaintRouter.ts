import express, {Router, Request, Response, NextFunction} from 'express';
import * as Complaints from './complaintModel';
import checkPayload from './complaintMiddleware';

const router:Router = express.Router();

router.post('/', checkPayload, (req:Request, res:Response, next:NextFunction) => {
    Complaints.addComplaint(req.body).then(result => {
        res.status(201).json(result);
    }).catch(err => console.log(err));
})

export {router as complaintRouter};