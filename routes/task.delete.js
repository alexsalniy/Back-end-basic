import { Router } from "express";
import fs from 'fs'

const router = Router();

router.delete('/task', (req, res) => {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
        const todos = JSON.parse(data);
        
    })
})