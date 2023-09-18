import { Server } from "socket.io";
import { Allow_Origins } from "../../configs/env.js";
import getPrismaInstance from "../../utils/prismaClient.js";

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
    socket.on("add-user", async(userId) => {

    const prisma = getPrismaInstance();
     await prisma.user.update({
        where: { id: userId }, 
        data: {
            socketId: socket.id,
          },
      });

        onlineUsers.set(userId, socket.id);
        socket.broadcast.emit("online-users", {
        onlineUsers: Array.from(onlineUsers.keys()),
        });
    });

    socket.on("signout", async (id) => {
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
        console.log("==============mark-read=================",{ id, recieverId} )
        if (sendUserSocket) {
        socket.to(sendUserSocket).emit("mark-read-recieve", { id, recieverId });
        }
    });
    // socket.to(sendUserSocket).emit("mark-read-recieve", { id, recieverId });
    // noti-recieve
    });
};

export default socketServer;