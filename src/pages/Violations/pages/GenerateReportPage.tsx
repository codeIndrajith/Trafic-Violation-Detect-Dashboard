import GenerateReportForm from "../components/GenerateReportForm";
import GenerateReport from "../components/GenerateReport";
import { useParams, useSearchParams } from "react-router-dom";
import { Violation } from "../../../interface/violationInterface";
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { db } from "../../../config/firebase";

const GenerateReportPage = () => {
  const params = useParams();
  const id = params.id;
  const [violation, setViolation] = useState<Violation>();
  const [section, setSection] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const sections = ["u-turn-violations", "double-line-cut-violations"];

    const fetchViolation = async () => {
      try {
        for (const sec of sections) {
          const snapshot = await get(ref(db, `${sec}/${id}`));
          if (snapshot.exists()) {
            setViolation(snapshot.val());
            setSection(sec);
            break;
          }
        }
      } catch (err) {
        console.error("Error checking violations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchViolation();
  }, [id]);

  return (
    <div className="w-full px-8">
      <h1 className="text-xl font-semibold">Generate Report For Violations</h1>

      {loading ? (
        <div className="w-full min-h-[500px] mt-4 animate-pulse">
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-12">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>
            <div className="flex items-center gap-12">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>
          </div>

          <div className="w-full mt-14 flex flex-col gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i + 1} className="w-full flex items-center gap-4 px-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}

            <div className="mt-4 bg-gray-300 rounded-sm h-10 w-40 mx-2"></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-center gap-2 w-full">
          {violation?.reportGen === false && (
            <GenerateReportForm data={violation ?? {}} />
          )}
          {violation?.reportGen === true && <GenerateReport />}
        </div>
      )}
    </div>
  );
};

export default GenerateReportPage;
