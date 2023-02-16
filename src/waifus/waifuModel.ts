import db from '../../data/dbConfig';

interface Waifu {
    waifu_id: number,
    waifu_name: string,
    waifu_description: string,
    waifu_birth_month: string,
    waifu_birth_day: string,
    waifu_picture: string
}

function fetchData() {
    return db('waifus');
}

async function addData(post:Waifu) {
    await db('waifus').insert(post);
    return post;
}

function updateData(id:string, changes:Waifu) {
    return db('waifus').where('waifu_id', id).update(changes);
}

function findByName(name:string) {
    return db('waifus').where('waifu_name', name).first();
}

function findByNameArray(name:string) {
    return db('waifus').where('waifu_name', 'like', `%${name}%`);
}

function findById(id:string) {
    return db('waifus').where('waifu_id', id).first();
}

export {fetchData, addData, updateData, findByName, findByNameArray, findById};
export {Waifu as WaifuType};