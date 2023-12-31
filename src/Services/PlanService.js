import { renderMsg } from "Helper/Common";
import { setPlans } from "Store/Reducers/PlanSlice";
import { setSinglePlan } from "Store/Reducers/PlanSlice";
import { setPlanLoading } from "Store/Reducers/PlanSlice";
import axios from "axios";
import { toast } from "react-toastify";

/**
 * @desc  Get Plans
 */
export const getPlans = (plan_id) => async (dispatch) => {
  try {
    dispatch(setPlanLoading(true));
    let response;
    if (plan_id) response = await axios.get(`/admin/plan?plan_id=${plan_id}`);
    else response = await axios.get(`/admin/plan`);

    const { success, data, message } = response.data;
    if (success) {
      if (plan_id) {
        const updated = {
          ...data,
          // metaData: Object.keys(data?.metadata)?.map((y) => ({
          //   social_name: y,
          //   is_true: data?.metadata[y],
          // })),
          currency: data?.prices[0]?.currency,
          monthly: data?.prices?.find((y) => y?.duration === "month")?.price,
          yearly: data?.prices?.find((y) => y?.duration === "year")?.price,
          plan_id: data?.prices?.[0]?.plan_id,
        };

        dispatch(setSinglePlan(updated));
      } else {
        const updated = data?.map((x) => {
          // let metadata = Object.keys(x?.metadata)?.map((y) => ({
          //   social_name: y,
          //   is_true: x?.metadata[y],
          // }));
          return {
            ...x,
            // metadata,
            currency: x?.prices[0]?.currency,
            monthly: x?.prices?.find((y) => y?.duration === "month")?.price,
            yearly: x?.prices?.find((y) => y?.duration === "year")?.price,
            plan_id: x?.prices?.[0]?.plan_id,
          };
        });
        dispatch(setPlans(updated));
      }
      return true;
    } else {
      toast.error(message);
      return false;
    }
  } catch (e) {
    toast.error(renderMsg(e));
    return false;
  } finally {
    dispatch(setPlanLoading(false));
  }
};

/**
 * @desc  Update Status Of Plan
 */
export const updateStatusOfPlan = (plan_id, val) => async (dispatch) => {
  try {
    if (plan_id) {
      dispatch(setPlanLoading(true));
      const response = await axios.post(`/admin/plan_status`, {
        plan_id,
        status: val,
      });

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
    dispatch(setPlanLoading(false));
  }
};

/**
 * @desc  Update Plan (or create new one)
 * @update payload plan data with plan_id
 */
export const updatePlan = (payload) => async (dispatch) => {
  try {
    if (payload) {
      dispatch(setPlanLoading(true));
      const response = await axios.put(`/admin/plan`, payload);

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
    dispatch(setPlanLoading(false));
  }
};

/**
 * @desc  Create Plan
 * @create payload without plan_id
 */
export const createPlan = (payload) => async (dispatch) => {
  try {
    if (payload) {
      dispatch(setPlanLoading(true));
      const response = await axios.post(`/admin/plan`, payload);

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
    dispatch(setPlanLoading(false));
  }
};
