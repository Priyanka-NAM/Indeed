import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { signUpReducer } from "./Reducers/SignupReducer";
import { loginReducer } from "./Reducers/LoginReducer";
import {
  CompanyDetailsReducer,
  CompanyListReviewReducer,
} from "./Reducers/CompanyReducer";
import { companyReviewReducer } from "./Reducers/CompanyReviewReducer";
<<<<<<< HEAD
import {
  TopCompanyListReviewReducer,
  TopCompanyListRatingReducer,
  TopAcceptedJobSeekerReducer,
} from "./Reducers/AdminReducers";
=======
import { TopCompanyListReviewReducer,TopCompanyListRatingReducer,TopAcceptedJobSeekerReducer,
  getAllReviewsReducer,getTopRatedCeosReducer } from './Reducers/AdminReducers';
>>>>>>> 67dee5575cae15a30b00825f5df27b4eaab43ec2
import { jobReducer } from "./Reducers/JobReducer";
import { JOBSEEKER_LOGOUT } from "./Constants/UserConstants";
import { employerJobPostingReducer } from "./Reducers/EmployerJobPostingReducer";
import { employerJobsReducer } from "./Reducers/EmployerJobsReducer";
import { employerDetailsReducer } from "./Reducers/EmployerDetailsReducer";

const appReducer = combineReducers({
  signup: signUpReducer,
  login: loginReducer,
  jobs: jobReducer,
  companyReview: companyReviewReducer,
  companyDetails: CompanyDetailsReducer,
  companyReviewList: CompanyListReviewReducer,
  TopReviewedCompanies: TopCompanyListReviewReducer,
  TopRatingCompanies: TopCompanyListRatingReducer,
  TopAcceptedJobseekers: TopAcceptedJobSeekerReducer,
  employerJobPosting: employerJobPostingReducer,
  employerJobs: employerJobsReducer,
  employerDetails: employerDetailsReducer,
  AdminAllReviews:getAllReviewsReducer,
  TopRatedCeos: getTopRatedCeosReducer,
});

// const rootReducer = (state, action) => {
//   //   if (action.type === JOBSEEKER_LOGOUT) {
//   //     /state = undefined;
//   //   }
//   return appReducer(state, action);
// };

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  appReducer,
  createComposer(applyMiddleware(thunk))
);
