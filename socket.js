import { io } from 'socket.io-client';

// URL do servidor Socket.IO (Vercel neste caso)
const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://api-planetscale-psi.vercel.app';

// Ajuste o caminho para refletir a estrutura de pastas do seu servidor Socket.IO
const socket = io(URL, {
  path: '/sockets/socket.js',
});

export default socket;
