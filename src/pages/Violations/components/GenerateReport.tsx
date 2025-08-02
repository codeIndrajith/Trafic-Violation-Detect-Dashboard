import { useEffect, useState } from "react";
import { MdReportProblem } from "react-icons/md";
import { ReportData } from "../../../interface/violationInterface";
import { firestore } from "../../../config/firebase";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { ImSpinner6 } from "react-icons/im";

const GenerateReport: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const [report, setReport] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [sendStatus, setSendStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  useEffect(() => {
    const loadReport = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const docRef = doc(firestore, "reports", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setReport(docSnap.data() as ReportData);
        } else {
          console.warn("No report found with ID:", id);
          setReport(null);
        }
      } catch (error: any) {
        console.error("Error fetching report:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReport();
  }, [id]);

  const [userEmail, setUserEmail] = useState<string>("");
  const sendEmailViaReportHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSendStatus({});

    console.log("send email funcitonality");
  };
  return (
    <>
      {isLoading ? (
        <div className="w-full rounded-sm min-h-[500px] animate-pulse">
          <div className="border p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-red-300 rounded-full" />
              <div className="h-4 w-32 bg-red-200 rounded" />
            </div>

            <div className="w-full px-2 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i + 1} className="w-full flex items-center gap-6">
                  <div className="h-4 w-32 bg-gray-200 rounded-sm" />
                  <div className="h-3 w-40 bg-gray-100 rounded-sm" />
                </div>
              ))}

              <div className="w-full flex items-center gap-6 mb-4">
                <div className="h-4 w-32 bg-gray-200 rounded-sm" />
                <div className="h-4 w-28 bg-red-200 rounded-sm" />
              </div>

              <div className="mt-2 flex flex-col gap-2 text-xs">
                <div className="h-3 w-40 bg-gray-200 rounded-sm" />
                <div className="h-3 w-48 bg-gray-200 rounded-sm" />
                <div className="h-3 w-32 bg-gray-200 rounded-sm" />
              </div>
            </div>
          </div>

          <div className="py-2">
            <div className="grid grid-cols-4 gap-2">
              <div className="h-9 col-span-3 bg-gray-200 rounded-sm" />
              <div className="h-9 col-span-1 bg-blue-300 rounded-sm" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-sm min-h-[500px]">
          <div className="border p-4">
            <div className="flex items-center gap-2 mb-4">
              <MdReportProblem className="text-red-500" />
              <h1 className="text-lg text-red-600">Violation Report</h1>
            </div>

            <div className="w-full px-2">
              <div className="w-full flex items-center gap-6 mb-4">
                <h1 className="font-semibold text-sm text-gray-700">
                  Vehicle Number
                </h1>
                <p className="text-gray-600 text-xs">{report?.vehicleNumber}</p>
              </div>

              <div className="w-full flex items-center gap-6 mb-4">
                <h1 className="font-semibold text-sm text-gray-700">
                  Time & Date
                </h1>
                <p className="text-gray-600 text-xs">
                  <p>
                    {report?.createdAt &&
                      new Date(report.detectDateTime).toLocaleString()}
                  </p>
                </p>
              </div>

              <div className="w-full flex items-center gap-6 mb-4">
                <h1 className="font-semibold text-sm text-gray-700">Email</h1>
                <p className="text-gray-600 text-xs">{report?.email}</p>
              </div>

              <div className="w-full flex items-center gap-6 mb-4">
                <h1 className="font-semibold text-sm text-gray-700">Address</h1>
                <p className="text-gray-600 text-xs">{report?.address}</p>
              </div>

              <div className="w-full flex items-center gap-6 mb-4">
                <h1 className="font-semibold text-sm text-gray-700">
                  Violation
                </h1>
                <p className="text-gray-600 text-xs">{report?.violation}</p>
              </div>

              <div className="w-full flex items-center gap-6 mb-4">
                <h1 className="font-semibold text-sm text-gray-700">Fine</h1>
                <p className="text-lg text-red-500 font text-xs-bold">
                  RS. {report?.fine}
                </p>
              </div>

              <div className="mt-2 flex flex-col text-xs">
                <h1>Kandy Poince Station</h1>
                <h1>ploceKandy@gmail.com</h1>
                <h1>071 4578490</h1>
              </div>
            </div>
          </div>
          <div className="py-2">
            <form onSubmit={sendEmailViaReportHandler}>
              <div className="grid grid-cols-4 gap-2">
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserEmail(e.target.value)
                  }
                  className="p-2 col-span-3 text-sm w-full rounded-sm border border-gray-200"
                  placeholder="Enter user email"
                  required
                />
                {!isSubmitting ? (
                  <button
                    type="button"
                    className="text-white flex items-center justify-center gap-2 text-xs col-span-1 bg-blue-500 rounded-sm p-2"
                    disabled
                  >
                    <ImSpinner6 className="animate-spin" /> Please wait...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="text-white text-xs col-span-1 bg-blue-500 rounded-sm p-2 hover:bg-blue-600 transition-colors"
                  >
                    Send Report
                  </button>
                )}
              </div>
            </form>

            {/* Status message display */}
            {sendStatus.message && (
              <div
                className={`mt-2 text-sm p-2 rounded-sm ${
                  sendStatus.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {sendStatus.message}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateReport;
