import { AiOutlineMail } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import LandingPage from "./LandingPage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";
import { clearCredentials } from "../slices/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";

const Navbar = () => {
  const NavigateFunction = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const handleSignIn = (): void => {
    NavigateFunction("/sign-in");
  };

  const handleSignUp = (): void => {
    NavigateFunction("/sign-up");
  };

  const handleProfile = (): void => {
    NavigateFunction("/profile");
  };

  const handleLogOut = async (): Promise<void> => {
    try {
      const res: any = await signOut(auth);
      dispatch(clearCredentials(res));
      NavigateFunction("/sign-in");
    } catch (error: any) {
      toast.error("Error occcured during logout", {
        className: "text-xs",
      });
    }
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Right side section */}
      <section className="hidden md:block absolute md:relative h-[10%] w-full">
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6">
          <div>
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

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <AiOutlineMail className="text-lg" />
              <BsBell className="text-lg" />
            </div>

            {userInfo ? (
              <div>
                <div className="flex items-center gap-2">
                  <MdKeyboardArrowDown
                    onClick={() => setIsModalOpen(!isModalOpen)}
                    className={`text-xl border cursor-pointer hover:border-red-500 hover:text-blue-400 transition-transform duration-100 ${
                      isModalOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>

                {isModalOpen && (
                  <div className="absolute right-8 mt-2 w-52 bg-gray-100 shadow-xl rounded-md p-4">
                    <ul className="flex flex-col items-start">
                      <button
                        onClick={handleProfile}
                        className="p-2 w-full text-start text-sm hover:bg-gray-200 rounded-md cursor-pointer"
                      >
                        Profile
                      </button>
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

      <section className="w-full h-[90%] px-8 py-8">
        <LandingPage />
      </section>
    </div>
  );
};

export default Navbar;
