import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaExclamationTriangle,
  FaVideo,
  FaInfoCircle,
  FaCar,
} from "react-icons/fa";

const ViolationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/monitor");
  };

  return (
    <div className="">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 bg-white py-2 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-gray-700 hover:text-blue-600"
          >
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Violation
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="inline-flex items-center text-blue-100">
                    <FaVideo className="mr-2" />
                    Camera: CAM-1024
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Left column - Video player */}
            <div className="lg:col-span-1">
              <div className="bg-black rounded-xl overflow-hidden shadow-lg aspect-video">
                <video controls className="w-full h-full">
                  <source
                    src={
                      "https://res.cloudinary.com/dn8ypojvn/video/upload/v1756885170/a8wwnw9dkcw6bxqfdmjp.mov"
                    }
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video controls info */}
              <div className="mt-4 bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-blue-700 flex items-center gap-2">
                  <FaInfoCircle />
                  Use video controls to play, pause, or navigate through the
                  footage
                </p>
              </div>
            </div>

            {/* Right column - Violation details */}
            <div className="lg:col-span-1">
              {/* Description and notes */}
              <div className="mt-6 bg-gray-50 rounded-xl p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Review & Action Required
                </h2>
                <p className="text-gray-600 mb-6">
                  Please review this video carefully. If you identify a
                  violation, confirm it. If not, mark it as safe.
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex gap-4">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300">
                  Cofirm violation
                </button>
                <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-300">
                  Not a violation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViolationDetailPage;
