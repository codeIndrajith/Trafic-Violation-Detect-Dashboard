import { BiSolidMobileVibration, BiSolidReport } from "react-icons/bi";
import { BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { MdDashboardCustomize } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const CategorySelect = () => {
  const location = useLocation();

  return (
    <>
      <section className="absolute md:relative z-10 px-6 w-full md:w-[35%] lg:w-1/5">
        <div className="md:hidden mt-4">
          <h1 className="text-xl font-bold ml-4 pt-4">Dashboard</h1>
          <p className="text-[14px] text-[#131313] ml-4">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="hidden md:block">
          <h1 className="text-md text-center md:text-start text-gray-400 mb-4 px-2">
            Category
          </h1>
          <div className="flex flex-col ap-4 w-full">
            <div
              className={`flex gap-8 items-center p-2 transition ${
                location?.pathname === "/dashboard" &&
                "text-blue-300 rounded-r-2xl"
              }`}
            >
              <MdDashboardCustomize className="text-md" />{" "}
              <Link
                to="/dashboard"
                className="text-md cursor-pointer hover:text-red-500"
              >
                Dashboard
              </Link>
            </div>

            <div
              className={`flex gap-8 items-center p-2 transition ${
                location?.pathname === "/trafic-rules" &&
                "text-blue-300  rounded-r-2xl"
              }`}
            >
              <BsFillFileEarmarkRuledFill className="text-md" />{" "}
              <Link
                to="/trafic-rules"
                className="text-md cursor-pointer hover:text-red-500"
              >
                Rules
              </Link>
            </div>

            <div
              className={`flex gap-8 items-center p-2 transition ${
                location?.pathname === "/violations" &&
                "text-blue-300  rounded-r-2xl"
              }`}
            >
              <BiSolidMobileVibration className="text-md" />{" "}
              <Link
                to="/violations"
                className="text-md cursor-pointer hover:text-red-500"
              >
                Violations
              </Link>
            </div>

            <div
              className={`flex gap-8 items-center p-2 transition ${
                location?.pathname === "/reports" &&
                "text-blue-300  rounded-r-2xl"
              }`}
            >
              <BiSolidReport className="text-md" />{" "}
              <Link
                to="/reports"
                className="text-md cursor-pointer hover:text-red-500"
              >
                Reports
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategorySelect;
