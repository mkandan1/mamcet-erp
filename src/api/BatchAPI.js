import { showToast } from "../redux/actions/toastActions";
import { API } from "./API";

export class BatchAPI {
  static async createBatch(data, dispatch) {
    API.postRequest("/batch/add", data)
      .then((data) => {
        if (data.success === true) {
          dispatch(
            showToast({
              type: "success",
              text: data.message,
            })
          );
        }
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "error",
            text: err.message,
          })
        );
      });
  }
}
