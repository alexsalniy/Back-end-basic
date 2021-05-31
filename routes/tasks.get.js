import { Router } from "express";
import fs from 'fs'

const router = Router();

router.get('/tasks', (req, res) => {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
        const todos = JSON.parse(data);
        // let newTasks = todos;
        console.log(data);
        res.send(todos)
    })
})

export default router;