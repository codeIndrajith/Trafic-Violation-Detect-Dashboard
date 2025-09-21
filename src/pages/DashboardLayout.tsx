import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { RiLogoutBoxRLine, RiMenu3Fill, RiUser3Line } from "react-icons/ri";
import { MdKeyboardArrowDown, MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { clearCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Logo from "../images/Frame.png";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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

  const handleSignIn = (): void => {
    navigate("/sign-in");
  };

  const handleSignUp = (): void => {
    navigate("/sign-up");
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <div className="flex items-center">
              <img
                className="w-10 h-10 md:w-12 md:h-12"
                src={Logo}
                alt="logo"
              />
              <div className="ml-4">
                <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-xs text-gray-500">
                  {new Date().toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {userInfo ? (
                <div className="relative">
                  <button
                    onClick={() => setIsModalOpen(!isModalOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <RiUser3Line className="text-blue-600" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="hidden md:block text-sm font-medium text-gray-700">
                        {userInfo.email}
                      </span>

                      <small className="text-gray-500 text-[10px]">
                        {" "}
                        {userInfo?.role === "User"
                          ? "Officer"
                          : userInfo?.role === "Customer"
                          ? "Customer"
                          : "Admin"}
                      </small>
                    </div>
                    <MdKeyboardArrowDown
                      className={`text-xl transition-transform mb-3 ${
                        isModalOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isModalOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setIsModalOpen(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-48 bg-red-500 rounded-md shadow-lg border border-gray-100 py-2 z-40">
                        <button
                          onClick={handleLogOut}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700"
                        >
                          <RiLogoutBoxRLine className="text-white" />
                          <span className="text-white">Logout</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSignIn}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    type="button"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    type="button"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
              >
                {isSidebarOpen ? (
                  <MdOutlineClose className="text-xl" />
                ) : (
                  <RiMenu3Fill className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
