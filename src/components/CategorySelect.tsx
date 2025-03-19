import { BiSolidMobileVibration, BiSolidReport } from "react-icons/bi";
import { BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { MdDashboardCustomize } from "react-icons/md";
import { SiPaypal } from "react-icons/si";
import Logo from "../images/Frame.png";
import { useState } from "react";
import { RiCloseLargeLine, RiMenu3Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";

const CategorySelect = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      {/* Left side section */}
      <section className="absolute md:relative z-10 px-6 py-8 h-screen w-full md:w-[35%] lg:w-1/5">
        <div className="md:mb-24 flex items-center justify-between">
          <img className="w-20 h-20" src={Logo} alt="logo" />
          <RiMenu3Fill
            className="text-4xl md:hidden mr-4 cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
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
          <h1 className="text-md text-center md:text-start text-gray-400 mb-14 px-2">
            Category
          </h1>
          <div className="flex flex-col gap-12 md:gap-8 px-2 w-full">
            <div className="flex gap-8 items-center cursor-pointer hover:text-blue-400 transition">
              <MdDashboardCustomize className="text-lg" />{" "}
              <Link to="/dashboard" className="text-lg">
                Dashboard
              </Link>
            </div>

            <div className="flex gap-8 items-center cursor-pointer hover:text-blue-400 transition">
              <BsFillFileEarmarkRuledFill className="text-lg" />{" "}
              <Link to="/trafic-rules" className="text-lg">
                Rules
              </Link>
            </div>

            <div className="flex gap-8 items-center cursor-pointer hover:text-blue-400 transition">
              <BiSolidMobileVibration className="text-lg" />{" "}
              <Link to="/violations" className="text-lg">
                Violations
              </Link>
            </div>

            <div className="flex gap-8 items-center cursor-pointer hover:text-blue-400 transition">
              <BiSolidReport className="text-lg" />{" "}
              <Link to="/reports" className="text-lg">
                Reports
              </Link>
            </div>

            <div className="flex gap-8 items-center cursor-pointer hover:text-blue-400 transition">
              <SiPaypal className="text-lg" />{" "}
              <Link to="/payments" className="text-lg">
                Payment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div className="md:hidden fixed px-6 py-8 inset-0 bg-gray-200 z-50 overflow-auto">
          <div className="mb-24 flex items-center justify-between">
            <img src={Logo} className="w-20 h-20" alt="logo_image" />
            <RiCloseLargeLine
              className="text-4xl md:hidden mr-4 cursor-pointer"
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
