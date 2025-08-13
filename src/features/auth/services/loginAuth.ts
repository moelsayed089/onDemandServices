// src/features/auth/hooks/useLoginAuth.ts
import { useDispatch } from "react-redux";
import { usePostMutation } from "../../../app/api/usePostMutation";
import type { LoginPayload, LoginResponse } from "../types/login";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../authSlice";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import socket from "../../../app/api/socket";
import { addMessage, removeMessage } from "../../../app/slice/messageSlice";
import { v4 as uuidv4 } from "uuid";

const useLoginAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return usePostMutation<LoginResponse, LoginPayload>("/api/v1/auth/login", {
    onSuccess: (data) => {
      toast.success("Login Success", {
        position: "bottom-right",
        duration: 2000,
      });
      socket.auth = { token: data.accessToken };
      socket.connect();

      socket.on("connect", () => {
        socket.emit("client:authenticate", { token: data.accessToken });
      });

      socket.on("authentication_success", () => {
        socket.on("authentication_success", () => {});
      });

      socket.onAny((event, ...args) => {
        console.log(`Socket event received: ${event}`, args);
        if (args.length > 0 && args[0].message) {
          const data = args[0];

          const eventId = data.moveId || data.id || data.orderId || uuidv4();

          dispatch(addMessage({ id: eventId, text: data.message }));

          setTimeout(() => {
            dispatch(removeMessage(eventId));
          }, 60_000);
        }
      });

      dispatch(
        loginSuccess({
          role: data.data.role,
          accessToken: data.accessToken,
          accessTokenExpires: data.accessTokenExpires,
        })
      );

      if (data.data.role === "superAdmin") navigate("/admin");
      else if (data.data.role === "driver") navigate("/driver");
      else navigate("/");
    },
    onError: (error) => {
      console.log(error);
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message;

      console.log("login Error:", errorMessage || "Something went wrong");
      toast.error(errorMessage || "Something went wrong", {
        position: "bottom-right",
        duration: 2000,
      });
    },
  });
};

export default useLoginAuth;
