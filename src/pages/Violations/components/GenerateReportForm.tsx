import { useState } from "react";
import { Violation } from "../../../interface/violationInterface";
import { useParams } from "react-router-dom";
import { db, firestore } from "../../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, update } from "firebase/database";
import { toast } from "react-toastify";
import {
  FiMail,
  FiHome,
  FiPhone,
  FiDollarSign,
  FiTruck,
  FiAlertCircle,
  FiCalendar,
  FiSend,
  FiLoader,
} from "react-icons/fi";

export interface ReportGenerateData {
  vehicleNumber?: string;
  violation?: string;
  detectDateTime?: string;
  email: string;
  address: string;
  phone: string;
  fine: string;
  isPaid?: boolean;
}

interface GenerateReportFormParams {
  data: Violation;
}

const GenerateReportForm: React.FC<GenerateReportFormParams> = ({ data }) => {
  const params = useParams();
  const id = params.id;
  const [formData, setFormData] = useState<ReportGenerateData>({
    vehicleNumber: data?.number_plate,
    violation: data?.violation,
    detectDateTime: data?.dateTime,
    email: "",
    address: "",
    phone: "",
    fine: "",
    isPaid: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!id) throw new Error("Missing violation ID");

      // 1. Save the report data to Firestore
      await setDoc(doc(firestore, "reports", id), {
        ...formData,
        violationId: id,
        createdAt: new Date().toISOString(),
      });

      // 2. Update Realtime Database violation record
      const sections = ["u-turn-violations", "double-line-cut-violations"];
      let found = false;

      for (const section of sections) {
        const pathRef = ref(db, `${section}/${id}`);
        try {
          await update(pathRef, { reportGen: true });
          found = true;
          break;
        } catch (error: any) {
          console.log("Error occurred finding doc", error);
        }
      }

      if (!found) {
        throw new Error("Violation ID not found in any section.");
      }

      toast.success("Report successfully generated!");
      window.location.reload();
    } catch (err: any) {
      console.error("Error generating report:", err);
      toast.error("Failed to generate report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Violation Summary */}
      <div className="bg-blue-200 p-4 px-8 mb-8 border border-blue-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiAlertCircle className="text-blue-600" />
          Violation Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white shadow-sm">
              <FiTruck className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Vehicle Number</p>
              <p className="font-medium text-gray-900">
                {data?.number_plate || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <FiAlertCircle className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Violation Type</p>
              <p className="font-medium text-gray-900">
                {data?.violation || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <FiCalendar className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Detected On</p>
              <p className="font-medium text-gray-900">
                {data?.dateTime
                  ? new Date(data.dateTime).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Form */}
      <div className="bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <FiSend className="text-blue-600" />
          Generate Report
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <FiMail className="text-gray-500" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter recipient's email"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                <FiPhone className="text-gray-500" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Address Field */}
          <div className="space-y-2">
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <FiHome className="text-gray-500" />
              Address
            </label>
            <textarea
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter complete address"
            />
          </div>

          {/* Fine Amount Field */}
          <div className="space-y-2">
            <label
              htmlFor="fine"
              className="text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <FiDollarSign className="text-gray-500" />
              Fine Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                Rs.
              </span>
              <input
                type="text"
                id="fine"
                name="fine"
                required
                value={formData.fine}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter fine amount"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FiSend />
                Generate Report
              </>
            )}
          </button>
        </form>
      </div>

      {/* Help Text */}
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-500">
          This will generate an official report.
        </p>
      </div>
    </div>
  );
};

export default GenerateReportForm;
