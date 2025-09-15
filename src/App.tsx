import { Outlet, useNavigation } from "react-router-dom";
import Spinner from "./components/Spinner";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import DashboardLayout from "./pages/DashboardLayout";

function App() {
  const navigation = useNavigation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <div>
      {navigation.state === "loading" && <Spinner />}
      <ToastContainer />
      {userInfo ? <DashboardLayout /> : <Outlet />}
    </div>
  );
}

export default App;
