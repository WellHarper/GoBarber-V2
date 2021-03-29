import express, { request, response } from 'express'
import routes from './routes'
import  'reflect-metadata'
import  './database'


const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
    console.log("🛸 Já chegou o disco voador 🛸")
})

