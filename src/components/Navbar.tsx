import { AiOutlineMail } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import { clearCredentials } from "../slices/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import { RiMenu3Fill } from "react-icons/ri";
import Logo from "../images/Frame.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pageNavigation, setPageNavigation] = useState<number>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const handleSignIn = (): void => {
    navigate("/sign-in");
  };

  const handleSignUp = (): void => {
    navigate("/sign-up");
  };

  const handleProfile = (): void => {
    navigate("/profile");
  };

  const handleEmails = (): void => {
    navigate("/emails");
  };

  const handleNotification = (): void => {
    navigate("/notifications");
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      dispatch(clearCredentials());
      navigate("/", { replace: true });
    } catch (error: any) {
      toast.error("Error occcured during logout", {
        className: "text-xs",
      });
    }
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <section className="hidden md:block absolute md:relative h-[10%] w-full">
        <div className="grid grid-cols-1 md:grid-cols-8 items-start justify-between px-8 py-6">
          <div className="md:mb-2 col-span-1 flex items-center justify-between">
            <img className="w-14 h-14" src={Logo} alt="logo" />
            <RiMenu3Fill
              className="text-4xl md:hidden mr-4 cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>
          <div className="col-span-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-[12px] text-[#131313]">
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="col-span-1 flex items-end justify-end gap-8">
            <div className="flex items-center gap-4">
              {/* <AiOutlineMail
                onClick={handleEmails}
                className="text-lg cursor-pointer"
              /> */}
              {/* <BsBell
                onClick={handleNotification}
                className="text-lg cursor-pointer"
              /> */}
            </div>

            {userInfo ? (
              <div>
                <div className="flex items-center gap-2">
                  <div>
                    <h1>Sign out</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdKeyboardArrowDown
                      onClick={() => setIsModalOpen(!isModalOpen)}
                      className={`text-xl cursor-pointer hover:text-blue-400 transition-transform duration-100 ${
                        isModalOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                </div>

                {isModalOpen && (
                  <div className="absolute right-8 mt-2 w-52 bg-gray-100 shadow-xl rounded-md p-4">
                    <ul className="flex flex-col items-start">
                      {/* <button
                        onClick={handleProfile}
                        className="p-2 w-full text-start text-sm hover:bg-gray-200 rounded-md cursor-pointer"
                      >
                        Profile
                      </button> */}
                      <button
                        onClick={handleLogOut}
                        className="p-2 w-full text-start text-sm hover:bg-gray-200 rounded-md cursor-pointer"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSignIn}
                  className="border rounded-sm px-6 py-2 text-sm hover:bg-blue-400 hover:text-white"
                  type="button"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="border rounded-sm px-6 py-2 text-sm hover:bg-blue-400 hover:text-white"
                  type="button"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
