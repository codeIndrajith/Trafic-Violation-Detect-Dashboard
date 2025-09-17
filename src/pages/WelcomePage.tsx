import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IoShieldCheckmark,
  IoCamera,
  IoCard,
  IoArrowForward,
} from "react-icons/io5";
import heroImage from "../assets/hero-traffic-monitoring.jpg";
import cameraImage from "../assets/camera-detection.jpg";
import paymentImage from "../assets/payment-rules.jpg";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSignIn = (): void => {
    navigate("/sign-in");
  };

  const features = [
    {
      title: "Detect Violations",
      image: cameraImage,
      icon: <IoCamera className="w-8 h-8" />,
      description:
        "Our advanced traffic violation detection system operates 24/7, utilizing state-of-the-art road cameras to monitor and identify violations in real-time with AI-powered precision.",
    },
    {
      title: "Rules and Payment",
      image: paymentImage,
      icon: <IoCard className="w-8 h-8" />,
      description:
        "Access comprehensive traffic rules information and utilize our secure, user-friendly payment system for seamless fine processing and instant receipt generation.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <motion.div
        className="container mx-auto px-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section */}
        <motion.div
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative h-[70vh] lg:h-[80vh]">
            <img
              src={heroImage}
              alt="Traffic Monitoring Dashboard"
              className="w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/50 to-transparent" />

            {/* Content overlay */}
            <motion.div
              className="absolute inset-0 flex items-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              <div className="max-w-2xl px-8 lg:px-16">
                <div className="flex items-center gap-3 mb-6">
                  <IoShieldCheckmark className="w-10 h-10 text-blue-400" />
                  <span className="text-lg font-semibold text-slate-300">
                    Traffic Violation Detection
                  </span>
                </div>

                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Real-Time
                  </span>
                  <br />
                  <span className="text-white">Traffic Monitoring</span>
                </h1>

                <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed max-w-lg">
                  Advanced AI-powered surveillance system that monitors traffic
                  violations 24/7, ensuring road safety with precision and
                  efficiency.
                </p>

                <button
                  onClick={handleSignIn}
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold tracking-wide px-8 py-3 rounded-xl text-base hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                >
                  Get Started
                  <IoArrowForward className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
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
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/30 rounded-3xl p-8 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.3 }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/30">
                    {feature.icon}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg shadow-slate-900/50">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Ready to enhance road safety?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of traffic management professionals using our
            platform to create safer roads.
          </p>
          <button
            onClick={handleSignIn}
            className="inline-flex items-center justify-center bg-gradient-to-r from-slate-700 to-slate-600 text-white font-medium px-8 py-3 rounded-xl text-base hover:scale-105 transition-all duration-300 shadow-lg shadow-slate-700/30 hover:shadow-xl hover:shadow-slate-700/40"
          >
            Start Monitoring Today
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
