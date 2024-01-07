import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://api-socket-io-chat-je6x0n7sk-afonsos-projects.vercel.app';

export const socket = io(URL);

