import { Link } from "react-router-dom";
import signin from "../../images/signin.svg";

const SignInPage = () => {
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
              src={signin}
              alt="signin-image"
            />
          </div>
        </div>
        <div className="w-full">
          <h2 className="py-2">Welcome</h2>
          <form className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="relative w-full">
                <input
                  type="text"
                  id="first-name"
                  className="peer w-full border rounded-sm border-gray-200 p-4 text-sm focus:outline-none focus:border-green-500 invalid:border-red-500"
                  placeholder=" "
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
                  type="text"
                  id="password"
                  className="peer w-full border rounded-sm border-gray-200 p-4 text-sm focus:outline-none focus:border-green-500 invalid:border-red-500"
                  placeholder=" "
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
                Sign In
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
