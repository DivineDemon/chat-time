const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const botName = 'ModeratorBot'
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
io.on('connection', (socket) => {
    socket.emit('message', formatMessage(botName, 'Welcome to Chat-Time!'))
    socket.broadcast.emit('message', formatMessage(botName, 'A User has Joined the Chat'))
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A User has Left the Chat'))
    })
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('User', msg))
    })
})
server.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))