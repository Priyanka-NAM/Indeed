import {
  EMPLOYER_JOB_POST,
  EMPLOYER_JOB_ERROR,
  EMPLOYER_ALL_JOBS,
  EMPLOYER_ALL_JOBS_ERROR,
} from "../Constants/UserConstants";

import Axios from "axios";
import { API } from "../../config";

export const employerJobPost = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const newdata = { ...data, employerID: "61a07e89e5d016c47d56338a" };
  console.log("data", newdata);
  Axios.post(`${API}/employer/post-job`, newdata, config)
    .then((response) => {
      dispatch({
        type: EMPLOYER_JOB_POST,
        payload: response.data,
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

export const employerAllJob =
  (employerID, page, limit, isfirst) => (dispatch) => {
    // const { employerID } = JSON.parse(localStorage.getItem("user"));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // const newdata = { ...data, employerID: "61a07e89e5d016c47d56338a" };
    console.log("data", employerID);
    console.log(isfirst);
    let url = `${API}/employer/jobs-posted/${employerID}`;
    if (page && limit) {
      url = url + `?page=${page}&limit=${limit}`;
      console.log(url);
    }

    Axios.get(url, config)
      .then((response) => {
        dispatch({
          type: EMPLOYER_ALL_JOBS,
          payload: response.data,
        });
        if (isfirst) {
          dispatch({
            type: "EMPLOYER_JOB_LENGTH",
            payload: response.data.length,
          });
        }
      })
      .catch((error) => {
        console.log("Error from backend", error);
        dispatch({
          type: EMPLOYER_ALL_JOBS_ERROR,
          payload: error,
        });
      });
  };
