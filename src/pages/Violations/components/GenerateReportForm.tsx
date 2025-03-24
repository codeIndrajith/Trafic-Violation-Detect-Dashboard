import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";

interface ReportGenerateData {
  email: string;
  address: string;
  phone: string;
  fine: string;
}

const GenerateReportForm = () => {
  const [formData, setFormData] = useState<ReportGenerateData>({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="w-full min-h-[500px] mt-4">
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-12">
          <h1>Vehicle Number</h1>
          <span>NA-2348</span>
        </div>
        <div className="flex items-center gap-12">
          <h1>Violations</h1>
          <span>Illeagle Parking</span>
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
