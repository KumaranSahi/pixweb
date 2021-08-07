import classes from "./SigninPage.module.css";
import { useAuth } from "../../store";
import { warningToast } from "../../components";
import { useSigninPageReducer } from "./SigninReducer";
import {
  ChangePasswordComponent,
  SigninComponent,
  SignupComponent,
} from "./signinComponents";

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
    signInGuest,
  } = useAuth();
  const {
    userName,
    userNameValid,
    email,
    emailValid,
    password,
    confirmPassword,
    passwordValid,
    signinPageDispatch,
  } = useSigninPageReducer();

  const validateUserName = (userName) => {
    if (userName.length === 0) {
      signinPageDispatch({ type: "SET_USERNAME_VALID", payload: false });
      return false;
    }
    signinPageDispatch({ type: "SET_USERNAME_VALID", payload: true });
    return true;
  };

  const validateEmail = (email) => {
    if (
      email.length > 0 &&
      new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email)
    ) {
      signinPageDispatch({ type: "SET_EMAIL_VALID", payload: true });
      return true;
    }
    signinPageDispatch({ type: "SET_EMAIL_VALID", payload: false });
    return false;
  };

  const validatePassword = (password) => {
    if (
      password.length > 0 &&
      new RegExp("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$").test(password)
    ) {
      signinPageDispatch({ type: "SET_PASSWORD_VALID", payload: true });
      return true;
    } else signinPageDispatch({ type: "SET_PASSWORD_VALID", payload: false });
    return false;
  };

  const signupSubmit = async (event) => {
    event.preventDefault();
    if (
      validateUserName(userName) &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      signUpUser({
        userData: {
          name: userName,
          email: email,
          password: password,
        },
        setLoading: setAuthLoading,
        dispatch: authDispatch,
      });
    }
  };

  const signInSubmit = async (event) => {
    event && event.preventDefault();
    validateEmail(email);
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
    validateEmail(email);
    if (password === confirmPassword) {
      if (validatePassword(password) && validatePassword(confirmPassword)) {
        changePassword({
          userData: {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          },
          setLoading: setAuthLoading,
          setCurrentPage: setAuthCurrentPage,
        });
      }
    } else {
      warningToast("Passwords do not match");
    }
  };

  const updateGuestCredentials = () => {
    signInGuest({
      setLoading: setAuthLoading,
      dispatch: authDispatch,
    });
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
            passwordValid={passwordValid}
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
            passwordValid={passwordValid}
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
            passwordValid={passwordValid}
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
          <p
            className={classes["switch-page"]}
            onClick={() => updateGuestCredentials()}
          >
            Sign-in as guest
          </p>
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
