const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const moment = require('moment')



const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'dist')))

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

const users = []

io.on('connection', socket => {
    socket.on('infoTransfer', (username, room) => {
        users.push([username, room, socket.id])
    })

    socket.emit('message', 'Welcome to DevTime', 'Chat Bot', moment().format('h:mm a'))

    socket.broadcast.emit('message', 'User has joined a chat', 'Chat Bot', moment().format('h:mm a'))


    socket.on('disconnect', () => {
        io.emit('message', 'User has left the chat', 'Chat Bot', moment().format('h:mm a'))
    })

    socket.on('chat message', (msg, username) => {
        let time = moment().format('h:mm a')
        io.emit('chat message', msg, username, time)
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`server running on ${PORT}`))
