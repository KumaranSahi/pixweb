import classes from "./SigninPage.module.css";
import { useAuth } from "../../store";
import { warningToast } from "../../components";
import { useSigninPageReducer } from "./SigninReducer";
import {
  ChangePasswordComponent,
  SigninComponent,
  SignupComponent,
} from "./SigninComponents";

export const SigninPage = () => {
  const {
    signUpUser,
    signInUser,
    currentPage,
    setAuthCurrentPage,
    changePassword,
    setAuthLoading,
    authDispatch,
    authLoading,
  } = useAuth();
  const {
    userName,
    userNameValid,
    email,
    emailValid,
    password,
    confirmPassword,
    signinPageDispatch,
  } = useSigninPageReducer();

  const validateUserName = () => {
    if (userName.length === 0)
      signinPageDispatch({ type: "SET_USERNAME_VALID", payload: false });
    else signinPageDispatch({ type: "SET_USERNAME_VALID", payload: true });
  };

  const validateEmail = () => {
    if (
      email.length > 0 &&
      new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email)
    )
      signinPageDispatch({ type: "SET_EMAIL_VALID", payload: true });
    else signinPageDispatch({ type: "SET_EMAIL_VALID", payload: false });
  };

  const signupSubmit = async (event) => {
    event.preventDefault();
    validateUserName();
    validateEmail();
    if (userNameValid && emailValid) {
      signUpUser({
        userData: {
          name: userName,
          email: email,
          password: password,
        },
        setLoading: setAuthLoading,
        setCurrentPage: setAuthCurrentPage,
      });
    }
  };

  const signInSubmit = async (event) => {
    event.preventDefault();
    validateEmail();
    if (emailValid)
      signInUser({
        userData: {
          email: email,
          password: password,
        },
        setLoading: setAuthLoading,
        dispatch: authDispatch,
      });
  };

  const changePasswordSubmit = async (event) => {
    event.preventDefault();
    validateEmail();
    if (password === confirmPassword) {
      changePassword({
        userData: {
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        },
        setLoading: setAuthLoading,
        setCurrentPage: setAuthCurrentPage,
      });
    } else {
      warningToast("Passwords do not match");
    }
  };

  const pageToRender = () => {
    switch (currentPage) {
      case "SIGNUP_PAGE":
        return (
          <SignupComponent
            password={password}
            email={email}
            emailValid={emailValid}
            signupSubmit={signupSubmit}
            signinPageDispatch={signinPageDispatch}
            userName={userName}
            userNameValid={userNameValid}
            authLoading={authLoading}
          />
        );
      case "SIGNIN_PAGE":
        return (
          <SigninComponent
            signinPageDispatch={signinPageDispatch}
            email={email}
            emailValid={emailValid}
            password={password}
            signInSubmit={signInSubmit}
            authLoading={authLoading}
          />
        );
      case "CHANGE_PASSWORD":
        return (
          <ChangePasswordComponent
            changePasswordSubmit={changePasswordSubmit}
            confirmPassword={confirmPassword}
            email={email}
            password={password}
            signinPageDispatch={signinPageDispatch}
            authLoading={authLoading}
          />
        );
      default:
        return (
          <SignupComponent
            password={password}
            email={email}
            emailValid={emailValid}
            signupSubmit={signupSubmit}
            signinPageDispatch={signinPageDispatch}
            userName={userName}
            userNameValid={userNameValid}
            authLoading={authLoading}
          />
        );
    }
  };

  return (
    <div className={classes["login-container"]}>
      <img
        src="https://res.cloudinary.com/docpuxue8/image/upload/v1618250089/PixWeb/LoginPageBackground_fww2yn.jpg"
        alt="login"
        className={classes["login-image"]}
      />
      <div className={classes["login"]}>
        <div className={classes["signin-signup-container"]}>
          {pageToRender()}
          {currentPage === "SIGNIN_PAGE" && (
            <p
              className={classes["switch-page"]}
              onClick={() => setAuthCurrentPage("CHANGE_PASSWORD")}
            >
              Forgot Password
            </p>
          )}
          {currentPage === "SIGNIN_PAGE" ? (
            <p
              className={classes["switch-page"]}
              onClick={() => setAuthCurrentPage("SIGNUP_PAGE")}
            >
              New to Pix? Sign up!
            </p>
          ) : (
            <p
              className={classes["switch-page"]}
              onClick={() => setAuthCurrentPage("SIGNIN_PAGE")}
            >
              Already have an Account? Sign In!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
