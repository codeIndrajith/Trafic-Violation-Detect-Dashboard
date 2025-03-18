import { useNavigate } from "react-router-dom";
import welcomeImage from "../images/welcome.jpg";
import camera from "../images/camera.svg";
import notification from "../images/notification.svg";
import payment from "../images/payment.svg";

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
          className="w-full h-full  object-cover  rounded-md"
        />
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-end sm:text-start p-8 rounded-xl w-[70%] sm:w-[60%] md:w-1/2">
          <h2 className="text-md sm:text-2xl text-start font-bold mb-4">
            Check Traffic Violations in Real-Time
          </h2>
          <p className="text-xs md:text-lg mb-4">
            Stay up to date with the latest traffic violations in your area,
            monitored in real-time to keep you informed.
          </p>
          <button
            onClick={handleSignIn}
            className="hover:bg-gray-500 border border-black hover:border-gray-500 hover:text-white text-xs sm:text-sm px-8 py-2 rounded-sm mt-4"
          >
            Sign In
          </button>
        </div>
      </div>
      <div className="w-full h-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div className="w-full flex flex-col items-start gap-2 border cursor-pointer rounded-lg p-4">
          <div>
            <h1 className="font-semibol text-lg">Detect Violations</h1>
            <img className="w-[160px]" src={camera} alt="camera_image" />
          </div>
          <p className="text-sm text-justify h-auto lg:h-32 p-2 rounded-sm">
            Our advanced traffic violation detection system operates 24/7,
            utilizing road cameras to monitor and identify violations in
            real-time. Designed to enhance road safety and enforce Sri Lankas
            traffic regulations, our system ensures a safer and more disciplined
            driving environment for everyone
          </p>
        </div>

        <div className="w-full flex flex-col items-start cursor-pointer gap-2 border p-4">
          <div>
            <h1 className="font-semibol text-lg">Notification Alert</h1>
            <img
              className="w-[160px]"
              src={notification}
              alt="notification_image"
            />
          </div>
          <p className="text-sm text-justify h-auto lg:h-32 p-2 rounded-sm">
            Our system features a real-time notification system that instantly
            alerts the police station upon detecting a violation, ensuring swift
            action and effective enforcement.
          </p>
        </div>

        <div className="w-full flex flex-col items-start cursor-pointer gap-2 border p-4">
          <div>
            <h1 className="font-semibol text-lg">Rules and Payment</h1>
            <img className="w-[160px]" src={payment} alt="payment_image" />
          </div>
          <p className="text-sm text-justify h-auto lg:h-32 p-2 rounded-sm">
            Our system provides complete traffic rules information and a
            user-friendly payment system for seamless fine processing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
