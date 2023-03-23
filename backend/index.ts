import cors from 'cors';
import express from 'express'
import {MainRouter} from "./router";
const PORT = 3001

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const mainRouter = new MainRouter()
app.use('/', mainRouter.router)
app.listen(PORT, 'localhost')

// app.use(cors({
//     origin:'http://locahost:3002/test'
// }));