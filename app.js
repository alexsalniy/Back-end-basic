import express from 'express'
import fs from 'fs'
import getTasks from './routes/tasks.get.js'
import postTask from './routes/task.post.js'
import deleteTask from './routes/task.delete.js'


const app = express()

const PORT = 3005;
console.log('Server started on port ' + PORT)

app.use(express.json()) 

app.post('/',(req, res) => {
    console.log(req.body);
    res.status(200).json('Server works')
})

// const task = {
//     "name" : "name",
//     "creatdeAt": 'creatdeAt'
// };

// const data = JSON.stringify(task);

async function start () {
    try {
        app.listen(PORT, () => {console.log('Server started on port ' + PORT)})
    } catch (e) {
        console.log(e)
    }
}

app.use(getTasks);
app.use(postTask);
app.use(deleteTask);

start()

// fs.writeFile('todos.json', data, (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('JSON data is saved');
// })

