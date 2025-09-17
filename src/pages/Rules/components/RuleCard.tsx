import { FaTentArrowLeftRight } from "react-icons/fa6";
import { FiXCircle } from "react-icons/fi";

const RuleCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Double Line Cutting */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <FiXCircle className="text-xl text-red-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Double Line Crossing
            </h1>
            <div className="mt-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium inline-block">
              Fine: Rs 5,000.00
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Crossing over a continuous double line is a serious traffic offense,
          as it indicates a no-overtaking zone for driver safety. This act can
          lead to head-on collisions and is prohibited in all road conditions.
        </p>
      </div>

      {/* Illegal U-Turn */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-orange-100 rounded-lg">
            <FaTentArrowLeftRight className="text-xl text-orange-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Illegal U-Turn
            </h1>
            <div className="mt-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium inline-block">
              Fine: Rs 3,500.00
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Performing a U-turn in a prohibited area, such as near junctions or
          pedestrian crossings, can disrupt traffic flow and create dangerous
          situations for other road users. Always follow road signs and
          markings.
        </p>
      </div>
    </div>
  );
};

export default RuleCard;
