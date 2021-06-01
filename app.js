import express from 'express'
import fs from 'fs'
import getTasks from './routes/tasks.get.js'
import postTask from './routes/task.post.js'
import deleteTask from './routes/task.delete.js'
import patchTask from './routes/task.patch.js'


const app = express()

const PORT = 3009;
console.log('Server started on port ' + PORT)

app.use(express.json()) 

async function start () {
    try {
        app.listen(PORT, () => {console.log('Server started on port ' + PORT)})
    } catch (e) {
        console.log(e)
    }
}

app.use(getTasks);
app.use(postTask);
app.use(patchTask);
app.use(deleteTask);

start()


