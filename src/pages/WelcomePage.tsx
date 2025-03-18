import { useNavigate } from "react-router-dom";
import welcomeImage from "../images/welcome.jpg";

const WelcomePage = () => {
  const navigate = useNavigate();
  const handleSignIn = (): void => {
    navigate("/sign-in");
  };
  return (
    <div className="w-full h-screen p-6">
      <div className="w-full h-[60%] relative">
        <img
          src={welcomeImage}
          alt="welcome-image"
          className="w-full h-full  object-cover transform sm:scale-90 md:scale-80 lg:scale-100"
        />
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-start p-8 rounded-xl w-1/2">
          <h2 className="text-2xl font-bold mb-4">
            Check Traffic Violations in Real-Time
          </h2>
          <p className="text-lg mb-4">
            Stay up to date with the latest traffic violations in your area,
            monitored in real-time to keep you informed.
          </p>
          <button
            onClick={handleSignIn}
            className="bg-blue-500 text-white px-4 py-2 rounded-sm mt-4"
          >
            Sign In
          </button>
        </div>
      </div>
      <div className="w-full h-[40%]"></div>
    </div>
  );
};

export default WelcomePage;
