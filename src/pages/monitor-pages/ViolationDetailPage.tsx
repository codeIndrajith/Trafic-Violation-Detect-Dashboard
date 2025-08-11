import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViolationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // In a real app, you would fetch the violation data based on the ID
  const violation = {
    id: "1",
    title: "Intersection Violation",
    location: "Main St & 5th Ave",
    timestamp: "2023-05-15 08:23:45",
    severity: "High",
    videoUrl: "/videos/3.mp4",
    description:
      "Vehicle failed to stop at the stop sign and proceeded through the intersection without yielding to oncoming traffic.",
    cameraId: "CAM-1024",
    vehicleInfo: "White Sedan, License: ABC1234",
  };

  const handleBackClick = () => {
    navigate("/monitor");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={handleBackClick}
          className="mb-6 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {violation.title}
          </h1>
        </div>

        {/* Video Player */}
        <div className="bg-black rounded-lg overflow-hidden mb-6 aspect-video">
          <video controls className="w-full h-full">
            <source src={violation.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Details Card */}
        {/* <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Violation Details
          </h2>
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-800">{violation.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Timestamp</p>
                <p className="text-gray-800">{violation.timestamp}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Camera ID</p>
                <p className="text-gray-800">{violation.cameraId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Vehicle</p>
                <p className="text-gray-800">{violation.vehicleInfo}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Description</p>
              <p className="text-gray-800">{violation.description}</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ViolationDetailPage;
