import { Router } from "express";
import { body, validationResult } from 'express-validator';
import fs from 'fs'

const router = Router();

router.patch('/task',
    body('uuid').isString(),
    body('name').isString(),
    body('done').isBoolean(),
    (req, res) => {
        const myValidRes = validationResult(req);
        if(!myValidRes.isEmpty()) {
            return res.status(400).send({myValidRes: myValidRes.array() });
        }
        fs.readFile('todos.json', 'utf-8', (err, data) => {
            console.log('request', req.body);
            const task = req.body;
            if(req.body.name.trim() === '') {
                return res.status(422).send({ msg: 'Invalid fields in request'})}
            const todos = JSON.parse(data);
            const index = todos.findIndex(todo => todo.uuid === task.uuid);
            todos[index] = {...todos[index], name: task.name, done: task.done }
            const editedJSON = JSON.stringify(todos, null, 2);
            fs.writeFile('todos.json', editedJSON, err => {
                if (err) {
                    return res.status(400).send({msg: 'Task not created'});
                }
                return res.send(task);
            });
        });
    });

export default router;