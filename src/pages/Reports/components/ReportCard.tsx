import { useNavigate } from "react-router-dom";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineCar,
  AiOutlineMail,
  AiOutlineWarning,
  AiOutlineDollarCircle,
  AiOutlineRight,
} from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";

interface ReportCardProps {
  vehicleNumber: string;
  id: string;
  email: string;
  violation: string;
  fine: string;
  paid?: boolean;
  date?: string; // Optional date property
}

const ReportCard = ({
  vehicleNumber,
  id,
  email,
  violation,
  fine,
  paid = false,
  date,
}: ReportCardProps) => {
  const navigate = useNavigate();

  const handleNavigateToReportDetails = () => {
    navigate(`/${id}/generate-report`);
  };

  // Format date if provided
  const formatDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div
      onClick={handleNavigateToReportDetails}
      className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-100 group"
    >
      {/* Header with status badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`p-2 rounded-lg ${paid ? "bg-green-100" : "bg-red-100"}`}
          >
            {paid ? (
              <AiOutlineCheckCircle
                className={`text-lg ${
                  paid ? "text-green-600" : "text-red-600"
                }`}
              />
            ) : (
              <AiOutlineCloseCircle className="text-lg text-red-600" />
            )}
          </div>
          <div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                paid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {paid ? "Paid" : "Unpaid"}
            </span>
            {date && <p className="text-xs text-gray-500 mt-1">{formatDate}</p>}
          </div>
        </div>
        <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
          <FiArrowRight className="text-xl" />
        </div>
      </div>

      {/* Report details */}
      <div className="space-y-3">
        {/* Vehicle Number */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <AiOutlineCar className="text-lg" />
            <span className="text-sm font-medium">Vehicle</span>
          </div>
          <p className="text-sm font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
            {vehicleNumber}
          </p>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <AiOutlineMail className="text-lg" />
            <span className="text-sm font-medium">Email</span>
          </div>
          <p className="text-sm text-gray-700 truncate max-w-[160px]">
            {email}
          </p>
        </div>

        {/* Violation */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <AiOutlineWarning className="text-lg" />
            <span className="text-sm font-medium">Violation</span>
          </div>
          <p className="text-sm text-red-600 font-medium text-right max-w-[160px]">
            {violation}
          </p>
        </div>

        {/* Fine amount with separator */}
        <div className="border-t border-gray-100 pt-3 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <AiOutlineDollarCircle className="text-lg" />
              <span className="text-sm font-medium">Fine Amount</span>
            </div>
            <p className="text-lg font-bold text-red-500">{fine}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
