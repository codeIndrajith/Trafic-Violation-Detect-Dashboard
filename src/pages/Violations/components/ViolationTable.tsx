import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "../../../config/firebase";
import { Violation } from "../../../interface/violationInterface";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiFileText,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiEye,
  FiPlusCircle,
} from "react-icons/fi";

const ViolationTable: React.FC = () => {
  const [violations, setViolations] = useState<Violation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const doubleLineRef = ref(db, "double-line-cut-violations");
      const uTurnRef = ref(db, "u-turn-violations");

      const [doubleLineSnap, uTurnSnap] = await Promise.all([
        get(doubleLineRef),
        get(uTurnRef),
      ]);

      const doubleLineData = doubleLineSnap.val() || {};
      const uTurnData = uTurnSnap.val() || {};

      const formData = (data: any, violationType: string): Violation[] => {
        return Object.entries(data).map(([key, item]: [string, any]) => ({
          id: key,
          number_plate: item.number_plate,
          vehicle: item.vehicle,
          violation: violationType,
          violation_count: item.violation_count,
          reportGen: item.reportGen,
          dateTime: item.dateTime,
        }));
      };

      const allViolations = [
        ...formData(doubleLineData, "Double Line Cutting"),
        ...formData(uTurnData, "Illegal U-turn"),
      ];

      setViolations(allViolations);
      localStorage.setItem("violationCount", allViolations.length.toString());
    } catch (error: any) {
      console.log("Error occurred during fetch violations data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredViolations = violations.filter((violation) => {
    const matchesSearch =
      violation.number_plate
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      violation.vehicle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      violation.violation?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "reported" && violation.reportGen) ||
      (filterStatus === "not-reported" && !violation.reportGen);

    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FiAlertCircle className="text-blue-600" />
            Traffic Violations
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {violations.length} Total violations recorded
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={isLoading}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <FiRefreshCw className={`${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by vehicle, type, or violation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center w-full gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="reported">Report Generated</option>
            <option value="not-reported">Not Reported</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Violation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                // Skeleton Loader
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 bg-gray-200 rounded w-8 mx-auto"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-8 bg-gray-200 rounded w-24"></div>
                    </td>
                  </tr>
                ))
              ) : filteredViolations.length > 0 ? (
                filteredViolations.map((violation) => (
                  <tr
                    key={violation.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {violation.number_plate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 capitalize">
                        {violation.vehicle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {violation.violation}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        {violation.violation_count}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(violation.dateTime)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {violation.reportGen ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FiCheckCircle className="mr-1" />
                          Reported
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/${violation.id}/generate-report`}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          violation.reportGen
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {violation.reportGen ? (
                          <>
                            <FiEye className="mr-1" />
                            View Report
                          </>
                        ) : (
                          <>
                            <FiPlusCircle className="mr-1" />
                            Generate
                          </>
                        )}
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FiAlertCircle className="text-3xl mb-2 text-gray-400" />
                      <p className="font-medium">No violations found</p>
                      <p className="text-sm mt-1">
                        {searchTerm || filterStatus !== "all"
                          ? "Try adjusting your search or filter criteria"
                          : "No violations have been detected yet"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViolationTable;
