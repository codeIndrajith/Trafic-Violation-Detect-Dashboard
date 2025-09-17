import ViolationTable from "../components/ViolationTable";

const ViolationPage = () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-lg font-semibold mb-6">List Violations</h1>
      <ViolationTable />
    </div>
  );
};

export default ViolationPage;
