import express, {Router, Request, Response, NextFunction} from 'express';
import * as Waifu from './waifuModel';
import {WaifuType} from './waifuModel';
import {checkPayloadValid, checkWaifuAlreadyExists, checkSearchExists} from './waifuMiddleware';

const router:Router = express.Router();

router.get('/', (req:Request, res:Response, next:NextFunction) => {
    Waifu.fetchData().then((result:any) => {
        res.status(200).json(result);
    }).catch((err:Error) => next(err));
})

router.get('/:name', (req:Request, res:Response, next:NextFunction) => {
    const name:string = req.params.name;
    Waifu.findByNameArray(name).then((result:any) => {
        res.status(200).json(result);
    }).catch((err:Error) => next(err));
})

router.get('/id/:id', (req:Request, res:Response, next:NextFunction) => {
    const id:string = req.params.id;
    Waifu.findById(id).then((result:any) => {
        res.status(200).json(result);
    }).catch((err:Error) => next(err));
})

router.put('/id/:id', (req:Request, res:Response, next:NextFunction) => {
    const id:string = req.params.id;
    const changes:WaifuType = req.body;
    Waifu.updateData(id, changes).then((result:any) => {
        res.status(200).json(result);
    }).catch((err:Error) => next(err));
})

router.post('/', checkPayloadValid, checkWaifuAlreadyExists, (req:Request, res:Response, next:NextFunction) => {
    const newWaifu:WaifuType = req.body;
    Waifu.addData(newWaifu).then((result:any) => {
        res.status(201).json(result);
    }).catch((err:Error) => next(err));
})


export {router as waifuRouter};