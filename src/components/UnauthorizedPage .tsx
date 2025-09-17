import { FaLock } from "react-icons/fa";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <FaLock className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
      <p className="text-gray-600 mt-2">
        You don’t have permission to view this page.
      </p>
    </div>
  );
};

export default UnauthorizedPage;
