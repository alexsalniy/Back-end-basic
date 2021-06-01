import { Router } from "express";
import fs from 'fs'

const router = Router();

router.delete('/task', (req, res) => {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
        const uuid = req.body.uuid;
        console.log('request', req.body);
        console.log('ID', typeof uuid);
        console.log('UUID', uuid);
        const todos = JSON.parse(data);
        const index = todos.findIndex(todo => todo.uuid === uuid);
        const todo = todos[index]
        const editedTask = todos.filter(todo => todo.uuid !== uuid);
        const editedJSON = JSON.stringify(editedTask, null, 2);
        fs.writeFile('todos.json', editedJSON, err => {
            return res.send({msg: 'Task was changed', uuid});
        });
    });
});

export default router;