import { FiFileText } from "react-icons/fi";
import ViolationTable from "../components/ViolationTable";

const ViolationPage = () => {
  return (
    <div className="w-full p-4">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FiFileText className="text-blue-600" />
          Traffic Violations
        </h1>
        <p className="text-gray-600 mt-2">
          View and manage all traffic violations
        </p>
      </div>
      <ViolationTable />
    </div>
  );
};

export default ViolationPage;
