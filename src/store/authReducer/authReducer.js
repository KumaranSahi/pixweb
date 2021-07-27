import { warningToast, successToast, infoToast } from "../../components";
import { APP_URL, setupAuthHeaderForServiceCalls } from "../../axiosUtils";
import axios from "axios";

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN_USER":
      return {
        ...state,
        token: action.payload.token,
        userName: action.payload.userName,
        userId: action.payload.userId,
        expiresIn: action.payload.expiresIn,
      };
    case "SIGNOUT_USER":
      return {
        ...state,
        token: null,
        userName: null,
        expiresIn: null,
        userId: null,
      };
    default:
      return state;
  }
};

export const signUpUser = async ({ userData, setLoading, dispatch }) => {
  setLoading(true);
  try {
    const { data } = await axios.post(`${APP_URL}/api/users/signup`, userData);
    if (data.ok) {
      successToast("User Added Successfully");
      setupAuthHeaderForServiceCalls(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("userId", data.userId);
      const expiresIn = new Date(new Date().getTime() + 86400000);
      localStorage.setItem("expiresIn", expiresIn);
      checkAuthTimeout({ expirationTime: 86400, dispatch: dispatch });
      dispatch({
        type: "SIGNIN_USER",
        payload: {
          token: data.token,
          userName: data.userName,
          expiresIn: expiresIn,
          userId: data.userId,
        },
      });
      setLoading(false);
    }
  } catch (error) {
    if (+error.response.status === 409) {
      infoToast("User already exists in the pix ecosystem");
      infoToast("Please Try loging in");
      setLoading(false);
      return;
    }
    warningToast("Failed to add user");
    console.log(error);
    setLoading(false);
  }
};

export const checkAuthTimeout = ({ expirationTime, dispatch }) => {
  setTimeout(() => {
    signOutUser({ dispatch });
  }, expirationTime * 1000);
};

export const signOutUser = ({ dispatch }) => {
  localStorage.clear();
  dispatch({
    type: "SIGNOUT_USER",
  });
};

export const onReload = ({ dispatch }) => {
  const token = localStorage.getItem("token");
  setupAuthHeaderForServiceCalls(token);
  const expiresIn = new Date(localStorage.getItem("expiresIn"));
  const userId = localStorage.getItem("userId");
  if (expiresIn <= new Date()) {
    signOutUser({ dispatch });
  } else {
    const userName = localStorage.getItem("userName");
    checkAuthTimeout({
      expirationTime: (expiresIn.getTime() - new Date().getTime()) / 1000,
      dispatch: dispatch,
    });
    dispatch({
      type: "SIGNIN_USER",
      payload: {
        token: token,
        userName: userName,
        expiresIn: expiresIn,
        userId: userId,
      },
    });
  }
};

export const changePassword = async ({
  userData,
  setLoading,
  setCurrentPage,
}) => {
  setLoading(true);
  try {
    const { data } = await axios.post(
      `${APP_URL}/api/users/password`,
      userData
    );
    if (data.ok) {
      successToast("Password changed successfully");
      setCurrentPage("SIGNIN_PAGE");
    }
    setLoading(false);
  } catch (error) {
    warningToast("Unable to change password please try again later");
    console.log(error);
    setLoading(false);
  }
};

export const signInUser = async ({ userData, setLoading, dispatch }) => {
  setLoading(true);
  try {
    const {
      data: { data },
    } = await axios.post(`${APP_URL}/api/users/signin`, userData);
    if (data.ok) {
      setupAuthHeaderForServiceCalls(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("userId", data.userId);
      const expiresIn = new Date(new Date().getTime() + 86400000);
      localStorage.setItem("expiresIn", expiresIn);
      checkAuthTimeout({ expirationTime: 86400, dispatch: dispatch });
      dispatch({
        type: "SIGNIN_USER",
        payload: {
          token: data.token,
          userName: data.userName,
          expiresIn: expiresIn,
          userId: data.userId,
        },
      });
      successToast("User Logged in Successfully");
      setLoading(false);
    }
  } catch (error) {
    warningToast("Invalid username or password");
    console.log(error);
    setLoading(false);
  }
};
