import { io } from 'socket.io-client';

const productionURL = 'https://api-socketio-chat-web-production.up.railway.app';
// const developmentURL = 'http://localhost:3001';

const socketURL = process.env.NODE_ENV === 'production' ? productionURL : developmentURL;

export const socket = io(socketURL);
