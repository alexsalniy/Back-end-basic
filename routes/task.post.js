import { Router } from "express";
import { validationResult } from 'express-validator';
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { body } from 'express-validator'
const router = Router();


router.post('/task',
    body('name').isString(),
    body('done').isBoolean(),
    (req, res) => {
        const myValidRes = validationResult(req);
        if(!myValidRes.isEmpty()) {
            return res.status(400).send({myValidRes: myValidRes.array() });
        }
        fs.readFile('todos.json', 'utf-8', (err, data) => {
            console.log('request', req.body);
            if(req.body.name.trim() === '') {
                return res.status(422).send({ msg: 'Invalid fields in request'});
            }
            const task = req.body;
            const todos = JSON.parse(data);
            const newTasks = [...todos, {uuid: uuidv4(), ...task, date: new Date(Date.now())}];
            const editedJSON = JSON.stringify(newTasks, null, 2);
            fs.writeFile('todos.json', editedJSON, err => {
                if (err) {
                    return res.status(400).send({msg: 'Task not created'});
                }
                return res.send(task);
            });
        });
    });

export default router;