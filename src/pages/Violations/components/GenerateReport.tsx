import { MdReportProblem } from "react-icons/md";

const GenerateReport = () => {
  return (
    <div className="w-full border rounded-sm p-4 min-h-[500px]">
      <div className="flex items-center gap-2 mb-8">
        <MdReportProblem className="text-red-500" />
        <h1 className="text-lg text-red-600">Violation Report</h1>
      </div>

      <div className="w-full px-2">
        <div className="w-full flex items-center gap-6 mb-4">
          <h1 className="font-semibold text-lg text-gray-700">ID</h1>
          <p className="text-gray-600">V1HTSX</p>
        </div>

        <div className="w-full flex items-center gap-6 mb-4">
          <h1 className="font-semibold text-lg text-gray-700">
            Vehicle Number
          </h1>
          <p className="text-gray-600">NA - 2345</p>
        </div>

        <div className="w-full flex items-center gap-6 mb-4">
          <h1 className="font-semibold text-lg text-gray-700">Time & Date</h1>
          <p className="text-gray-600">11.45AM | 2024-05-12</p>
        </div>

        <div className="w-full flex items-center gap-6 mb-4">
          <h1 className="font-semibold text-lg text-gray-700">Email</h1>
          <p className="text-gray-600">Indrajith@test.com</p>
        </div>

        <div className="w-full flex items-center gap-6 mb-4">
          <h1 className="font-semibold text-lg text-gray-700">Address</h1>
          <p className="text-gray-600">123, Kandy road, Kagalle</p>
        </div>

        <div className="w-full flex items-center gap-6 mb-4">
          <h1 className="font-semibold text-lg text-gray-700">Violation</h1>
          <p className="text-gray-600">Illegal Parking</p>
        </div>

        <div className="w-full flex items-center gap-6 mb-4">
          <h1 className="font-semibold text-lg text-gray-700">Fine</h1>
          <p className="text-2xl font-bold">RS. 34500.00</p>
        </div>

        <div className="mt-14 flex flex-col text-xs">
          <h1>Kandy Poince Station</h1>
          <h1>ploceKandy@gmail.com</h1>
          <h1>071 4578490</h1>
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
