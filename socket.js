import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? '' : 'https://api-socketio-chat-web-production.up.railway.app';

export const socket = io(URL);
