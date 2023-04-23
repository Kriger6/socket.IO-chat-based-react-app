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

const getTime = () => {
    return moment().format('h:mm a')
}

const findUser = (socket) => {
    const found = users.find((element, index) => {
        if (element[2] === socket) {
            return index
        }
    })
    return found
}

io.on('connection', socket => {
    
    let user
    socket.on('infoTransfer', (username, room) => {
        users.push([username, room, socket.id])
        user = username
        
        io.emit('info', users)

        socket.broadcast.emit('message', `${user} has joined a chat`, 'Chat Bot', getTime())
    })

    socket.emit('message', 'Welcome to DevTime', 'Chat Bot', getTime())

    socket.on('disconnect', () => {
        users.splice(findUser(socket.id), 1)
        io.emit('info', users)
        io.emit('message', `${user} has left the chat`, 'Chat Bot', getTime())
    })

    socket.on('chat message', (msg, username) => {
        let time = getTime()
        io.emit('chat message', msg, username, time)
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`server running on ${PORT}`))
