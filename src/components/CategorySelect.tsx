import { BiSolidMobileVibration, BiSolidReport } from "react-icons/bi";
import { BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { MdDashboardCustomize } from "react-icons/md";
import { SiPaypal } from "react-icons/si";
import { IoCloseSharp } from "react-icons/io5";
import Logo from "../images/Frame.png"

const CategorySelect = () => {
    return (
        <>
            {/* Left side section */}
            <section className="absolute md:relative z-10 px-6 py-8 h-screen bg-red-300 w-full md:w-[35%] lg:w-1/5">
                <div className="mb-24 flex items-center justify-between">
                    <img className="w-20 h-20" src={Logo} alt="logo" />
                    <IoCloseSharp className="text-4xl md:hidden mr-4" />
                </div>


                <div className="">
                    <h1 className="text-md text-center md:text-start text-gray-400 mb-14 px-2">Category</h1>
                    <div className="flex flex-col gap-12 md:gap-8 px-2 w-full">
                        <div className="flex gap-8 items-center">
                            <MdDashboardCustomize className="text-lg" /> <span className="text-lg">Dashboard</span>
                        </div>

                        <div className="flex gap-8 items-center">
                            <BsFillFileEarmarkRuledFill className="text-lg" /> <span className="text-lg">Rules</span>
                        </div>

                        <div className="flex gap-8 items-center">
                            <BiSolidMobileVibration className="text-lg" /> <span className="text-lg">Violations</span>
                        </div>

                        <div className="flex gap-8 items-center">
                            <BiSolidReport className="text-lg" /> <span className="text-lg">Reports</span>
                        </div>

                        <div className="flex gap-8 items-center">
                            <SiPaypal className="text-lg" /> <span className="text-lg">Payment</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CategorySelect;