import db from '../../data/dbConfig';

function findById(id:number) {
    return db('complaints').where('complaint_id', id).first();
}

async function addComplaint(complaint:string) {
    const [id] = await db('complaints').insert(complaint);
    return findById(id);
}

export {findById, addComplaint};