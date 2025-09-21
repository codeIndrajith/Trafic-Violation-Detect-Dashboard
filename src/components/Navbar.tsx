import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { clearCredentials } from "../slices/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import { MdDashboardCustomize, MdOutlineClose } from "react-icons/md";
import { RiLogoutBoxRLine, RiUser3Line } from "react-icons/ri";
import { BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { BiSolidMobileVibration, BiSolidReport } from "react-icons/bi";
import Logo from "../images/Frame.png";

// Define props interface
interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const Navbar = ({
  isSidebarOpen,
  toggleSidebar,
  closeSidebar,
}: NavbarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        closeSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeSidebar]);

  const handleLogOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      dispatch(clearCredentials());
      navigate("/", { replace: true });
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error("Error occurred during logout", {
        className: "text-xs",
      });
    }
  };

  const navItems = [
    {
      path: "/dashboard",
      icon: <MdDashboardCustomize className="text-lg" />,
      label: "Dashboard",
    },
    {
      path: "/trafic-rules",
      icon: <BsFillFileEarmarkRuledFill className="text-lg" />,
      label: "Rules",
    },
    {
      path: "/violations",
      icon: <BiSolidMobileVibration className="text-lg" />,
      label: "Violations",
    },
    {
      path: "/reports",
      icon: <BiSolidReport className="text-lg" />,
      label: "Reports",
    },
  ];

  const OfficernavItems = [
    {
      path: "/monitor",
      icon: <MdDashboardCustomize className="text-lg" />,
      label: "Dashboard",
    },
  ];

  const CustomernavItems = [
    {
      path: "/checkout",
      icon: <MdDashboardCustomize className="text-lg" />,
      label: "Dashboard",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:static md:transform-none md:shadow-none md:w-1/5 lg:w-64 md:z-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full pt-4 md:pt-6">
          {/* Mobile header */}
          <div className="flex items-center justify-between px-4 mb-6 md:hidden">
            <img className="w-10 h-10" src={Logo} alt="logo" />
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <MdOutlineClose className="text-xl" />
            </button>
          </div>

          <div className="px-4 mb-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Menu
            </h2>
          </div>
          {userInfo?.role === "Admin" ? (
            <nav className="flex-1 px-2 bg-gray-200 md:mt-2.5 pt-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`${
                      location.pathname === item.path
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
          ) : userInfo?.role === "User" ? (
            <nav className="flex-1 px-2 bg-gray-200 md:mt-2.5 pt-8">
              {OfficernavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`${
                      location.pathname === item.path
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
          ) : (
            <nav className="flex-1 px-2 bg-gray-200 md:mt-2.5 pt-8">
              {CustomernavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`${
                      location.pathname === item.path
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* Mobile user section */}
          {userInfo && isMobile && (
            <div className="p-4 border-t border-gray-200 bg-gray-200 pt-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <RiUser3Line className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {userInfo.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userInfo?.role === "User"
                      ? "Officer"
                      : userInfo?.role === "Customer"
                      ? "Customer"
                      : "Admin"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogOut}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <RiLogoutBoxRLine className="text-gray-500" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
