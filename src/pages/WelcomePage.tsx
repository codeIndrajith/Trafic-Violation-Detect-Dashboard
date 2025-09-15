import { useNavigate } from "react-router-dom";
import welcomeImage from "../images/welcome.jpg";
import camera from "../images/camera.svg";
import payment from "../images/payment.svg";
import { motion } from "framer-motion";

const WelcomePage = () => {
  const navigate = useNavigate();
  const handleSignIn = (): void => {
    navigate("/sign-in");
  };
  return (
    <motion.div
      className="w-full h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full h-[60%] relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src={welcomeImage}
          alt="welcome-image"
          className="w-full h-full  object-cover  rounded-md"
        />
        <motion.div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-end sm:text-start rounded-xl px-6 md:px-2 w-[70%] sm:w-[60%] md:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-md sm:text-xl xl:text-2xl text-start font-bold mb-4">
            Check Traffic Violations in Real-Time
          </h2>
          <p className="text-xs md:text-md xl:text-lg mb-4">
            Stay up to date with the latest traffic violations in your area,
            monitored in real-time to keep you informed.
          </p>
          <button
            onClick={handleSignIn}
            className="hover:bg-gray-500 border border-black hover:border-gray-500 hover:text-white text-xs sm:text-sm px-8 py-2 rounded-sm"
          >
            Sign In
          </button>
        </motion.div>
      </motion.div>
      <motion.div
        className="w-full h-auto grid grid-cols-1 lg:grid-cols-2 py-4 gap-4 mt-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
          },
        }}
      >
        {[
          {
            title: "Detect Violations",
            img: camera,
            text: "Our advanced traffic violation detection system operates 24/7, utilizing road cameras to monitor and identify violations in real-time.",
          },

          {
            title: "Rules and Payment",
            img: payment,
            text: "Our system provides complete traffic rules information and a user-friendly payment system for seamless fine processing.",
          },
        ].map((item, index) => (
          <motion.div
            key={index + 1}
            className="w-full flex flex-col items-start gap-2 border cursor-pointer rounded-lg p-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.3 }}
          >
            <div>
              <h1 className="font-semibold text-lg">{item.title}</h1>
              <img className="w-[160px]" src={item.img} alt={item.title} />
            </div>
            <p className="text-sm text-justify h-auto p-2 rounded-sm">
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default WelcomePage;
