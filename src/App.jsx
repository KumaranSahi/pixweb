import "./App.css";
import LandingPage from "./Containers/LandingPage/LandingPage";
import { VideoContextProvider } from "./Store";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <VideoContextProvider>
        <LandingPage />
      </VideoContextProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
