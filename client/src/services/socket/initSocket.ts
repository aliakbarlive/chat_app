import { io } from 'socket.io-client';
import { socketListenEvent } from './event';

export const initSocket = ({ setSocketValue }:any) => {
  const socket = io(`${process.env.VITE_SERVER_URL}`);

  socketListenEvent(socket, { setSocketValue });
  setSocketValue((prev: any) => ({ ...prev, socket }));
};
