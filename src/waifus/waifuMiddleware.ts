import * as Waifus from './waifuModel';
import {Response, Request, NextFunction} from 'express';

async function checkWaifuAlreadyExists(req:Request, res:Response, next:NextFunction) {
    const name:string = req.body.waifu_name;
    await Waifus.findByName(name).then((result:any) => {
        if (result != null) {
            res.status(400).json({message: "Hey! This waifu already exists in the database!"});
            return;
        }
        next();
    })
}

async function checkSearchExists(req:Request, res:Response, next:NextFunction) {
    const name:string = req.params.name;
    await Waifus.findByNameArray(name).then((result:any) => {
        if (result == null) {
            res.status(400).json({message: "invalid search param"});
            return;
        }
        next();
    })
}

function checkPayloadValid(req:Request, res:Response, next:NextFunction) {
    const name:string = req.body.waifu_name;
    const description:string = req.body.waifu_description;
    const picture:string = req.body.waifu_picture;
    if (name == null || name.trim() === '') {
        res.status(400).json({message: "Tell me your waifu's name first! I can't add her if I don't know who she is."})
        return;
    }
    if (description == null || name.trim() === '') {
        res.status(400).json({message: "Tell me about your waifu first! I need to know why you love her."});
        return;
    }
    if (picture == null || picture.trim() === '') {
        res.status(400).json({message: "I need a picture of your waifu first! I need to see what she looks like."});
        return;
    }
    next();
}
export {checkPayloadValid, checkWaifuAlreadyExists, checkSearchExists};