const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
io.on('connection', (socket) => {
    socket.emit('message', 'Welcome to Chat-Time!')
    socket.broadcast.emit('message', 'A User has Joined the Chat')
    socket.on('disconnect', () => {
        io.emit('message', 'A User has Left the Chat')
    })
    socket.on('chatMessage', msg => {
        io.emit('message', msg)
    })
})
server.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))