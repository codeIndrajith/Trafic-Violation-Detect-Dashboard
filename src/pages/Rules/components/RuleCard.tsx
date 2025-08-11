const RuleCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {/* Double Line Cutting */}
      <div className="flex flex-col items-start gap-2 w-full h-auto border p-4">
        <h1 className="text-lg font-semibold">Double Line Crossing</h1>
        <p className="text-sm text-justify">
          Crossing over a continuous double line is a serious traffic offense,
          as it indicates a no-overtaking zone for driver safety. This act can
          lead to head-on collisions and is prohibited in all road conditions.
        </p>
        <h2 className="text-md font-semibold">Rs 5,000.00</h2>
      </div>

      {/* Illegal U-Turn */}
      <div className="flex flex-col items-start gap-2 w-full border p-4">
        <h1 className="text-lg font-semibold">Illegal U-Turn</h1>
        <p className="text-sm text-justify">
          Performing a U-turn in a prohibited area, such as near junctions or
          pedestrian crossings, can disrupt traffic flow and create dangerous
          situations for other road users. Always follow road signs and
          markings.
        </p>
        <h2 className="text-md font-semibold">Rs 3,500.00</h2>
      </div>
    </div>
  );
};

export default RuleCard;
