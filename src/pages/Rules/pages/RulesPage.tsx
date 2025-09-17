import { FiFileText } from "react-icons/fi";
import RuleCard from "../components/RuleCard";

const RulesPage = () => {
  return (
    <div className="w-full p-4">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FiFileText className="text-blue-600" />
          Traffic Violation Rules
        </h1>
        <p className="text-gray-600 mt-2">View all traffic violation Rules</p>
      </div>
      <RuleCard />
    </div>
  );
};

export default RulesPage;
