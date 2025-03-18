import { Link, useNavigate } from "react-router-dom";
import signup from "../../images/signup.svg";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { ImSpinner9 } from "react-icons/im";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  contactNumber: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    contactNumber: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (res) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          address: "",
          contactNumber: "",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center p-12">
      <div className="flex flex-col xl:flex-row items-center justify-center gap-4">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="font-semibold text-xs lg:text-xl mb-4 w-full">
            Monitoring real-time traffic violations with us
          </h1>
          <div className="w-full">
            <img
              className="size-[60%] md:size-[40%] xl:size-[80%]"
              src={signup}
              alt="signin-image"
            />
          </div>
        </div>
        <div className="w-full">
          <h2 className="py-2">Check Violation Today!</h2>
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
                <input
                  type="text"
                  id="address"
                  className="peer w-full border rounded-sm border-gray-200 p-4 text-sm focus:outline-none focus:border-green-500 invalid:border-red-500"
                  placeholder=" "
                  onChange={handleChange}
                  name="address"
                  value={formData.address}
                  required
                />
                <label
                  htmlFor="address"
                  className="absolute left-4 top-[3px] text-xs text-green-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-[3px] peer-focus:text-xs peer-focus:text-green-500"
                >
                  Police station address
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
                    Sign In
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
