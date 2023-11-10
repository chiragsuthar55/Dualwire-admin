import { formattedDateWithTime } from "Helper/Common";
import { renderMsg } from "Helper/Common";
import { setPlans } from "Store/Reducers/PlanSlice";
import { setRafflesList } from "Store/Reducers/PlanSlice";
import { setSubscriptionsList } from "Store/Reducers/PlanSlice";
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
        let updated = data?.map((x) => {
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

/**
 * @desc  Get Subscriptions List
 */
export const getSubscriptionsList =
  (page = 1, per_page = 50, from_date = "", to_date = "", search = "") =>
  async (dispatch) => {
    try {
      if (page) {
        dispatch(setPlanLoading(true));
        const response = await axios.get(
          `/admin/get_subscription?page=${page}&per_page=${per_page}&from_date=${from_date}&to_date=${to_date}&search=${search}`
        );

        const { success, data, message } = response.data;

        if (success) {
          const updated = {
            ...data,
            records: data?.records?.map((x) => {
              return {
                ...x,
                statusStr: x?.status === "canceled" ? 2 : 1,
                amount: `${x?.amount} ${x?.paid_amount_currency}`,
                recipient: `${x?.first_name} ${x?.last_name}`,
                plan_period_start: formattedDateWithTime(x?.plan_period_start),
                plan_period_end: formattedDateWithTime(x?.plan_period_end),
              };
            }),
          };
          dispatch(setSubscriptionsList(updated));
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
 * @desc  Get Raffles List
 */
export const getRafflesList =
  (page = 1, per_page = 10, sort = 1) =>
  async (dispatch) => {
    try {
      if (page) {
        dispatch(setPlanLoading(true));

        const response = await axios.get(
          `/admin/get_raffles?page=${page}&sort=${sort}&per_page=${per_page}`
        );

        const { success, data, message } = response.data;

        if (success) {
          // const updated = {
          //   ...data,
          //   records: data?.records?.map((x) => {
          //     return {
          //       ...x,
          //     };
          //   }),
          // };
          dispatch(setRafflesList(data));
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
