import express, {json, Router, urlencoded} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import {todoRouter} from "./routers/todo";
import {config} from "./config/config-example";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(urlencoded({
    extended: true
}));
app.use(json());

const router = Router();

router.use('/todo', todoRouter);

app.use('/api', router);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});