import Spinner from "../atoms/Spinner";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Spinner />
      <p className="text-center text-gray-500 mt-4">Loading...</p>
    </div>
  );
};

export default Loading;
