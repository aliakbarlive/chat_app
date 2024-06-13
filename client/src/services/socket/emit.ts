import { Socket } from "socket.io-client";

export const socketEmitEvent = (socket: Socket) => {
    return {
        userOnline: (userId: string, socketId: string) => {
            socket.emit('USER_ONLINE', userId, socketId);
        },
        userOffline: (userId: string) => {
            socket.emit('USER_OFFLINE', userId);
        },
        sendMessage: (messageData: object) => {
            // type, message, senderId, receiverId
            console.log('send message emit', messageData);
            socket.emit('SEND_MESSAGE', messageData);
        },
        updateMessageStatus: (updatedData: object) => {
            console.log('socket updatedData', updatedData);
            socket.emit('UPDATE_MESSAGE_STATUS', updatedData);
        },
        updateMessageReaders: (updatedData: object) => {
            console.log('socket updatedData===>>>', updatedData);
            socket.emit('UPDATE_MESSAGE_READERS', updatedData);
        },
        userTyping: (typingNotify: string) => {
            console.log('=== user typing ===', typingNotify);
            socket.emit('USER_TYPING', typingNotify);
        },
        enterChatRoom: (data: object) => {
            console.log('=== enter chat room ===', data);
            socket.emit('ENTER_CHAT_ROOM', data);
        },
        leaveChatRoom: (data: object) => {
            console.log('=== leave chat room ===', data);
            socket.emit('LEAVE_CHAT_ROOM', data);
        },
        roomCreated: (data: object) => {
            console.log('** create room **', data);
            socket.emit('ROOM_CREATED', data);
        }
    };
};
