import { Link, useNavigate } from "react-router-dom";
import signup from "../../images/signup.svg";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../config/firebase";
import { ImSpinner9 } from "react-icons/im";
import { setCredentials } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  FaLock,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaUserTag,
  FaTrafficLight,
  FaShieldAlt,
} from "react-icons/fa";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

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
      const snapshot = await getDocs(collection(database, "users"));
      const adminExists = snapshot.docs.some(
        (doc) => doc.data().role === "Admin"
      );
      const userExists = snapshot.docs.some(
        (doc) => doc.data().role === "User"
      );

      if (formData.role === "Admin" && adminExists) {
        toast.error("Admin already exists", { className: "text-xs" });
        return;
      }

      if (formData.role === "User" && userExists) {
        toast.error("Officer already exists", { className: "text-xs" });
        return;
      }

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
        if (formData.role === "Customer") {
          navigate("/checkout");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-lime-700 to-sky-600 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-md overflow-hidden shadow-2xl">
        {/* Left side - Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 to-indigo-800 items-center justify-center p-8">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg">
                <FaTrafficLight className="text-3xl text-white" />
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg">
                <FaShieldAlt className="text-3xl text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-6">Traffic Monitor</h1>
            <p className="text-xl mb-8 opacity-90">
              Violation Detection Dashboard
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
              <img
                src={signup}
                alt="Sign up illustration"
                className="w-full h-64 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 bg-white/95 backdrop-blur-sm p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
              <FaLock className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600 mt-2">
              Join our traffic monitoring system
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaIdCard className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="first-name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="First Name"
                  onChange={handleChange}
                  name="firstName"
                  value={formData.firstName}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaIdCard className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="last-name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Last Name"
                  onChange={handleChange}
                  name="lastName"
                  value={formData.lastName}
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                  required
                />
              </div>

              {/* Role */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUserTag className="text-gray-400" />
                </div>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none"
                >
                  <option value="" disabled hidden>
                    Select Role
                  </option>
                  <option value="Admin">Admin</option>
                  <option value="User">Violation Inspector</option>
                  <option value="Customer">User</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Contact Number */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="number"
                  id="contactNumber"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Contact Number"
                  onChange={handleChange}
                  name="contactNumber"
                  value={formData.contactNumber}
                  required
                  min={1}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <ImSpinner9 className="animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
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
