import {
  EMPLOYER_JOB_POST,
  EMPLOYER_JOB_ERROR,
} from "../Constants/UserConstants";

const initialState = {
  responseFromServer: null,
  errorResponse: null,
  jobTitle: "",
  companyName: "",
  industry: "",
  jobLocation: { address: "", city: "", state: "", country: "", zipcode: "" },
  jobType: "Full-Time",
  isRemote: false,
  salary: "",
  jobDescription: {
    compensation: "",
    requirement: "",
    moreInfo: "",
    responsibilites: "",
  },
};

export const employerJobPostingReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYER_JOB_POST:
      return {
        ...state,
        responseFromServer: action.payload,
      };
    case EMPLOYER_JOB_ERROR:
      return {
        ...state,
        errorResponse: action.payload,
      };

    default:
      return state;
  }
};
