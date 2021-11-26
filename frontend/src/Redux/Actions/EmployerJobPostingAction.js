import { EMPLOYER_JOB_POST, EMPLOYER_JOB_ERROR } from "../Constants/UserConstants";

import Axios from "axios";
import { API } from "../../config";

export const employerJobPost = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const newdata = { ...data, employerID: "61871538d8bcac5d00dec4a9" };
  console.log("data", newdata);
  Axios.post(`${API}/employer/post-job`, newdata, config)
    .then((response) => {
      dispatch({
        type: EMPLOYER_JOB_POST,
        payload: response.newdata,
      });
    })
    .catch((error) => {
      console.log("Error from backend", error);
      dispatch({
        type: EMPLOYER_JOB_ERROR,
        payload: error,
      });
    });
};
