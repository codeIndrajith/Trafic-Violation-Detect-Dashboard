import CategorySelect from "../components/CategorySelect";
import Navbar from "../components/Navbar";

const HomePage = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <CategorySelect />
            <Navbar />
        </div>
    )
}

export default HomePage;