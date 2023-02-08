import express, {Router, Request, Response} from 'express';
import * as Complaints from './complaintModel';
import checkPayload from './complaintMiddleware';

const router:Router = express.Router();

router.post('/', checkPayload, (req:Request, res:Response) => {
    Complaints.addComplaint(req.body).then((result:string) => {
        res.status(201).json(result);
    }).catch((err:Error) => console.error(err));
})

export {router as complaintRouter};