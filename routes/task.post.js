import { Router } from "express";
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
const router = Router();


router.post('/task', (req, res) => {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
        console.log('request', req.body);
        const task = req.body;
        const todos = JSON.parse(data);
        const newTasks = [...todos, {uuid: uuidv4(), ...task, date: new Date(Date.now())}];
        const editedJSON = JSON.stringify(newTasks, null, 2);
        fs.writeFile('todos.json', editedJSON, err => {
            return res.send({msg: 'Task was posted', task});
        });
    });
});

export default router;