// No arquivo do cliente
import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? 'https://api-socket-io-chat-web.vercel.app' : 'http://localhost:3001';

export const socket = io(URL);
