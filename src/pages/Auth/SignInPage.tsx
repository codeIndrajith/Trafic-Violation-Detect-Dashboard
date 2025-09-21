import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../config/firebase";
import { setCredentials } from "../../slices/authSlice";
import { ImSpinner9 } from "react-icons/im";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaTrafficLight,
  FaShieldAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import signup from "../../images/signup.svg";
import { doc, getDoc } from "firebase/firestore";

interface UserSignIn {
  email: string;
  password: string;
}

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<UserSignIn>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
      const res = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (res.user) {
        const userDocRef = doc(database, "users", res.user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const { role, email } = userData;

          dispatch(setCredentials({ email, role }));

          // Reset form
          setFormData({ email: "", password: "" });

          toast.success(`Signed in complete`, { className: "text-xs" });

          // Redirect based on role
          if (role === "Admin") {
            navigate("/dashboard");
          } else if (role === "User") {
            navigate("/monitor");
          } else {
            navigate("/checkout");
          }
        } else {
          throw new Error("User data not found in Firestore.");
        }
      }
    } catch (error: any) {
      toast.error("Invalid Login Credentials", {
        className: "text-xs",
      });
      console.error(error.message);
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
              <FaShieldAlt className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Email Address"
                onChange={handleChange}
                name="email"
                value={formData.email}
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Password"
                onChange={handleChange}
                name="password"
                value={formData.password}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
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
                "Sign In"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
