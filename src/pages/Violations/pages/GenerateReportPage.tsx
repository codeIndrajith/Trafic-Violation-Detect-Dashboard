import GenerateReportForm from "../components/GenerateReportForm";
import GenerateReport from "../components/GenerateReport";

const GenerateReportPage = () => {
  return (
    <div className="w-full px-8">
      <h1 className="text-xl font-semibold">Generate Report For Violations</h1>

      <div className="flex flex-col lg:flex-row items-center gap-2 w-full">
        <GenerateReportForm />
        <GenerateReport />
      </div>
    </div>
  );
};

export default GenerateReportPage;
