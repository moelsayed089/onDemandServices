import { io } from "socket.io-client";

const socket = io("https://swift-move.onrender.com", {
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
