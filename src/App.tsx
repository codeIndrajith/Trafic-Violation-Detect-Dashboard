import { Outlet, useNavigation } from "react-router-dom";
import Spinner from "./components/Spinner";

function App() {
  const navigation = useNavigation();
  return (
    <div>
      {navigation.state === "loading" && <Spinner />}{" "}
      {/* Show spinner while navigating */}
      <Outlet />
    </div>
  );
}

export default App;
