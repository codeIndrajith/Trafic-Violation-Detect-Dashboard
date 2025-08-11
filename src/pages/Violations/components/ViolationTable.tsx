import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "../../../config/firebase";
import { MdWarning } from "react-icons/md";
import { Violation } from "../../../interface/violationInterface";
import { FaCheckCircle } from "react-icons/fa";

const ViolationTable: React.FC = () => {
  const [violations, setViolations] = useState<Violation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
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

        const formData = (data: any, p0: string): Violation[] => {
          return Object.entries(data).map(([key, item]: [string, any]) => ({
            id: key,
            number_plate: item.number_plate,
            vehicle: item.vehicle,
            violation: item.violation,
            violation_count: item.violation_count,
            reportGen: item.reportGen,
          }));
        };

        const allViolations = [
          ...formData(doubleLineData, "Double Line Cutting"),
          ...formData(uTurnData, "Illegal U-turn"),
        ];

        setViolations(allViolations);
        const violationCount = allViolations.length;
        localStorage.setItem("violationCount", violationCount.toString());
      } catch (error: any) {
        console.log("Error occured during fetch violations data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-[350px] overflow-y-auto">
      <table className="w-full border-collapse" aria-hidden="true">
        <thead className="text-md bg-gray-100 sticky top-0 z-10">
          <tr>
            <td>Vehicle Number</td>
            <td>Vehicle Type</td>
            <td>Violation</td>
            <td>Violation Count</td>
            <td>Report Generated</td>
            <td>Action</td>
          </tr>
        </thead>
        {isLoading ? (
          <tbody>
            {Array.from({ length: 4 }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="p-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
                <td className="p-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </td>
                <td className="p-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </td>
                <td className="p-2">
                  <div className="h-4 bg-gray-200 rounded w-10"></div>
                </td>
                <td className="p-2">
                  <div className="h-4 bg-gray-200 rounded w-10"></div>
                </td>
                <td className="p-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody className="text-xs">
            {violations && violations.length > 0 ? (
              violations.map((violation, index) => (
                <tr key={index + 1}>
                  <td className="p-2">{violation.number_plate}</td>
                  <td className="p-2">{violation.vehicle}</td>
                  <td className="p-2">{violation.violation}</td>

                  <td className="p-2">{violation.violation_count}</td>
                  <td className="p-2">
                    {violation.reportGen === true ? (
                      <p className="text-green-500">Generated</p>
                    ) : (
                      <p className="text-red-500">Not Generated</p>
                    )}
                  </td>
                  <td>
                    {violation.reportGen === true ? (
                      <Link
                        to={`/${violation.id}/generate-report`}
                        className="text-green-500 p-2 flex items-center gap-2 hover:text-blue-500 hover:underline transition"
                      >
                        <FaCheckCircle /> <p>See Report</p>
                      </Link>
                    ) : (
                      <Link
                        to={`/${violation.id}/generate-report`}
                        className="p-2 cursor-pointer hover:text-blue-500 hover:underline transition"
                      >
                        Generate report
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <div className="flex items-center gap-2 mt-8 bg-gray-200 p-2 w-full">
                <MdWarning />
                <p>Violations not detect</p>
              </div>
            )}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ViolationTable;
