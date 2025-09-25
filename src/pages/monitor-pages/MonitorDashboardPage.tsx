import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import {
  FaCar,
  FaCalendarAlt,
  FaListAlt,
  FaSearch,
  FaFilter,
  FaTrafficLight,
} from "react-icons/fa";

interface ViolationData {
  id: string;
  dateTime: string;
  number_plate: string;
  vehicle: string;
  violation: string;
  violation_count: number;
}

const MonitorDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [violations, setViolations] = useState<ViolationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");

  const handleCardClick = (id: string) => {
    navigate(`/monitor/${id}`);
  };

  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const snapshot = await get(ref(db));
        const data = snapshot.val();

        const mergedViolations: ViolationData[] = [];

        const sources = ["double-line-cut-violations", "u-turn-violations"];

        sources.forEach((type) => {
          const typeData = data?.[type];
          if (typeData) {
            Object.entries(typeData).forEach(([key, value]: any) => {
              // Validate that required fields exist
              if (
                value &&
                value.dateTime &&
                value.number_plate &&
                value.vehicle
              ) {
                mergedViolations.push({
                  id: key,
                  dateTime: value.dateTime,
                  number_plate: value.number_plate,
                  vehicle: value.vehicle,
                  violation: type,
                  violation_count: value.violation_count ?? 1,
                });
              }
            });
          }
        });

        setViolations(mergedViolations);
      } catch (error) {
        console.error("Error fetching violations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchViolations();
  }, []);

  const filteredViolations = violations.filter((violation) => {
    const numberPlate = violation.number_plate || "";
    const vehicle = violation.vehicle || "";

    const matchesSearch =
      numberPlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" || violation.violation === filterType;

    return matchesSearch && matchesFilter;
  });

  const getViolationTypeDisplay = (type: string) => {
    return type
      ? type.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
      : "Unknown Violation";
  };

  const getViolationColor = (type: string) => {
    switch (type) {
      case "double-line-cut-violations":
        return "bg-gradient-to-r from-amber-500 to-orange-600";
      case "u-turn-violations":
        return "bg-gradient-to-r from-red-500 to-pink-600";
      default:
        return "bg-gradient-to-r from-blue-500 to-indigo-600";
    }
  };

  return (
    <div className="min-h-screen p-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FaTrafficLight className="text-blue-600" />
              Violation Monitoring Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Review and manage traffic violations
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-3 mt-4 md:mt-0">
            <p className="text-gray-800 font-medium flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">{violations.length}</h3>
                <p className="text-blue-100">Total Violations</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <FaListAlt className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">
                  {
                    violations.filter(
                      (v) => v.violation === "double-line-cut-violations"
                    ).length
                  }
                </h3>
                <p className="text-amber-100">Double Line Cuts</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <FaCar className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">
                  {
                    violations.filter(
                      (v) => v.violation === "u-turn-violations"
                    ).length
                  }
                </h3>
                <p className="text-red-100">U-Turn Violations</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <FaCar className="text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by number plate or vehicle type..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative w-full md:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Violations</option>
                <option value="double-line-cut-violations">
                  Double Line Cut
                </option>
                <option value="u-turn-violations">U-Turn</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Violation Grid or Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 shadow-md animate-pulse space-y-4"
                >
                  <div className="h-7 bg-gray-300 rounded-xl w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))
            : filteredViolations.map((violation) => (
                <div
                  key={violation.id}
                  onClick={() => handleCardClick(violation.id)}
                  className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
                >
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white mb-4 ${getViolationColor(
                      violation.violation
                    )}`}
                  >
                    {getViolationTypeDisplay(violation.violation)}
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaCar className="text-blue-500" />
                    {violation.number_plate || "Unknown Plate"}
                  </h2>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-medium">Vehicle:</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-md">
                        {violation.vehicle}
                      </span>
                    </p>

                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-medium">Date & Time:</span>
                      <span>
                        {new Date(violation.dateTime).toLocaleString()}
                      </span>
                    </p>

                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="font-medium">Violation Count:</span>
                      <span
                        className={`px-2 py-1 rounded-md ${
                          violation.violation_count > 1
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {violation.violation_count}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-xs text-blue-600 font-medium">
                      Click to view details
                    </p>
                  </div>
                </div>
              ))}
        </div>

        {/* Empty State */}
        {!loading && filteredViolations.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center mt-8">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-blue-500 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No violations found
            </h3>
            <p className="text-gray-600">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No violations have been recorded yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitorDashboardPage;
