import { Link, useNavigate } from "react-router-dom";
import signup from "../../images/signup.svg";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database, db } from "../../config/firebase";
import { ImSpinner9 } from "react-icons/im";
import { setCredentials } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import authImage from "../../assets/authImage.jpg";
import { FaUser } from "react-icons/fa";
import { doc, setDoc } from "firebase/firestore";

interface UserSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  contactNumber: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<UserSignUp>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    contactNumber: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (res) {
        await setDoc(doc(database, "users", res.user.uid), {
          email: formData.email,
          role: formData.role,
          createdAt: new Date(),
        });
        const { password, ...filteredData } = formData;
        dispatch(setCredentials(filteredData));
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
          contactNumber: "",
        });
        toast.success("Sign Up Complete", { className: "text-xs" });
        if (formData.role === "Admin") {
          navigate("/dashboard");
        }
        if (formData.role === "User") {
          navigate("/monitor");
        }
      }
    } catch (error: any) {
      toast.error(error?.message, {
        className: "text-xs",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{ backgroundImage: `url(${authImage})` }}
    >
      <div className="flex flex-col xl:flex-row items-center justify-center gap-4">
        <div className="w-full bg-white px-10 py-6 rounded-md">
          <h2 className="py-2">Welcome To Traffic Violation Detection </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="relative w-full">
                <input
                  type="text"
                  id="first-name"
                  className="peer w-full border rounded-sm border-gray-200 p-4 text-sm focus:outline-none focus:border-green-500 invalid:border-red-500"
                  placeholder=" "
                  onChange={handleChange}
                  name="firstName"
                  value={formData.firstName}
                  required
                />
                <label
                  htmlFor="first-name"
                  className="absolute left-4 top-[3px] text-xs text-green-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-[3px] peer-focus:text-xs peer-focus:text-green-500"
                >
                  First Name
                </label>
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="last-name"
                  className="peer w-full border rounded-sm border-gray-200 p-4 text-sm focus:outline-none focus:border-green-500 invalid:border-red-500"
                  placeholder=" "
                  onChange={handleChange}
                  name="lastName"
                  value={formData.lastName}
                  required
                />
                <label
                  htmlFor="last-name"
                  className="absolute left-4 top-[3px] text-xs text-green-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-[3px] peer-focus:text-xs peer-focus:text-green-500"
                >
                  Last Name
                </label>
              </div>

              <div className="relative w-full">
                <input
                  type="email"
                  id="email"
                  className="peer w-full border rounded-sm border-gray-200 p-4 text-sm focus:outline-none focus:border-green-500 invalid:border-red-500"
                  placeholder=" "
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-[3px] text-xs text-green-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-[3px] peer-focus:text-xs peer-focus:text-green-500"
                >
                  Email
                </label>
              </div>

              <div className="relative w-full">
                <input
                  type="password"
                  id="password"
                  className="peer w-full border rounded-sm border-gray-200 p-4 text-sm focus:outline-none focus:border-green-500 invalid:border-red-500"
                  placeholder=" "
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-[3px] text-xs text-green-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-[3px] peer-focus:text-xs peer-focus:text-green-500"
                >
                  Password
                </label>
              </div>

              <div className="relative w-full">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="peer w-full border rounded-sm border-gray-200 p-4 text-sm bg-white focus:outline-none focus:border-green-500 invalid:border-red-500 appearance-none"
                >
                  <option value="" disabled hidden>
                    Select a role
                  </option>
                  <option value="Admin">Admin</option>
                </select>

                {/* Dropdown icon */}
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <label
                  htmlFor="role"
                  className="absolute left-4 top-[3px] text-xs text-green-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-[3px] peer-focus:text-xs peer-focus:text-green-500"
                >
                  Role
                </label>
              </div>

              <div className="relative w-full">
                <input
                  type="number"
                  id="contactNumber"
                  className="peer w-full border rounded-sm border-gray-200 p-4 text-sm focus:outline-none focus:border-green-500 invalid:border-red-500"
                  placeholder=" "
                  onChange={handleChange}
                  name="contactNumber"
                  value={formData.contactNumber}
                  required
                  min={1}
                />
                <label
                  htmlFor="contactNumber"
                  className="absolute left-4 top-[3px] text-xs text-green-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-[3px] peer-focus:text-xs peer-focus:text-green-500"
                >
                  Contact Number
                </label>
              </div>
            </div>

            <div className="relative w-full">
              <button
                className="bg-blue-400 text-white p-2 w-full text-center text-sm"
                type="submit"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-4 text-xs">
                    <ImSpinner9 className="animate-spin" />{" "}
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-4 text-xs">
                    Sign Up
                  </div>
                )}
              </button>
            </div>
            <div className="relative flex items-center justify-center gap-4 w-full">
              <div className="text-xs">Already have an account ?</div>
              <Link className="text-xs text-gray-500" to="/sign-in">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
