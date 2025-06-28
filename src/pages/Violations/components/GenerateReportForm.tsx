import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { Violation } from "../../../interface/violationInterface";
import { useParams } from "react-router-dom";
import { db, firestore } from "../../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, update } from "firebase/database";
import { toast } from "react-toastify";

interface ReportGenerateData {
  vehicleNumber?: string;
  violation?: string;
  detectDateTime?: string;
  email: string;
  address: string;
  phone: string;
  fine: string;
}

interface GenerateReportFormParams {
  data: Violation;
}

const GenerateReportForm: React.FC<GenerateReportFormParams> = (data) => {
  const params = useParams();
  const id = params.id;
  const [formData, setFormData] = useState<ReportGenerateData>({
    vehicleNumber: data?.data?.number_plate,
    violation: data?.data?.violation,
    detectDateTime: data?.data?.dateTime,
    email: "",
    address: "",
    phone: "",
    fine: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          console.log("Error occured find doc", error);
        }
      }

      if (!found) {
        throw new Error("Violation ID not found in any section.");
      }

      toast.success("Report successfully generated!");
      setFormData({ email: "", address: "", phone: "", fine: "" });
      window.location.reload();
    } catch (err: any) {
      console.error("Error generating report:", err);
      toast.error("Failed to generate report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full min-h-[500px] mt-4">
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-12">
          <h1>Vehicle Number</h1>
          <span>{data?.data.number_plate}</span>
        </div>
        <div className="flex items-center gap-12">
          <h1>Violations</h1>
          <span>{data?.data.violation}</span>
        </div>
        <div className="flex items-center gap-12">
          <h1>Detect Date | Time</h1>
          <span>
            {data?.data?.dateTime &&
              new Date(data.data.dateTime).toLocaleString()}
          </span>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-14 flex flex-col gap-4"
      >
        <div className="w-full flex items-center gap-4 px-2">
          <label htmlFor="email" className="text-sm w-24">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border text-sm border-gray-200 w-full p-2 rounded-sm"
            placeholder="Email"
          />
        </div>

        <div className="w-full flex items-center gap-4 px-2">
          <label htmlFor="address" className="text-sm w-24">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="border text-sm border-gray-200 w-full p-2 rounded-sm"
            placeholder="Address"
          />
        </div>

        <div className="w-full flex items-center gap-4 px-2">
          <label htmlFor="phone" className="text-sm w-24">
            Phone
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="border text-sm border-gray-200 w-full p-2 rounded-sm"
            placeholder="Phone Number"
          />
        </div>

        <div className="w-full flex items-center gap-4 px-2">
          <label htmlFor="fine" className="text-sm w-24">
            Fine
          </label>
          <input
            type="text"
            id="fine"
            name="fine"
            required
            value={formData.fine}
            onChange={handleChange}
            className="border text-sm border-gray-200 w-full p-2 rounded-sm"
            placeholder="Fine"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-4 text-xs">
              <ImSpinner9 className="animate-spin" /> <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4 text-xs">
              Generate Report
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default GenerateReportForm;
