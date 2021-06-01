import { Router } from "express";
import { validationResult } from 'express-validator';
import fs from 'fs'

const router = Router();

router.get('/tasks', 
    // body('filterByDate').isString(),
    // body('filterByDone').isString(),
    (req, res) => {
    const myValidRes = validationResult(req);
    if(!myValidRes.isEmpty()) {
        return res.status(400).send({myValidRes: myValidRes.array() });
    }
    fs.readFile('todos.json', 'utf-8', (err, data) => {
        const filter = req.body
        console.log(filter)
        console.log(filter.sortByDate)
        console.log(filter.sortByDone)
        const newTodos = JSON.parse(data);
        let filteredTodos = newTodos;
        switch (filter.sortByDone) {
            case 'done':
                filteredTodos = newTodos.filter((item) => item.done === true);
                break;
            case 'undone':
                filteredTodos = newTodos.filter((item) => item.done === false);
                break;
            default:  
            filteredTodos;
                break;
        };
        switch (filter.sortByDate) {
            case 'asc':
                filteredTodos = filteredTodos.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
                break;
            default:
                filteredTodos = filteredTodos.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
                break;
        }
        // let newTasks = todos;
        console.log(data);
        res.send(filteredTodos)
    })
})

export default router;