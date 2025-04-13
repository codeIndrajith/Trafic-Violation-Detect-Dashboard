import ReportCard from "../components/ReportCard";

const ReportPage = () => {
  return (
    <div className="w-full min-h-screen overflow-y-auto p-4 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ReportCard
          vehicleNumber="NA-2345"
          email="indra@test.com"
          violation="illeagle U- turn"
          fine="Rs.3450.00"
          paid={true}
        />
      </div>
    </div>
  );
};

export default ReportPage;
