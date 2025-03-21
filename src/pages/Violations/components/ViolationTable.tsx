const ViolationTable = () => {
  return (
    <div className="h-[350px] overflow-y-auto">
      <table className="w-full border-collapse" aria-hidden="true">
        <thead className="text-md bg-gray-100 sticky top-0 z-10">
          <td>Vehicle Number</td>
          <td>Ticket ID</td>
          <td>Count Violation</td>
          <td>Violation</td>
          <td>Action</td>
        </thead>
        <tbody className="text-xs">
          <tr>
            <td className="p-2">NA-12</td>
            <td className="p-2">23</td>
            <td className="p-2">2</td>
            <td className="p-2">Single Line Cutting</td>
            <td className="p-2">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViolationTable;
