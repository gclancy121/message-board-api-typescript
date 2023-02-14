import db from '../../data/dbConfig';

function fetchPosts() {
    return db('posts');
}

function findById(id:string) {
    return db('posts').where('post_id', id).first();
}

async function addPost(post:Object) {
    const [id] = await db('posts').insert(post);
    return findById(id);
}

function findPosterName(creator_id:string) {
    return db('users').where('user_id', creator_id).first();
}

function findAllPostsByUser(user_id:string) {
    return db('posts').where('created_by', user_id);
}

export {
    findById,
    addPost,
    fetchPosts,
    findPosterName,
    findAllPostsByUser
};