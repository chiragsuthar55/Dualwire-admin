import { renderMsg } from "Helper/Common";
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
