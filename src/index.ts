import server from './server';

const PORT:string | number = process.env.port || 9000;
server.listen(PORT, () => {
    console.log(`---Server listening on port ${PORT }---`);
})