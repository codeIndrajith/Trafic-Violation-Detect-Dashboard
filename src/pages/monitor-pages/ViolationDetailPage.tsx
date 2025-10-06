import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaVideo,
  FaInfoCircle,
  FaTimes,
  FaCheckCircle,
  FaShieldAlt,
  FaSpinner,
} from "react-icons/fa";
import { ref, update, onValue, off } from "firebase/database";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

const ViolationDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [violationData, setViolationData] = useState<any>(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  const queryParams = new URLSearchParams(window.location.search);
  const violationType = queryParams.get("type") || "Unknown Violation";
  let videoSrc = "";
  if (violationType === "u-turn-violations") {
    videoSrc = import.meta.env.VITE_UTURN_CUT_VEDIO_URL;
  } else if (violationType === "double-line-cut-violations") {
    videoSrc = import.meta.env.VITE_DOUBLE_LINE_CUT_VEDIO_URL;
  } else {
    videoSrc = "undefined";
  }

  // Fetch violation data
  useEffect(() => {
    if (!id || !violationType) return;

    const violationRef = ref(db, `${violationType}/${id}`);

    const unsubscribe = onValue(violationRef, (snapshot) => {
      const data = snapshot.val();
      setViolationData(data);
      setContentLoading(false);
    });

    return () => {
      off(violationRef, "value", unsubscribe);
    };
  }, [id, violationType]);

  const handleBackClick = () => {
    navigate("/monitor");
  };

  const handleVideoLoad = () => {
    setVideoLoading(false);
  };

  const handleVideoError = () => {
    setVideoLoading(false);
  };

  const handleViolationClick = (isConfirmed: boolean) => {
    setPendingAction(isConfirmed);
    setShowModal(true);
  };

  const handleViolationConfirmation = async (isConfirmed: boolean) => {
    if (!id) return;

    setIsLoading(true);
    try {
      const violationRef = ref(db, `${violationType}/${id}`);

      await update(violationRef, {
        status: isConfirmed ? "confirmed" : "safe",
        updatedAt: new Date().toISOString(),
      });

      if (isConfirmed) {
        toast.success("Violation confirmed and recorded.");
      } else {
        toast.success("Marked as safe. No violation recorded.");
      }
    } catch (error) {
      toast.error("Error updating violation status.");
      console.error("Error updating violation:", error);
    } finally {
      setIsLoading(false);
      setShowModal(false);
      setPendingAction(null);
    }
  };

  const closeModal = () => {
    if (!isLoading) {
      setShowModal(false);
      setPendingAction(null);
    }
  };

  const getModalContent = () => {
    if (pendingAction === true) {
      return {
        title: "Confirm Violation",
        message:
          "Are you sure you want to confirm this violation? This action will be recorded in the system.",
        confirmText: isLoading ? "Confirming..." : "Confirm Violation",
        cancelText: "Cancel",
        confirmColor: "bg-red-600 hover:bg-red-700",
        icon: FaCheckCircle,
      };
    } else {
      return {
        title: "Mark as Safe",
        message:
          "Are you sure this is not a violation? The case will be marked as safe and no violation will be recorded.",
        confirmText: isLoading ? "Marking Safe..." : "Yes, Mark as Safe",
        cancelText: "Cancel",
        confirmColor: "bg-green-600 hover:bg-green-700",
        icon: FaShieldAlt,
      };
    }
  };

  const getStatusLabel = () => {
    if (!violationData?.status) return null;

    if (violationData.status === "confirmed") {
      return (
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-3 rounded-xl border border-red-200">
          <FaCheckCircle className="text-red-600" />
          <span className="font-semibold">Violation Confirmed</span>
        </div>
      );
    } else if (violationData.status === "safe") {
      return (
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-3 rounded-xl border border-green-200">
          <FaShieldAlt className="text-green-600" />
          <span className="font-semibold">Marked as Safe</span>
        </div>
      );
    }
    return null;
  };

  const modalContent = getModalContent();
  const StatusIcon = modalContent.icon;

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
                  {!contentLoading && violationData?.status && getStatusLabel()}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Left column - Video player */}
            <div className="lg:col-span-1">
              {/* Video Skeleton */}
              {videoLoading && (
                <div className="bg-gray-200 rounded-xl overflow-hidden shadow-lg aspect-video animate-pulse">
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <div className="text-gray-500">Loading video...</div>
                  </div>
                </div>
              )}

              {/* Actual Video */}
              <div
                className={`bg-black rounded-xl overflow-hidden shadow-lg aspect-video ${
                  videoLoading ? "hidden" : "block"
                }`}
              >
                <video
                  controls
                  className="w-full h-full"
                  onLoadedData={handleVideoLoad}
                  onError={handleVideoError}
                >
                  <source src={videoSrc} type="video/mp4" />
                  <track kind="captions" src="" label="No captions available" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video controls info skeleton */}
              {contentLoading ? (
                <div className="mt-4 bg-gray-100 rounded-xl p-4 animate-pulse">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-700 flex items-center gap-2">
                    <FaInfoCircle />
                    Use video controls to play, pause, or navigate through the
                    footage
                  </p>
                </div>
              )}
            </div>

            {/* Right column - Violation details */}
            <div className="lg:col-span-1">
              {/* Description and notes skeleton */}
              {contentLoading ? (
                <div className="mt-6 bg-gray-50 rounded-xl p-5 animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 bg-gray-50 rounded-xl p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Review & Action Required
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Please review this video carefully. If you identify a
                    violation, confirm it. If not, mark it as safe.
                  </p>
                </div>
              )}

              {/* Action buttons or Status label skeleton */}
              <div className="mt-6">
                {contentLoading ? (
                  <div className="flex gap-4 flex-col sm:flex-row animate-pulse">
                    <div className="flex-1 h-12 bg-gray-300 rounded-xl"></div>
                    <div className="flex-1 h-12 bg-gray-300 rounded-xl"></div>
                  </div>
                ) : !violationData?.status ? (
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <button
                      onClick={() => handleViolationClick(true)}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:from-red-700 hover:to-red-800"
                    >
                      Confirm violation
                    </button>
                    <button
                      onClick={() => handleViolationClick(false)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:from-green-700 hover:to-green-800"
                    >
                      Not a violation
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    {getStatusLabel()}
                    <p className="text-gray-600 mt-3 text-sm">
                      This violation has been reviewed and{" "}
                      {violationData.status === "confirmed"
                        ? "confirmed"
                        : "marked as safe"}
                      .
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeModal}
          ></div>

          {/* Modal container */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <StatusIcon
                    className={`w-6 h-6 ${
                      pendingAction ? "text-red-600" : "text-green-600"
                    }`}
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {modalContent.title}
                  </h3>
                </div>
                {!isLoading && (
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-600 mb-6">{modalContent.message}</p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleViolationConfirmation(pendingAction!)}
                    disabled={isLoading}
                    className={`flex-1 ${modalContent.confirmColor} text-white py-3 px-6 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {isLoading && <FaSpinner className="animate-spin" />}
                    {modalContent.confirmText}
                  </button>
                  <button
                    onClick={closeModal}
                    disabled={isLoading}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium shadow-sm hover:shadow-md hover:bg-gray-400 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {modalContent.cancelText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViolationDetailPage;
