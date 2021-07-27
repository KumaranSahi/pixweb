import { useReducer } from "react";

export const useSigninPageReducer = () => {
  const signinReducer = (state, action) => {
    switch (action.type) {
      case "ADD_USERNAME":
        return {
          ...state,
          userName: action.payload,
        };
      case "SET_USERNAME_VALID":
        return {
          ...state,
          userNameValid: action.payload,
        };
      case "ADD_EMAIL":
        return {
          ...state,
          email: action.payload,
        };
      case "SET_EMAIL_VALID":
        return {
          ...state,
          emailValid: action.payload,
        };
      case "ADD_PASSWORD":
        return {
          ...state,
          password: action.payload,
        };
      case "SET_PASSWORD_VALID":
        return {
          ...state,
          passwordValid: action.payload,
        };
      case "ADD_CONFIRM_PASSWORD":
        return {
          ...state,
          confirmPassword: action.payload,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(signinReducer, {
    userName: "",
    userNameValid: true,
    email: "",
    emailValid: true,
    password: "",
    passwordValid: true,
    confirmPassword: "",
  });
  return {
    ...state,
    signinPageDispatch: dispatch,
  };
};
