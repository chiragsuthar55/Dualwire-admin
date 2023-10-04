import { saveToken } from "Helper/AuthTokenHelper";
import { setCurrentUser } from "Store/Reducers/AuthSlice";
import { setAuthLoading } from "Store/Reducers/AuthSlice";
import axios from "axios";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { renderMsg } from "Helper/Common";
import { clearToken } from "Helper/AuthTokenHelper";
import { resetAuthSlice } from "Store/Reducers/AuthSlice";

export const setLoginData = (user_data) => async (dispatch, getState) => {
  saveToken(user_data);
};
export const setUserCookies =
  (user, remember) => async (dispatch, getState) => {
    console.log("user", user);
    console.log("remember", remember);
    const encryptData = CryptoJS.AES.encrypt(user, "UserSecrets").toString();
    if (remember) Cookies.set("user", encryptData);
  };

/**
 * @desc Verify Email
 * @param payload (user)
 */
export const login = (user) => async (dispatch) => {
  try {
    if (user) {
      dispatch(setAuthLoading(true));
      const response = await axios.post(`/login`, user);
      const { success, message, data } = response.data;
      if (success) {
        toast.success(message);
        dispatch(setLoginData(data));
        dispatch(setCurrentUser(data));
        dispatch(setUserCookies(JSON.stringify(user), user?.remember));
        return true;
      } else {
        toast.error(message);
        return false;
      }
    }
  } catch (e) {
    toast.error(renderMsg(e));
    return false;
  } finally {
    dispatch(setAuthLoading(false));
  }
};

/**
 * @desc  Get Profile
 */
export const getProfile = () => async (dispatch) => {
  try {
    dispatch(setAuthLoading(true));
    const response = await axios.get(`/profile`);

    const { success, message, data } = response.data;
    if (success) {
      dispatch(setCurrentUser(data));
      return true;
    } else {
      toast.error(message);
      return false;
    }
  } catch (e) {
    toast.error(renderMsg(e));
    return false;
  } finally {
    dispatch(setAuthLoading(false));
  }
};

/**
 * @desc  Create Account
 * @param payload (new User)
 */
export const createAccount = (payload) => async (dispatch) => {
  try {
    if (payload) {
      dispatch(setAuthLoading(true));

      const response = await axios.post(`/register`, payload);
      const { success, message, data } = response.data;
      if (success) {
        dispatch(setLoginData(data));
        dispatch(setCurrentUser(data));
        dispatch(
          setUserCookies(JSON.stringify(data?.token), payload?.remember)
        );
        toast.success(message);
        return true;
      } else {
        toast.error(message);
        return false;
      }
    }
  } catch (e) {
    toast.error(renderMsg(e));
    return false;
  } finally {
    dispatch(setAuthLoading(false));
  }
};

/**
 * @desc Logout
 */
export const logOut = () => async (dispatch) => {
  try {
    dispatch(setAuthLoading(true));
    const response = await axios.post(`/logout`);

    const { success, message } = response.data;
    if (success) {
      clearToken();
      dispatch(resetAuthSlice());
      toast.success(message || "Logout successfully");
      return true;
    } else {
      toast.error(message);
      return false;
    }
  } catch (e) {
    toast.error(renderMsg(e) || "Unable to logout");
    return false;
  } finally {
    dispatch(setAuthLoading(false));
  }
};

/**
 * @desc Update Profile
 */
export const updateProfile = (payload) => async (dispatch) => {
  try {
    if (payload) {
      dispatch(setAuthLoading(true));
      let body = new FormData();
      body.append("profile_image", payload?.profile_image);
      body.append("first_name", payload?.first_name);
      body.append("last_name", payload?.last_name);
      body.append("email", payload?.email);
      body.append("language", payload?.language);
      const headers = { "Content-Type": "multipart/form-data" };
      const response = await axios.post(`/profile`, body, {
        headers: headers,
      });

      const { success, message } = response.data;
      if (success) {
        toast.success(message || "Profile updated successfully !");
        return true;
      } else {
        toast.error(message);
        return false;
      }
    }
  } catch (e) {
    toast.error(renderMsg(e) || "Unable to logout");
    return false;
  } finally {
    dispatch(setAuthLoading(false));
  }
};

/**
 * @desc Change Password
 */
export const changePassword = (payload) => async (dispatch) => {
  try {
    if (payload) {
      dispatch(setAuthLoading(true));
      const response = await axios.post(`/change_password`, payload);

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        return true;
      } else {
        toast.error(message);
        return false;
      }
    }
  } catch (e) {
    toast.error(renderMsg(e) || "Unable to logout");
    return false;
  } finally {
    dispatch(setAuthLoading(false));
  }
};

/**
 * @desc Forget Password
 */
export const forgetPassword = (payload) => async (dispatch) => {
  try {
    if (payload) {
      dispatch(setAuthLoading(true));
      const response = await axios.post(`/forget_password`, payload);

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        return true;
      } else {
        toast.error(message);
        return false;
      }
    }
  } catch (e) {
    toast.error(renderMsg(e));
    return false;
  } finally {
    dispatch(setAuthLoading(false));
  }
};
/**
 * @desc Reset Password
 */
export const resetPassword = (payload) => async (dispatch) => {
  try {
    if (payload) {
      dispatch(setAuthLoading(true));
      const response = await axios.post(`/reset_password`, payload);

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        return true;
      } else {
        toast.error(message);
        return false;
      }
    }
  } catch (e) {
    toast.error(renderMsg(e));
    return false;
  } finally {
    dispatch(setAuthLoading(false));
  }
};

/**
 * @desc  Get New Token After Older One Expires
 * @param payload (existing User token)
 */
export const getNewToken = () => async (dispatch) => {
  try {
    dispatch(setAuthLoading(true));
    let UserPreferences = localStorage.getItem("UserPreferences");
    if (UserPreferences) {
      UserPreferences = JSON.parse(atob(UserPreferences));
      const response = await axios.post(`/new_token`, {
        refreshtoken: UserPreferences?.refresh_token,
      });
      const { success, message, data } = response.data;
      if (success) {
        toast.success(message);
        dispatch(setLoginData(data));
        dispatch(setUserCookies(JSON.stringify(data)));
        return true;
      } else {
        toast.error(message);
        return false;
      }
    }
  } catch (e) {
    toast.error(renderMsg(e));
    return false;
  } finally {
    dispatch(setAuthLoading(false));
  }
};
