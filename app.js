import express from 'express'
import fs from 'fs'
import getTasks from './routes/tasks.get.js'
import postTask from './routes/task.post.js'
import deleteTask from './routes/task.delete.js'
import patchTask from './routes/task.patch.js'

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json()) 

app.use(getTasks);
app.use(postTask);
app.use(patchTask);
app.use(deleteTask);

app.listen(PORT, () => {console.log('Server started on port ' + PORT)})
