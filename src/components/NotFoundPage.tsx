import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50">
      <FaExclamationTriangle className="text-yellow-500 text-6xl mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
