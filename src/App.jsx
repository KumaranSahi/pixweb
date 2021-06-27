import "./App.css";
import { LandingPage } from "./pages/landing/LandingPage";
import { VideoContextProvider } from "./store";
import { ToastContainer } from "react-toastify";
import { setupAuthExceptionHandler } from "./axiosUtils";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function App() {
  const { push } = useHistory();

  useEffect(() => {
    setupAuthExceptionHandler(push);
  }, [push]);

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
