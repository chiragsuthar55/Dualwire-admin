import { formattedDateWithTime } from "Helper/Common";
import { renderMsg } from "Helper/Common";
import { setSingleUser } from "Store/Reducers/UsersSlice";
import { setUsersList } from "Store/Reducers/UsersSlice";
import { setUsersLoading } from "Store/Reducers/UsersSlice";
import axios from "axios";
import { toast } from "react-toastify";

/**
 * @desc  Get Users List
 */
export const getUsersList =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch(setUsersLoading(true));
      const response = await axios.get(`/admin/users?page=${page}`);

      const { success, data, message } = response.data;
      if (success) {
        const updated = {
          ...data,
          records: data?.records?.map((x) => {
            return {
              ...x,
              joined_date: formattedDateWithTime(x?.created_at),
            };
          }),
        };
        dispatch(setUsersList(updated));
        return true;
      } else {
        toast.error(message);
        return false;
      }
    } catch (e) {
      toast.error(renderMsg(e));
      return false;
    } finally {
      dispatch(setUsersLoading(false));
    }
  };

/**
 * @desc  Get Single User
 */
export const getSingleUser = (u_id) => async (dispatch) => {
  try {
    if (u_id) {
      dispatch(setUsersLoading(true));
      const response = await axios.get(`/admin/users/${u_id}`);

      const { success, data, message } = response.data;
      if (success) {
        dispatch(setSingleUser(data));
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
    dispatch(setUsersLoading(false));
  }
};

/**
 * @desc  Update User
 */
export const updateUser = (payload, u_id) => async (dispatch) => {
  try {
    if (payload && u_id) {
      dispatch(setUsersLoading(true));
      const response = await axios.post(`/admin/users/${u_id}`, payload);

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
    dispatch(setUsersLoading(false));
  }
};

/**
 * @desc  Create User
 */
export const createUser = (payload) => async (dispatch) => {
  try {
    if (payload) {
      dispatch(setUsersLoading(true));
      const response = await axios.post(`/admin/users`, payload);

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
    dispatch(setUsersLoading(false));
  }
};
