const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(
    cors({
        origin: "*",
    })
);

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
    },
});

io.on("connect", (socket) => {
    // handle connection
    console.log(`${socket.id} connected at ${Date.now()}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`${socket.id} joined room "${data}" at ${Date.now()}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("get_message", data);
    })

    // handle disconnect
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected at ${Date.now()}`);
    });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
