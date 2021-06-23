import "./App.css";
import { LandingPage } from "./pages/landing/LandingPage";
import { VideoContextProvider } from "./store";
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
