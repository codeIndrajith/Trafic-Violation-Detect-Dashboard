import { Outlet, useNavigation } from "react-router-dom";
import Spinner from "./components/Spinner";
import { ToastContainer } from "react-toastify";

function App() {
  const navigation = useNavigation();
  return (
    <div>
      {navigation.state === "loading" && <Spinner />} <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
