import { Router } from "express";
import { validationResult } from 'express-validator';
import fs from 'fs'

const router = Router();

router.get('/tasks', (req, res) => {
    const myValidRes = validationResult(req);
    if(!myValidRes.isEmpty()) {
        return res.status(400).send({myValidRes: myValidRes.array() });
    }
    fs.readFile('todos.json', 'utf-8', (err, data) => {
        const filter = req.query
        console.log(filter)
        console.log(filter.sortByDate)
        console.log(filter.sortByDone)
        const newTodos = JSON.parse(data);
        let filteredTodos = newTodos;
        const length = filteredTodos.length
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
                filteredTodos = filteredTodos.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
                break;
            default:
                filteredTodos = filteredTodos.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
                break;
        }
        const pages = Math.ceil(length / 5);
        const indexOfLastTodo = filter.page * 5;
        const indexOfFirstTodo = indexOfLastTodo - 5;
        const slicedTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
        console.log(data);
        res.send({slicedTodos, pages})
    })
})

export default router;