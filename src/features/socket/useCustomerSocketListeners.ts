import { useEffect } from "react";
import socket from "../../app/api/socket";

export const useCustomerSocketListeners = () => {
  useEffect(() => {
    socket.on("move:searching_for_driver", (data) => {
      return data;
    });

    socket.on("move:driver_assigned", (data) => {
      return data;
    });

    socket.on("move:status_updated", (data) => {
      return data;
    });

    socket.on("move:cancelled", (data) => {
      console.log("Move cancelled:", data);
    });

    return () => {
      socket.off("move:searching_for_driver");
      socket.off("move:driver_assigned");
      socket.off("move:status_updated");
      socket.off("move:cancelled");
    };
  }, []);
};
