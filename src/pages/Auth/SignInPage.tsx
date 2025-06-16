import { Link, useNavigate } from "react-router-dom";
import signin from "../../images/signin.svg";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { setCredentials } from "../../slices/authSlice";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "react-toastify";
import authImage from "../../assets/authImage.jpg";

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
      if (res) {
        const { password, ...filteredData } = formData;
        dispatch(setCredentials(filteredData));
        setFormData({
          email: "",
          password: "",
        });
        toast.success("Sign In Complete", { className: "text-xs" });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error("Invalid Login Credentials", {
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
        <div className="w-full bg-white py-6 px-10 rounded-md">
          <h2 className="py-2">Welcome</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                    Sign In
                  </div>
                )}
              </button>
            </div>
            <div className="relative flex items-center justify-center gap-4 w-full">
              <div className="text-xs">Do you haven't an account ?</div>
              <Link className="text-xs text-gray-500" to="/sign-up">
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
