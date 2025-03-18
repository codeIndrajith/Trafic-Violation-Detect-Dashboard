import { PiPaypalLogo } from "react-icons/pi";
import Police from "../images/police.png";
import station from "../images/station.png";
import { BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";

const LandingPage = () => {
  return (
    <>
      <div className="h-44 mt-48 md:mt-8 bg-[#45AAF2] rounded-md flex flex justify-between items-center px-4">
        <div>
          <h1 className="text-2xl md:text-4xl">Police Station</h1>
          <p className="text-sm">Check all violation today</p>
        </div>
        <div className="mb-12">
          <img className="" src={Police} alt="landing icon" />
        </div>
      </div>

      <div className="grid gap-4 md:gap-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mt-12">
        <div className="h-24 rounded-md bg-[#3498DB] flex items-center justify-around px-14">
          <IoDocumentText className="text-4xl text-white" />

          <div className="flex flex-col items-center">
            <p className="text-4xl xl:text-xl text-white">4</p>
            <p className="text-sm text-white">Rules</p>
          </div>
        </div>
        <div className="h-24 rounded-md bg-[#1ABC9C] flex items-center justify-around px-14">
          <BsFillFileEarmarkRuledFill className="text-4xl text-white" />

          <div className="flex flex-col items-center">
            <p className="text-4xl xl:text-xl text-white">35</p>
            <p className="text-sm text-white">Violation</p>
          </div>
        </div>
        <div className="h-24 rounded-md bg-[#F5CD79] flex items-center justify-around px-14">
          <HiOutlineDocumentReport className="text-5xl text-white" />

          <div className="flex flex-col items-center">
            <p className="text-4xl xl:text-xl text-white">24</p>
            <p className="text-sm text-white">Reports</p>
          </div>
        </div>
        <div className="h-24 rounded-md bg-[#95A5A6] flex items-center justify-around px-14">
          <PiPaypalLogo className="text-5xl text-white" />

          <div className="flex flex-col items-center">
            <p className="text-4xl xl:text-xl text-white">20</p>
            <p className="text-sm text-white">Pay</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-2">
        <div className="w-full flex items-start flex-col md:flex-row w-full h-auto rounded-md lg:h-[140px] bg-gray-100 flex gap-4 lg:gap-24 items-center px-8 py-[75px]">
          <img
            src={station}
            alt="police_station_image"
            className="size-48 lg:size-28 object-cover"
          />
          <div className="flex flex-col items-start justify-between gap-4">
            <h1 className="text-2xl">Police Station Sri Lanka</h1>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 items-center">
                <FaPhoneAlt className="text-sm" />{" "}
                <span className="text-sm">081 3456789</span>
              </div>
              <div className="flex gap-4 items-center">
                <MdOutlineMail className="text-sm" />{" "}
                <span className="text-sm">MainPoliceStation@gmail.com</span>
              </div>
              <div className="flex gap-4 items-center">
                <FaLocationPin className="text-sm" />{" "}
                <span className="text-sm">Kandy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
