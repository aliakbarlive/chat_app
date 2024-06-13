import { Socket } from "socket.io-client";

interface SocketValue {
    socketId?: string;
    onlineUsers?: any;
    messageData?: any;
    messageReadStatus?: any;
    typingNotify?: any;
    roomNotify?: string;
}
interface SetSocketValue {
    (value: (prev: SocketValue) => SocketValue): void;
}

interface SocketListenEventArgs {
    setSocketValue: SetSocketValue;
}
export const socketListenEvent = (socket: Socket, { setSocketValue }: SocketListenEventArgs) => {
    socket.on('connect', () => {
        setSocketValue((prev) => ({
            ...prev,
            socketId: socket.id
        }));
    });

    socket.on('ONLINE_USER_CHANGED', (onlineUsers) => {
        setSocketValue((prev) => ({
            ...prev,
            onlineUsers
        }));
    });

    // receive message
    socket.on('RECEIVE_MESSAGE', (messageData) => {
        console.log('RECEIVE_MESSAGE', messageData);
        setSocketValue((prev) => ({
            ...prev,
            messageData
        }));
    });

    // message has been read
    socket.on('MESSAGE_READ', (messageReadStatus) => {
        setSocketValue((prev) => ({
            ...prev,
            messageReadStatus
        }));
    });

    // someone is typing
    socket.on('TYPING_NOTIFY', (typingNotify) => {
        setSocketValue((prev) => ({
            ...prev,
            typingNotify
        }));
    });

    // someone enter / leave chat room
    socket.on('CHAT_ROOM_NOTIFY', ({ message }) => {
        setSocketValue((prev) => ({
            ...prev,
            roomNotify: message
        }));
    });
};
