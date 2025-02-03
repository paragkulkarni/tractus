import io from 'socket.io-client';

const socket = new io("http://localhost:8080", {
    path: "/socket.io",
  transports: ["websocket"],
    rejectUnauthorized: false,
    autoConnect: false,
    withCredentials: false
})

export default socket;