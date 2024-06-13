import { io } from 'socket.io-client';

export const initSocket = ({ setSocketValue }:any) => {
  const socket = io(`${process.env.VITE_SERVER_URL}`);

//   socketListenEvent(socket, { setSocketValue });
  setSocketValue((prev: any) => ({ ...prev, socket }));

  // return {
  //   socket,
  //   disconnect: () => {
  //     console.log('DISCONNECT')
  //     setSocketValue()
  //     socket.disconnect()
  //   }
  // }
};
