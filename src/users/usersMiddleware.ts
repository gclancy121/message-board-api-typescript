import * as Users from './usersModel';
import {Request, Response, NextFunction} from 'express';

async function checkUsernameTaken(req:Request, res:Response, next:NextFunction) {
    const username:string = req.body.username;
    await Users.findByUsername(username).then((result: string | null)=> {
        if (result != null) {
            res.status(400).json({message: "A weeblet has already stolen your idea, buddy. New username needed."});
            return;
        }
        next();
    })
}

async function checkDeletePossible(req:Request, res:Response, next:NextFunction) {
    const id:string = req.params.id;
    await Users.findById(id).then((result:string | null | undefined) => {
        if (result == null) {
            res.status(400).json({message: "user cannot be deleted"});
            return;
        }
        next();
    })
}

async function checkUsernameExists(req:Request, res:Response, next:NextFunction) {
    const username:string = req.params.username;
    await Users.findByUsername(username).then((result: string | null | undefined) => {
        if (result == null) {
            res.status(400).json({message: "user does not exist"});
            return;
        }
        next();
    })
}

function checkQuestionAnswer(req:Request, res:Response, next:NextFunction) {
    const security_question_answer:string | null= req.body.security_question_answer;
    if (security_question_answer == null || security_question_answer.trim() === '') {
        res.status(400).json({message: "You have to answer the security question!"})
        return;
    } 
    next();
}

function checkPayload(req:Request, res:Response, next:NextFunction) {
    const {username, password}: {username:string | null, password:string | null} = req.body;
    if (username == null || username.trim() === '') {
        res.status(400).json({message: "you need a username and password! Gotta keep safe in these times."})
        return;
    } 
    if (password == null || password.trim() === '') {
        res.status(400).json({message: "you need a username and password! Gotta keep safe in these times."})
        return;
    }
    if (password.trim().length < 8) {
        res.status(400).json({message: "Your password is too short! It has to be at least 8 characters long."})
        return;
    }
    next();
}
function checkNewPasswordValid(req:Request, res:Response, next:NextFunction) {
    const {password, newPassword}: {password: string | null, newPassword: string | null} = req.body;
    if (password == null || password.trim() === '') {
        res.status(400).json({message: "You need a password! C'mon, you know this."})
        return;
    } else if (password.trim().length < 8) {
        res.status(400).json({message: "Your password is too short! Pick a better one that's at least 8 characters long."})
        return;
    } else if (newPassword == null || newPassword.trim() === '') {
        res.status(400).json({message: "You need to confirm your new password!"})
        return;
    } else if (newPassword !== password) {
        res.status(400).json({message: "Your passwords do not match!"})
        return;
    }
    next(); 
}
function checkUpdateOkay(req:Request, res:Response, next:NextFunction) {
    const {about_me, fav_waifu, profile_picture}: 
    {about_me: string | null, fav_waifu: string | null, profile_picture: string | null} 
    = req.body;
    if (about_me == null || about_me.trim() === "") {
        res.status(400).json({message: "You have to have an about me section! How else will people know you?"})
        return;
    } 
    if (fav_waifu == null || fav_waifu.trim() === '') {
        res.status(400).json({message: "You have to have a favorite waifu! Every weeb has one!"})
        return;
    }
    if (profile_picture == null || profile_picture.trim() === '') {
        res.status(400).json({message: "You have to have a profile picture! You can't just have a blank picture, how will anyone recognize you?"})
        return;
    }
    next();
}
async function checkResetIsValid(req:Request, res:Response, next:NextFunction) {
    const {username, security_question, security_question_answer}:
    {username: string | null, security_question: string | null, security_question_answer: string | null}
    = req.body;
    if (username == null || username.trim() === '') {
        res.status(400).json({message: "I need to know who's password it is I'm resetting."})
        return;
    }
    if (security_question === '') {
        res.status(400).json({message: "I need the security question to verify who you are."})
        return;
    }
    if (security_question_answer == null || security_question_answer.trim() === "") {
        res.status(400).json({message: "Answer the question. The question alone is meaningless."})
        return;
    }
    await Users.findByUsername(username).then((result: User | null) => {
        if (result == null) {
            res.status(400).json({message: "This user doesn't exist. Go register!"});
            return;
        } else {
            if (result.security_question !== security_question) {
                res.status(400).json({message: "Your question and answer do not match. Request denied."})
                return;
            } 
            if (result.security_question_answer !== security_question_answer) {
                res.status(400).json({message: "Your question and answer do not match. Request denied."})
                return;
            }
            req.body.user_id = result.user_id;
           next();
        }
    })
}
interface User {
    user_id: number;
    username: string;
    password: string;
    about_me: string;
    profile_picture: string;
    fav_waifu: string;
    security_question: string;
    security_question_answer: string;
}
export {
    checkUsernameTaken,
    checkPayload,
    checkDeletePossible,
    checkQuestionAnswer,
    checkResetIsValid,
    checkUpdateOkay,
    checkNewPasswordValid,
    User
}