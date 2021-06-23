import { Navbar } from "./navbar/navbar/Navbar";
import { MobileNavbar } from "./navbar/mobileNavbar/MobileNavbar";
import { HomePage } from "../home/HomePage";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Catagories } from "../catagories/Catagories";
import { useAuth, useVideo } from "../../store";
import { PlaylistPage } from "../playlist/PlaylistPage";
import { useEffect } from "react";
import { VideoPlayer } from "../catagories/videoPlayer/VideoPlayer";
import { HistoryPage } from "../history/History";
import { SigninPage } from "../signin/SigninPage";
import { Spinner } from "../../components";

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
      <MobileNavbar />
    </div>
  );
};
