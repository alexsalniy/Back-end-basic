import { Router } from "express";
import fs from 'fs'

const router = Router();

router.patch('/task', (req, res) => {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
        console.log('request', req.body);
        const uuid = req.body.uuid;
        const task = req.body;
        const todos = JSON.parse(data);
        const index = todos.findIndex(todo => todo.uuid === uuid);
        todos[index] = {...todos[index], name: task.name, done: task.done }
        const editedJSON = JSON.stringify(todos, null, 2);
        fs.writeFile('todos.json', editedJSON, err => {
            return res.send({msg: 'Task was posted', task});
        });
    });
});

export default router;