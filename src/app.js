const express = require('express')

const userRouter = require('./api/routes/usuario')
const taskRouter = require('./api/routes/tarefa')

const app = express()
app.use(express.json())


app.use(usuarioRouter)
app.use(tarefaRouter)

module.exports = { app}
