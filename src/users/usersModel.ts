import db from '../../data/dbConfig';

function findAll() {
    return db('users');
}

function findById(id:string) {
    return db('users').where('user_id', id).first();
}

function findByUsername(username:string) {
    return db('users').where('username', username).first();
}

async function addUser(user:any) {
    const [id] = await db('users').insert(user);
    return findById(id);
}

function removeUser(id:string) {
    return db('users').where('user_id', id).del();
}

async function updateUser(id:string, changes:any) {
    await db('users').where('user_id', id).update(changes);
    return findById(id);
}

export {findAll, findById, findByUsername, addUser, removeUser, updateUser};