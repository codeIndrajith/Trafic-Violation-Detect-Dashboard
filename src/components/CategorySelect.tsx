import { BiSolidMobileVibration, BiSolidReport } from "react-icons/bi";
import { BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { MdDashboardCustomize } from "react-icons/md";
import { SiPaypal } from "react-icons/si";
import Logo from "../images/Frame.png";
import { useState } from "react";
import { RiCloseLargeLine, RiMenu3Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link, useLocation } from "react-router-dom";

const CategorySelect = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const location = useLocation();

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      {/* Left side section */}
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

            {/* <div
              className={`flex gap-8 items-center p-2 transition ${
                location?.pathname === "/payments" &&
                "text-blue-300  rounded-r-2xl"
              }`}
            >
              <SiPaypal className="text-md" />{" "}
              <Link
                to="/payments"
                className="text-md cursor-pointer hover:text-red-500"
              >
                Payment
              </Link>
            </div> */}
          </div>
        </div>
      </section>

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div className="md:hidden fixed px-6 py-8 inset-0 bg-gray-200 z-50 overflow-auto">
          <div className="mb-24 flex items-center justify-between">
            <img src={Logo} className="w-20 h-20" alt="logo_image" />
            <RiCloseLargeLine
              className="text-4xl md:hidden mr-4"
              onClick={toggleSidebar}
            />
          </div>
          <div className="mt-24 ml-4 grid gap-8 items-center justify-center">
            <div className="flex gap-8 items-center">
              <MdDashboardCustomize className="text-lg" />{" "}
              <span className="text-lg">Dashboard</span>
            </div>

            <div className="flex gap-8 items-center">
              <BsFillFileEarmarkRuledFill className="text-lg" />{" "}
              <span className="text-lg">Rules</span>
            </div>

            <div className="flex gap-8 items-center">
              <BiSolidMobileVibration className="text-lg" />{" "}
              <span className="text-lg">Violations</span>
            </div>

            <div className="flex gap-8 items-center">
              <BiSolidReport className="text-lg" />{" "}
              <span className="text-lg">Reports</span>
            </div>

            <div className="flex gap-8 items-center">
              <SiPaypal className="text-lg" />{" "}
              <span className="text-lg">Payment</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategorySelect;
