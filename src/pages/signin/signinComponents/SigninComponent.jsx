import classes from "../SigninPage.module.css"

export const SigninComponent = ({
  signInSubmit,
  email,
  signinPageDispatch,
  emailValid,
  password,
  authLoading,
}) => {
  return (
    <>
      <h1>Sign In:</h1>
      <form className={classes["signup-container"]} onSubmit={signInSubmit}>
        <div>
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
          {!emailValid && (
            <p className={classes["error-text"]}>Please enter a valid email</p>
          )}
        </div>
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
        <button
          type="submit"
          className={`${classes["button-solid"]} ${classes["button-primary"]}`}
          disabled={authLoading}
        >
          Sign In
        </button>
      </form>
    </>
  );
};