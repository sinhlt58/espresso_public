import express from 'express';

const app = express();

app.get('/', async (req, res, next) => {

});

app.listen(9090, () => console.log('Server started.'));