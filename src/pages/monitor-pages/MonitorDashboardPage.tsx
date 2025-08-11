import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";

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
              mergedViolations.push({
                id: key,
                dateTime: value.dateTime,
                number_plate: value.number_plate,
                vehicle: value.vehicle,
                violation: type,
                violation_count: value.violation_count ?? 1,
              });
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Violation Monitoring Dashboard
          </h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Violation Grid or Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow animate-pulse space-y-4"
                >
                  <div className="h-6 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))
            : violations.map((violation) => (
                <div
                  key={violation.id}
                  onClick={() => handleCardClick(violation.id)}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
                    {violation.violation.replace(/-/g, " ")}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Number Plate:</strong> {violation.number_plate}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Vehicle:</strong> {violation.vehicle}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Date & Time:</strong>{" "}
                    {new Date(violation.dateTime).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Violation Count:</strong>{" "}
                    {violation.violation_count}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MonitorDashboardPage;
