import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

interface ReportCardProps {
  vehicleNumber: string;
  email: string;
  violation: string;
  fine: string;
  paid: boolean;
}

const ReportCard = ({
  vehicleNumber,
  email,
  violation,
  fine,
  paid,
}: ReportCardProps) => {
  return (
    <div className="border rounded-lg flex gap-2 items-center justify-between w-full p-4 hover:shadow-md transition-shadow">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Vehicle Number</h2>
          <p className="text-xs">{vehicleNumber}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <h2 className="text-sm font-semibold">Email</h2>
          <p className="text-xs">{email}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <h2 className="text-sm font-semibold">Violation</h2>
          <p className="text-xs">{violation}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <h2 className="text-sm font-semibold">Fine</h2>
          <p className="text-lg text-red-500">{fine}</p>
        </div>
      </div>

      <div className="self-start">
        {paid ? (
          <AiOutlineCheckCircle className="text-green-500 text-xl" />
        ) : (
          <AiOutlineCloseCircle className="text-red-500 text-xl" />
        )}
      </div>
    </div>
  );
};

export default ReportCard;
