import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

socket.on("connect", () => {
  return socket.id;
});

socket.on("disconnect", (reason) => {
  return reason;
});

export default socket;
