import { Navbar } from "./NavBar/Navbar/Navbar";
import { MobileNavBar } from "./NavBar/MobileNavBar/MobileNavBar";
import { HomePage } from "../HomePage/HomePage";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Catagories } from "../Catagories/Catagories";
import { useAuth, useVideo } from "../../Store";
import { PlaylistPage } from "../PlaylistPage/PlaylistPage";
import { useEffect } from "react";
import { VideoPlayer } from "../Catagories/VideoPlayer/VideoPlayer";
import { HistoryPage } from "../History/History";
import { SigninPage } from "../SigninPage/SigninPage";
import Spinner from "../../UI/Spinner/Spinner";

import classes from "./LandingPage.module.css";

const VideoPlayerRoute = ({ ...props }) => {
  const { selectedVideo } = useVideo();
  return selectedVideo ? <Route {...props} /> : <Redirect to="/" />;
};

const PrivateLink = ({ ...props }) => {
  const { token } = useAuth();
  return token ? <Route {...props} /> : <Redirect to="/login" />;
};

const LockLogin = ({ ...props }) => {
  const { token } = useAuth();
  return token ? <Redirect to="/" /> : <Route {...props} />;
};

export const LandingPage = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { catagoriesLoading } = useVideo();
  const { authLoading } = useAuth();

  return (
    <div>
      <Navbar />
      {(catagoriesLoading || authLoading) && <Spinner />}
      <div className={classes["main-container"]}>
        <Switch>
          <Route path="/catagory/:id" component={Catagories} />
          <PrivateLink path="/my-playlist" component={PlaylistPage} />
          <VideoPlayerRoute path="/video-player" component={VideoPlayer} />
          <PrivateLink path="/history" component={HistoryPage} />
          <LockLogin path="/login" component={SigninPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
      <MobileNavBar />
    </div>
  );
};
