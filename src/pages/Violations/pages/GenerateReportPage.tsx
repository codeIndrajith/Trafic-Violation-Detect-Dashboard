import GenerateReportForm from "../components/GenerateReportForm";
import GenerateReport from "../components/GenerateReport";
import { useParams, useNavigate } from "react-router-dom";
import { Violation } from "../../../interface/violationInterface";
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { db } from "../../../config/firebase";
import {
  FiFileText,
  FiAlertCircle,
  FiArrowLeft,
  FiLoader,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

const GenerateReportPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const [violation, setViolation] = useState<Violation | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No violation ID provided");
      setLoading(false);
      return;
    }

    const sections = ["u-turn-violations", "double-line-cut-violations"];

    const fetchViolation = async () => {
      try {
        setLoading(true);
        setError(null);

        for (const sec of sections) {
          const snapshot = await get(ref(db, `${sec}/${id}`));
          if (snapshot.exists()) {
            setViolation(snapshot.val());
            setSection(sec);
            setLoading(false);
            return;
          }
        }

        setError("Violation not found");
        setLoading(false);
      } catch (err) {
        console.error("Error checking violations:", err);
        setError("Failed to load violation data");
        setLoading(false);
      }
    };

    fetchViolation();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  // Format section name for display
  const formatSectionName = (sec: string | null) => {
    if (!sec) return "";
    return sec
      .replace("-violations", "")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-6 group"
          >
            <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <FiFileText className="text-2xl text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Violation Report
              </h1>
              <p className="text-gray-600 mt-2">
                Generate and manage traffic violation reports
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-md shadow-md overflow-hidden">
          {/* Loading State */}
          {loading && (
            <div className="p-8">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p className="text-gray-600 mt-6 font-medium">
                  Loading violation data...
                </p>
              </div>

              {/* Skeleton loader */}
              <div className="animate-pulse mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}>
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
                <div className="h-12 bg-gray-300 rounded w-1/4 mt-6"></div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="p-8">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-red-100 p-5 rounded-full mb-6">
                  <FiAlertCircle className="text-red-600 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Unable to Load Data
                </h3>
                <p className="text-gray-600 mb-8 max-w-md">{error}</p>
                <div className="flex gap-4">
                  <button
                    onClick={handleGoBack}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <FiLoader className="text-lg" />
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {!loading && !error && violation && (
            <div>
              {/* Status Header */}
              <div
                className={`px-8 py-6 ${
                  violation.reportGen ? "bg-green-50" : "bg-blue-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${
                      violation.reportGen ? "bg-green-100" : "bg-blue-100"
                    }`}
                  >
                    {violation.reportGen ? (
                      <FiCheckCircle className="text-2xl text-green-600" />
                    ) : (
                      <FiAlertTriangle className="text-2xl text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {violation.reportGen
                        ? "Report Generated"
                        : "Report Pending"}
                    </h2>
                    <p className="text-gray-600">
                      {formatSectionName(section)} Violation •{" "}
                      {violation.reportGen ? "Completed" : "Needs Attention"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="">
                {violation.reportGen === false && (
                  <GenerateReportForm data={violation} />
                )}
                {violation.reportGen === true && <GenerateReport />}
              </div>
            </div>
          )}

          {/* No Data State */}
          {!loading && !error && !violation && (
            <div className="p-8">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-100 p-5 rounded-full mb-6">
                  <FiAlertCircle className="text-gray-600 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Violation Found
                </h3>
                <p className="text-gray-600 mb-8">
                  The requested violation could not be found in our system.
                </p>
                <button
                  onClick={handleGoBack}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateReportPage;
