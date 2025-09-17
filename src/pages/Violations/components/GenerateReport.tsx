import { useEffect, useState } from "react";
import { ReportData } from "../../../interface/violationInterface";
import { firestore } from "../../../config/firebase";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import {
  FiFileText,
  FiTruck,
  FiCalendar,
  FiMail,
  FiMapPin,
  FiAlertTriangle,
  FiDollarSign,
  FiSend,
  FiLoader,
  FiCheckCircle,
  FiXCircle,
  FiPrinter,
  FiDownload,
} from "react-icons/fi";

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
  const [userEmail, setUserEmail] = useState<string>("");

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

  const generatePaymentUrl = (reportId: string, amount: string) => {
    return `${
      import.meta.env.VITE_ORIGIN_URL
    }/payments?report_id=${reportId}&amount=${amount}`;
  };

  const sendEmailViaReportHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!report || !id) return;
    setIsSubmitting(true);
    setSendStatus({});

    try {
      const paymentUrl = generatePaymentUrl(id, report.fine);

      const templateParams = {
        to_email: userEmail,
        vehicleNumber: report.vehicleNumber,
        violation: report.violation,
        fine: report.fine,
        address: report.address,
        payment_url: paymentUrl,
        report_id: id,
      };

      const serviceId = import.meta.env.VITE_SERVICE_ID;
      const templateId = import.meta.env.VITE_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_PUBLIC_KEY;

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setUserEmail("");
      setSendStatus({
        success: true,
        message: "Report sent successfully to the provided email!",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSendStatus({
        success: false,
        message: "Failed to send report. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: any) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-xl">
            <FiFileText className="text-2xl text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Violation Report
            </h1>
            <p className="text-gray-600">
              Detailed traffic violation information
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        // Modern Skeleton Loader
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="h-6 bg-gray-200 rounded w-48"></div>
          </div>

          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ) : report ? (
        <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          {/* Report Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <FiFileText className="text-2xl" />
              <h2 className="text-xl font-semibold">
                Official Violation Report
              </h2>
            </div>
            <p className="text-blue-100">
              Police Station • {formatDate(report.createdAt)}
            </p>
          </div>

          {/* Report Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                  Report Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FiTruck className="text-blue-600" />
                    <div>
                      <p className="text-xs text-blue-700">Vehicle Number</p>
                      <p className="font-medium text-gray-900">
                        {report.vehicleNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FiCalendar className="text-blue-600" />
                    <div>
                      <p className="text-xs text-blue-700">
                        Violation Date & Time
                      </p>
                      <p className="font-medium text-gray-900">
                        {formatDate(report.detectDateTime)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-red-800 mb-2">
                  Violation Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FiAlertTriangle className="text-red-600" />
                    <div>
                      <p className="text-xs text-red-700">Violation Type</p>
                      <p className="font-medium text-gray-900">
                        {report.violation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FiDollarSign className="text-red-600" />
                    <div>
                      <p className="text-xs text-red-700">Fine Amount</p>
                      <p className="font-medium text-red-600">
                        Rs. {report.fine}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiMail className="text-gray-600" />
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{report.email}</p>
                  <p className="text-sm text-gray-600">{report.phone}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiMapPin className="text-gray-600" />
                  Address
                </h3>
                <p className="text-sm text-gray-600">{report.address}</p>
              </div>
            </div>

            {/* Station Information */}
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Kandy Police Station
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>ploceKandy@gmail.com</div>
                <div>071 4578490</div>
                <div>Kandy, Sri Lanka</div>
              </div>
            </div>
          </div>

          {/* Email Form */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiSend className="text-blue-600" />
              Send Report via Email
            </h3>

            <form onSubmit={sendEmailViaReportHandler} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Recipient Email Address
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    id="email"
                    value={userEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUserEmail(e.target.value)
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter recipient's email address"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend />
                        Send
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Status Message */}
              {sendStatus.message && (
                <div
                  className={`p-3 rounded-lg flex items-center gap-3 ${
                    sendStatus.success
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {sendStatus.success ? (
                    <FiCheckCircle className="text-lg" />
                  ) : (
                    <FiXCircle className="text-lg" />
                  )}
                  <span>{sendStatus.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      ) : (
        // No Report Found
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="bg-gray-100 p-4 rounded-full inline-flex mb-4">
            <FiFileText className="text-2xl text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Report Not Found
          </h3>
          <p className="text-gray-600">
            The requested violation report could not be found.
          </p>
        </div>
      )}
    </div>
  );
};

export default GenerateReport;
