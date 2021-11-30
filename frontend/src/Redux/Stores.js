import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { signUpReducer } from "./Reducers/SignupReducer";
import { loginReducer } from "./Reducers/LoginReducer";
import {
  CompanyDetailsReducer,
  CompanyListReviewReducer,
  UpdateReviewStatusReducer,
  UpdateHelpfulCountReducer,
} from "./Reducers/CompanyReducer";
import { companyReviewReducer } from "./Reducers/CompanyReviewReducer";
import { TopCompanyListReviewReducer,TopCompanyListRatingReducer,TopAcceptedJobSeekerReducer,
  getAllReviewsReducer,getTopRatedCeosReducer, getAllCompaniesReducer } from './Reducers/AdminReducers';
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
  AdminAllReviews: getAllReviewsReducer,
  TopRatedCeos: getTopRatedCeosReducer,
  AdminListAllCompanies: getAllCompaniesReducer,
  UpdateReviewStatus: UpdateReviewStatusReducer,
  UpdateHelpfulCount: UpdateHelpfulCountReducer,
});

// const rootReducer = (state, action) => {
//   //   if (action.type === JOBSEEKER_LOGOUT) {
//   //     /state = undefined;
//   //   }
//   return appReducer(state, action);
// };


const customerSignInfoFromStorage = localStorage.getItem('login')
  ? JSON.parse(localStorage.getItem('login'))
  : {
    isAuth: false,
    userDetails: {},
    errorResponse: null,
    accErr: false,
  };


const initialState = {
  login:  customerSignInfoFromStorage ,
};
const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  appReducer,
  initialState,
   createComposer(applyMiddleware(thunk))
);
