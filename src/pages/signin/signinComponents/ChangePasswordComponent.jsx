import classes from "../SigninPage.module.css";

export const ChangePasswordComponent = ({
  changePasswordSubmit,
  email,
  signinPageDispatch,
  password,
  confirmPassword,
  authLoading,
  passwordValid,
}) => {
  return (
    <>
      <h1>Change Password:</h1>
      <form
        className={classes["signup-container"]}
        onSubmit={changePasswordSubmit}
      >
        <input
          type="email"
          className={classes["textbox"]}
          placeholder="Email"
          required
          value={email}
          onChange={(event) =>
            signinPageDispatch({
              type: "ADD_EMAIL",
              payload: event.target.value,
            })
          }
        />
        <input
          type="password"
          className={classes["textbox"]}
          placeholder="Password"
          required
          value={password}
          onChange={(event) =>
            signinPageDispatch({
              type: "ADD_PASSWORD",
              payload: event.target.value,
            })
          }
        />

        {!passwordValid && (
          <p className={classes["error-text"]}>
            Password should be atleast 8 characters with atleast 1 number
          </p>
        )}
        <input
          type="password"
          className={classes["textbox"]}
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(event) =>
            signinPageDispatch({
              type: "ADD_CONFIRM_PASSWORD",
              payload: event.target.value,
            })
          }
        />

        {!passwordValid && (
          <p className={classes["error-text"]}>
            Password should be atleast 8 characters with atleast 1 number
          </p>
        )}
        <button
          type="submit"
          className={`${classes["button-solid"]} ${classes["button-primary"]}`}
          disabled={authLoading}
        >
          Change Password
        </button>
      </form>
    </>
  );
};
