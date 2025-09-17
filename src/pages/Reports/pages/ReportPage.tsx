import { useEffect, useState } from "react";
import ReportCard from "../components/ReportCard";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { ReportData } from "../../../interface/violationInterface";
import {
  FiAlertCircle,
  FiRefreshCw,
  FiFileText,
  FiFilter,
  FiSearch,
} from "react-icons/fi";
import { ReportGenerateData } from "../../Violations/components/GenerateReportForm";

const ReportPage = () => {
  const [reports, setReports] = useState<ReportData[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const reportsCol = collection(firestore, "reports");
      const reportSnapshot = await getDocs(reportsCol);

      const reportList: ReportData[] = reportSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ReportData, "id">),
      }));

      setReports(reportList);
      localStorage.setItem("ReportCount", reportList.length.toString());
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports?.filter((report: ReportGenerateData) => {
    const matchesSearch =
      report.vehicleNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.violation?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "paid" && report.isPaid) ||
      (filterStatus === "unpaid" && !report.isPaid);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FiFileText className="text-blue-600" />
            Traffic Violation Reports
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage all reported traffic violations
          </p>
        </div>

        {/* Stats and Controls Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <FiFileText className="text-blue-600 text-xl" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  {reports?.length || 0} Reports
                </h2>
                <p className="text-sm text-gray-500">
                  Total violations recorded
                </p>
              </div>
            </div>

            <button
              onClick={fetchReport}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <FiRefreshCw className={`${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {/* Search and Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by vehicle, email, or violation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <FiFilter className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {loading ? (
            // Enhanced Skeleton Loader
            <>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-6 w-24 bg-gray-200 rounded-md"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="h-4 w-16 bg-gray-100 rounded"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>

                    <div className="flex justify-between">
                      <div className="h-4 w-20 bg-gray-100 rounded"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>

                    <div className="flex justify-between">
                      <div className="h-4 w-24 bg-gray-100 rounded"></div>
                      <div className="h-4 w-28 bg-gray-200 rounded"></div>
                    </div>

                    <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                      <div className="h-5 w-16 bg-gray-100 rounded"></div>
                      <div className="h-6 w-20 bg-red-200 rounded-md"></div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : filteredReports && filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <ReportCard
                key={report.violationId}
                id={report.violationId}
                vehicleNumber={report.vehicleNumber}
                email={report.email}
                violation={report.violation}
                fine={`Rs. ${report.fine}`}
                paid={report.paid}
                // Assuming your ReportData has a date field
              />
            ))
          ) : (
            // Enhanced Empty State
            <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <FiAlertCircle className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No reports found
              </h3>
              <p className="text-gray-500 max-w-md">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No violations have been reported yet. Check back later."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
