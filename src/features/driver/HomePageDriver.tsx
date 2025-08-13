import { useEffect } from "react";
import socket from "../../app/api/socket";

const HomePageDriver = () => {
  useEffect(() => {
    socket.on("newOrder", (order) => {
      console.log("🚗 Order received:", order);
      // هنا تعمل تحديث لواجهة المستخدم
    });

    return () => {
      socket.off("newOrder");
    };
  }, []);
  return <div>HomePageDriver</div>;
};

export default HomePageDriver;
