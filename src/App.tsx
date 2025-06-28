import { Outlet, useNavigation } from "react-router-dom";
import Spinner from "./components/Spinner";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import CategorySelect from "./components/CategorySelect";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const navigation = useNavigation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  return (
    <div>
      {navigation.state === "loading" && <Spinner />}
      <ToastContainer />
      {userInfo && <Navbar />}
      <div className="flex items-start">
        {userInfo && <CategorySelect />}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
