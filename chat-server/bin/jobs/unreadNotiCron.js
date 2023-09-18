import  cron from 'node-cron';
import getPrismaInstance from "../../utils/prismaClient.js";

const checkUnreadMessages = () => {
    const prisma = getPrismaInstance();

    // better to push to a queue
    onlineUsers.forEach(async(value, key)=> {
        const userMessage = await prisma.user.findUnique({
            where: { socketId: value },
            include: {
              recievedMessages: {
                include: { reciever: true, sender: true },
                where: {
                    messageStatus: 'delivered',
                    createdAt: {
                      // change this to control time unread to send notify
                        gt: new Date(new Date() - 60 * 60 * 1000)
                    }
                },
                orderBy: { createdAt: "desc" },
              },
            },
          });

        if (userMessage.recievedMessages.length) {
            chatSocket.to(value).emit('noti-recieve', {notifications:  userMessage.recievedMessages});
        }
    });
  };
  

export const init = () => {
      // change this to control time scron. 
    cron.schedule('*/30 * * * * *', () => {
        console.log('Running cron job...');
        checkUnreadMessages();
      });
}