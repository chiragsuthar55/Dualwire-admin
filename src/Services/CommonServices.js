import { getShortNumber } from "Helper/Common";
import { renderMsg } from "Helper/Common";
import { setDashboardChartData } from "Store/Reducers/CommonSlice";
import { setDashboardUserChartData } from "Store/Reducers/CommonSlice";
import { setRafflesLoading } from "Store/Reducers/CommonSlice";
import { setDashboardSpentChartData } from "Store/Reducers/CommonSlice";
import { setDashboardRafflesChartData } from "Store/Reducers/CommonSlice";
import { setLoading } from "Store/Reducers/CommonSlice";
import axios from "axios";
import { toast } from "react-toastify";

/**
 * @desc  Upload File
 */
export const uploadFile = (file) => async (dispatch) => {
  try {
    if (file) {
      dispatch(setLoading(true));

      let body = new FormData();
      body.append("file", file);
      const headers = { "Content-Type": "multipart/form-data" };

      const response = await axios.post(`/upload`, body, {
        headers: headers,
      });
      const { data } = response.data;
      if (data) return data?.file;
    }
  } catch (e) {
    toast.error(renderMsg(e) || "Unable to upload");
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * @desc  Get Dashboard Chart Data
 * @payload  type => raffle , user, earn, duration => 1 - weekly, 2 - monthly, 3 - yearly
 */
export const getDashboardChartData =
  (duration = 1, type = "raffle") =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.get(
        `/admin/dashboard?bar_chart=${duration}&type=${type}`
      );
      const { success, data } = response.data;
      if (success) {
        if (type === "raffle") {
          const updated = {
            ...data,
            x: data?.bar_chart?.raffle?.map((y) => y?.x),
            y: data?.bar_chart?.raffle?.map((y) => y?.y),
            z: data?.bar_chart?.raffle?.map((y) => Number(y?.z)),
          };
          dispatch(setDashboardRafflesChartData(updated));
        } else if (type === "user") {
          dispatch(setDashboardUserChartData(data));
        } else {
          const updated = {
            ...data,
            x: data?.raffle?.earn?.map((y) => y?.x),
            y: data?.raffle?.earn?.map((y) => y?.y),
          };

          const total = updated?.y?.reduce((acc, val) => acc + val);
          updated.totalBilled = total ? getShortNumber(total) : total;
          dispatch(setDashboardSpentChartData(updated));
        }
        return true;
      } else return false;
    } catch (e) {
      toast.error(renderMsg(e));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };
