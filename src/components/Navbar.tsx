import { AiOutlineMail } from "react-icons/ai"
import { BsBell } from "react-icons/bs"
import { MdKeyboardArrowDown } from "react-icons/md"


const Navbar = () => {
    return (
        <>
            {/* Right side section */}
            <section className="hidden md:block absolute md:relative bg-blue-300 h-[120px] w-full md:w-4/5">
                <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6">
                    <div>
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <p className="text-[12px] text-[#131313]">Monday 03 March 2024</p>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                            <AiOutlineMail className="text-lg" />
                            <BsBell className="text-lg" />
                            <p className="px-3 py-0.5 bg-gray-300 rounded-sm">I</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <h1>Indrajith Bodhinayaka</h1>
                            <MdKeyboardArrowDown className="text-xl" />
                        </div>
                    </div>
                </div>
            </section>
            
        </>
    )
}

export default Navbar