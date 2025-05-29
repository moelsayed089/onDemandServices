import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/atoms/Button";
import { useEffect, useState } from "react";

export const ConfirmEmailForm = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-gray-200 w-full max-w-xl p-6 md:p-10 flex flex-col gap-6 items-center justify-center rounded-md">
          <h1 className="text-2xl md:text-3xl text-gray-800 font-medium text-center">
            Confirm Email
          </h1>

          <p className="text-base md:text-lg text-gray-600 text-center">
            Thank you for registering in Swift Move. To start using your
            account, please confirm your email address by clicking on the
            "Confirm your email" button.
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            <Button
              onClick={() => navigate("/resendemail")}
              className="w-full md:w-auto hover:cursor-pointer"
            >
              Resend Confirmation Email
            </Button>
            <Button
              onClick={() => navigate("/login")}
              className="w-full md:w-auto hover:cursor-pointer"
            >
              Sign In
            </Button>
          </div>

          <p className="text-sm md:text-base text-gray-500 text-center">
            Time left: {formatTime(secondsLeft)}
          </p>
          <p className="text-xs text-gray-500 text-center">
            Welcome to Swift Move, Swift Move Team.
          </p>
        </div>
      </div>
    </>
  );
};
