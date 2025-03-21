import ViolationTable from "../components/ViolationTable";

const ViolationPage = () => {
  return (
    <div className="w-full px-8">
      <h1 className="text-lg font-semibold mb-6">List Violations</h1>
      <ViolationTable />
    </div>
  );
};

export default ViolationPage;
