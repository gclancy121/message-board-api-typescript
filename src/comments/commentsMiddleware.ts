import {Request, Response, NextFunction} from 'express';

async function validatePayload(req:Request, res:Response, next:NextFunction) {
    const comment:string = req.body.comment;
    if (comment.trim() === '') {
        res.status(400).json({message: "You have to write a comment in order to post one!"});
        return;
    }
    next();
}

export {validatePayload};