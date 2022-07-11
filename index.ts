import express, {json, urlencoded} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError, ValidationError} from "./utils/errors";
import {config} from "./config/config";
import {todoRouter} from "./routers/todo";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(urlencoded({
    extended: true
}));
app.use(json());

app.use('/todo', todoRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});