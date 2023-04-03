const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')



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

io.on('connection', socket => {

    socket.emit('message', 'Welcome to DevTime')

    socket.broadcast.emit('message', 'User has joined a chat')


    socket.on('disconnect', () => {
        io.emit('message', 'User has left the chat')
    })

    socket.on('message', (message) => {
        console.log(message);
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`server running on ${PORT}`))


module.exports = { io }