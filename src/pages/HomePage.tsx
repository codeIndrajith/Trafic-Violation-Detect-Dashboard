import CategorySelect from "../components/CategorySelect";
import Navbar from "../components/Navbar";

const HomePage = () => {
    return (
        <div className="flex">
            <CategorySelect />
            <Navbar />
        </div>
    )
}

export default HomePage;