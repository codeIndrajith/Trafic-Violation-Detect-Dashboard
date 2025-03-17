import signin from "../../images/signin.svg";

const SignInPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center px-6 py-4">
      <div className="flex items-center justify-center gap-4">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="font-semibold text-xl mb-4 w-full">
            Monitoring real-time traffic violations with us
          </h1>
          <div className="w-full">
            <img className="size-[80%]" src={signin} alt="signin-image" />
          </div>
        </div>
        <div className="w-full">
          <form className="grid grid-cols-1 w-full gap-4">
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
                className="absolute left-4 top-1 text-xs text-green-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-500"
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
                className="absolute left-4 top-1 text-xs text-green-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-500"
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
                className="absolute left-4 top-1 text-xs text-green-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-500"
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
                required
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-1 text-xs text-green-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-green-500"
              >
                Password
              </label>
            </div>

            <div className="relative w-full">
              <button
                className="bg-blue-400 text-white p-4 w-full text-center text-sm"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
