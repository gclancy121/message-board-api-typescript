import express, {Router, Request, Response} from 'express';
import * as Posts from './postsModel';

const router:Router = express.Router();

router.get('/', (req:Request, res:Response) => {
    Posts.fetchPosts().then((result:any) => {
        res.status(200).json(result);
    }).catch((err:Error) => console.error(err));
})

router.get('/post-num/:id', (req:Request, res:Response) => {
    const id:string = req.params.id;
    Posts.findAllPostsByUser(id).then((result:any) => {
        res.status(200).json({message: "Post fetching successful", user_post_num: result.length});
    }).catch((err:Error) => console.log(err));
})

router.get('/:post_id', (req:Request, res:Response) => {
    const post_id:string = req.params.post_id;
    Posts.findById(post_id).then((result:any) => {
        res.status(200).json(result);
    }).catch((err:Error) => console.error(err));
})

router.post('/addpost', (req:Request, res:Response) => {
    Posts.addPost(req.body).then((result:any) => {
        res.status(201).json({message:"Post creation successful", post_info: result});
    }).catch((err:Error) => console.error(err));
})

router.get('/get-creator/:id', (req:Request, res:Response) => {
    const id:string = req.params.id;
    Posts.findPosterName(id).then((result:any) => {
        res.status(200).json({poster_name: result.username});
    }).catch((err:Error) => console.error(err));
})

export {router as postsRouter};