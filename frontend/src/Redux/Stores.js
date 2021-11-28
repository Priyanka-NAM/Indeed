import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { signUpReducer } from "./Reducers/SignupReducer";
import { loginReducer } from "./Reducers/LoginReducer";
import {
  CompanyDetailsReducer,
  CompanyListReviewReducer,
} from "./Reducers/CompanyReducer";
import { companyReviewReducer } from "./Reducers/CompanyReviewReducer";
import { TopCompanyListReviewReducer,TopCompanyListRatingReducer,TopAcceptedJobSeekerReducer } from './Reducers/AdminReducers';
import { jobReducer } from "./Reducers/JobReducer";
import { JOBSEEKER_LOGOUT } from "./Constants/UserConstants";
import { employerJobPostingReducer } from "./Reducers/EmployerJobPostingReducer";
import { employerJobsReducer } from "./Reducers/EmployerJobsReducer";

const appReducer = combineReducers({
  signup: signUpReducer,
  login: loginReducer,
  jobs: jobReducer,
  companyReview: companyReviewReducer,
  companyDetails: CompanyDetailsReducer,
  companyReviewList: CompanyListReviewReducer,
  TopReviewedCompanies:TopCompanyListReviewReducer,
  TopRatingCompanies: TopCompanyListRatingReducer,
  TopAcceptedJobseekers: TopAcceptedJobSeekerReducer,
  employerJobPosting: employerJobPostingReducer,
  employerJobs: employerJobsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === JOBSEEKER_LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk))
);
