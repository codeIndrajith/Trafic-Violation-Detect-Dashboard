import { Outlet, useNavigation } from "react-router-dom";
import Spinner from "./components/Spinner";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import CategorySelect from "./components/CategorySelect";

function App() {
  const navigation = useNavigation();
  return (
    <div>
      {navigation.state === "loading" && <Spinner />}
      <ToastContainer />
      <Navbar />
      <div className="flex items-start gap-4">
        <CategorySelect />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
