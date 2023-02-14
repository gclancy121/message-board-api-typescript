import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express, {Router, Request, Response} from 'express';
import * as Users from './usersModel';
import {
    checkUsernameTaken,
    checkPayload,
    checkDeletePossible,
    checkQuestionAnswer,
    checkResetIsValid,
    checkUpdateOkay,
    checkNewPasswordValid,
    User
} from './usersMiddleware';

const router:Router = express.Router();

router.get('/', (req:Request, res:Response) => {
    Users.findAll().then((result:any) => {
        res.status(200).json(result);
    }).catch((err:Error) => console.log(err));
})

router.get('/byid/:id', (req:Request, res:Response) => {
    const id:string = req.params.id;
    Users.findById(id).then((result:any) => {
        res.status(200).json(result);
    }).catch((err:Error) => console.log(err));
})

router.get('/username', (req:Request, res:Response) => {
    const username:string = req.params.username;
    Users.findByUsername(username).then((result:any) => {
        res.status(200).json(result);
    }).catch((err:Error) => console.log(err));
})

router.put('/:id', checkUpdateOkay, (req:Request, res:Response) => {
    const id:string = req.params.id;
    const changes:User = req.body;
    Users.updateUser(id, changes).then((result:any) => {
        res.status(200).json(result);
    }).catch((err:Error) => console.log(err));
})

router.post('/reset-checks', checkResetIsValid, (req:Request, res:Response) => {
    const id:string = req.body.user_id;
    res.status(200).json({message: "Checks passed, proceed", id})
})

router.patch('/reset-password', checkNewPasswordValid, (req:Request, res:Response) => {
    const hash:string = bcrypt.hashSync(req.body.password, 8);
    const newPassword:Object = {password: hash};

    Users.updateUser(req.body.id, newPassword).then((result:any) => {
        res.status(200).json({message: "success"});
    }).catch((error:Error) => console.error(error));
})

router.post('/register', checkPayload, checkQuestionAnswer, checkUsernameTaken, (req:Request, res:Response) => {
    let user:User = req.body;
    const hash:string = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.addUser(user).then((result:any) => {
        res.status(201).json({message: `Welcome back to Weeb Central, ${result.username}!`, ...result});
    }).catch((err:Error) => console.error(err));
})

router.post('/login', checkPayload, (req:Request, res:Response) => {
    let {username, password}:{username:string, password:string} = req.body;
    Users.findByUsername(username).then((user:User) => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token:string = generateToken(user);
            res.status(200).json({token: token, message: `Welcome back to Weeb Central, ${username}!`});
        } else {
            res.status(401).json({message: "Hey, that information is invalid! Fix it!"});
        }
    }).catch((err:Error) => console.log(err)); 
})

router.delete('/:id', checkDeletePossible, (req:Request, res:Response) => {
    const id:string = req.params.id;
    Users.removeUser(id).then((result:User) => {
        res.status(200).json(result);
    }).catch((err:Error) => console.error(err));
})

function generateToken(user:User) {
    const payload = {
        subject: user.user_id,
        username: user.username
    };
    const options = {
        expiresIn: 100000,
    };
    return jwt.sign(payload, 'i love sachi komine', options);
}

export {router as usersRouter};