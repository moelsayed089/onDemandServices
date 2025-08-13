import { useEffect } from "react";
import socket from "../../app/api/socket";

export const useDriverSocketListeners = () => {
  useEffect(() => {
    socket.on("driver:new_move_request", (data) => {
      return data;
    });

    socket.on("move:cancelled", (data) => {
      return data;
    });

    return () => {
      socket.off("driver:new_move_request");
      socket.off("move:cancelled");
    };
  }, []);
};
