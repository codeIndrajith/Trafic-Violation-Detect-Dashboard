import { useEffect, useState } from "react";
import ReportCard from "../components/ReportCard";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { ReportData } from "../../../interface/violationInterface";

const ReportPage = () => {
  const [reports, setReports] = useState<ReportData[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const reportsCol = collection(firestore, "reports");
        const reportSnapshot = await getDocs(reportsCol);

        const reportList: ReportData[] = reportSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ReportData, "id">),
        }));

        setReports(reportList);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  return (
    <div className="w-full min-h-screen overflow-y-auto p-4 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          // ✅ Skeleton Loader Section
          <>
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="border rounded-lg flex gap-2 items-center justify-between w-full p-4 animate-pulse"
              >
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-28 bg-gray-200 rounded-sm" />
                    <div className="h-3 w-24 bg-gray-100 rounded-sm" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="h-4 w-20 bg-gray-200 rounded-sm" />
                    <div className="h-3 w-32 bg-gray-100 rounded-sm" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded-sm" />
                    <div className="h-3 w-28 bg-gray-100 rounded-sm" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="h-4 w-16 bg-gray-200 rounded-sm" />
                    <div className="h-4 w-20 bg-red-200 rounded-sm" />
                  </div>
                </div>

                <div className="self-start">
                  <div className="h-5 w-5 bg-gray-300 rounded-full" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {reports &&
              reports?.length > 0 &&
              reports.map((report) => (
                <ReportCard
                  key={report.violationId}
                  vehicleNumber={report.vehicleNumber}
                  email={report.email}
                  violation={report.violation}
                  fine={`Rs. ${report.fine}`}
                  // paid={report.paid}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
