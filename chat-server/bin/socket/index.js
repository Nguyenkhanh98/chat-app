import { Server } from "socket.io";
import { Allow_Origins } from "../../configs/env.js";
var global = {
    onlineUsers: null
};

const socketServer = (app) => {
    const io = new Server(app, {
        cors: {
          origin: Allow_Origins,
          credentials: true,
        },
      });


    global.onlineUsers = new Map();

    io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        socket.broadcast.emit("online-users", {
        onlineUsers: Array.from(onlineUsers.keys()),
        });
    });

    socket.on("signout", (id) => {
        onlineUsers.delete(id);
        socket.broadcast.emit("online-users", {
        onlineUsers: Array.from(onlineUsers.keys()),
        });
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
        socket
            .to(sendUserSocket)
            .emit("msg-recieve", { from: data.from, message: data.message });
        }
    });

    socket.on("mark-read", ({ id, recieverId }) => {
        const sendUserSocket = onlineUsers.get(id);
        if (sendUserSocket) {
        socket.to(sendUserSocket).emit("mark-read-recieve", { id, recieverId });
        }
    });
    });
};

export default socketServer;