import db from '../../data/dbConfig';

function findById(id:string) {
    return db('comments').where('comment_created_by', id).first();
}

async function addComment(comment:string) {
    const [id] = await db('comments').insert(comment);
    return findById(id);
}

function fetchAllCommentsOnPost(post_id:string) {
    return db('comments').where('post_id', post_id);
}

export {findById, addComment, fetchAllCommentsOnPost};