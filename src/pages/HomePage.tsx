import { PiPaypalLogo } from "react-icons/pi";
import Police from "../images/police.png";
import station from "../images/station.png";
import { BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HomePage = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [vilCount, setVilCount] = useState<string>("");
  const [repoCount, setRepoCount] = useState<string>("");

  useEffect(() => {
    const count1 = localStorage.getItem("violationCount");
    const count2 = localStorage.getItem("ReportCount");
    setVilCount(count1 ?? "");
    setRepoCount(count2 ?? "");
  }, []);

  return (
    <motion.div
      className="w-full px-4 md:px-8 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-900 to-yellow-700 rounded-2xl shadow-lg p-6 mb-8 flex justify-between items-center">
        <div className="text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Police Station Dashboard
          </h1>
          <p className="text-blue-100">
            Monitor all violations and reports in real-time
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img className="w-28 md:w-36" src={Police} alt="Police badge icon" />
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <motion.div
          className="bg-white rounded-xl shadow-md p-6 flex items-center"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="bg-blue-100 p-4 rounded-lg mr-4">
            <IoDocumentText className="text-3xl text-blue-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">2</p>
            <p className="text-sm text-gray-500">Rules</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-md p-6 flex items-center"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="bg-emerald-100 p-4 rounded-lg mr-4">
            <BsFillFileEarmarkRuledFill className="text-3xl text-emerald-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{vilCount}</p>
            <p className="text-sm text-gray-500">Violations</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-md p-6 flex items-center"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="bg-amber-100 p-4 rounded-lg mr-4">
            <HiOutlineDocumentReport className="text-3xl text-amber-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">{repoCount}</p>
            <p className="text-sm text-gray-500">Reports</p>
          </div>
        </motion.div>
      </div>

      {/* Station Information Card */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 p-6 bg-gray-50 flex items-center justify-center">
            <img
              src={station}
              alt="Police station"
              className="w-full max-w-xs object-cover rounded-lg"
            />
          </div>
          <div className="md:w-3/5 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Police Station Sri Lanka
            </h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaPhoneAlt className="text-blue-600 text-sm" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-800">081 3456789</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <MdOutlineMail className="text-blue-600 text-sm" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800">{userInfo?.email}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaLocationPin className="text-blue-600 text-sm" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-800">Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
