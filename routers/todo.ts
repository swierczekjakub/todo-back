import {Router} from "express";
import {TodoRecord} from "../records/todo.record";
import {TodoEntity} from "../types";
import {ValidationError} from "../utils/errors";

export const todoRouter = Router();

todoRouter

    .get('/', async (req, res) => {
        const todos = await TodoRecord.getAll();
        res.json(todos);
    })
    .get('/:id', async (req, res) => {
        const {id} = req.params;
        const todos = await TodoRecord.getOne(id);
        res.json(todos);
    })
    .post('/', async (req, res) => {
        const newTodo = new TodoRecord(req.body as TodoEntity);
        await newTodo.insert();
        res.json(newTodo);
    })
    .patch('/:todoId', async (req, res) => {
        const todo = await TodoRecord.getOne(req.params.todoId);

        const {body} = req;
        ({id: todo.id, name: todo.name, isCompleted: todo.isCompleted} = body.updatedTodo);
        await todo.update();
        res.json(todo);
    })
    .delete('/:todoId', async (req, res) => {
        const todo = await TodoRecord.getOne(req.params.todoId);

        if (!todo) {
            throw new ValidationError('There is no such todo.');
        }
        await todo.delete();
        res.end();
    });