import { BiSolidMobileVibration, BiSolidReport } from "react-icons/bi";
import { BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { MdDashboardCustomize } from "react-icons/md";
import { SiPaypal } from "react-icons/si";
import Logo from "../images/Frame.png"

const CategorySelect = () => {
    return (
        <>
            {/* Left side section */}
            <section className="px-6 py-8 h-screen bg-red-300 w-1/5">
                <div className="mb-24">
                    <img className="w-20 h-20" src={Logo} alt="logo" />
                </div>


                <div className="">
                    <h1 className="text-md text-gray-400 mb-14">Category</h1>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-8 items-center">
                            <MdDashboardCustomize className="text-lg" /> <span className="text-lg">Dashboard</span>
                        </div>

                        <div className="flex gap-8 items-center">
                            <BsFillFileEarmarkRuledFill className="text-lg" /> <span className="text-lg">Trafic Rules</span>
                        </div>

                        <div className="flex gap-8 items-center">
                            <BiSolidMobileVibration className="text-lg" /> <span className="text-lg">Trafic Violations</span>
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