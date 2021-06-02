import { Router } from "express";
import { param, validationResult } from 'express-validator';
import fs from 'fs'

const router = Router();

router.delete('/task/:uuid',
    param('uuid').isUUID(),
    (req, res) => {
    const myValidRes = validationResult(req);
    if(!myValidRes.isEmpty()) {
        return res.status(400).send({myValidRes: myValidRes.array() });
    }
    fs.readFile('todos.json', 'utf-8', (err, data) => {
        const uuid = req.params.uuid;
        console.log(uuid)
        const todos = JSON.parse(data);
        try {
            const deletedTask = todos.filter(todo => todo.uuid === uuid);
            const delTask = deletedTask[0];
            delete delTask.createdAt;
        } catch (err) {
            return res.status(404).send({msg: 'Task not found'});
        }
        const editedTasks = todos.filter(todo => todo.uuid !== uuid);
        const editedJSON = JSON.stringify(editedTasks, null, 2);
        fs.writeFile('todos.json', editedJSON, err => {
            return res.send({msg: 'File delited'});
        });
    });
});

export default router;