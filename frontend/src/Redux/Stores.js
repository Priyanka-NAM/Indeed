import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { signUpReducer } from "./Reducers/SignupReducer";
import { loginReducer } from "./Reducers/LoginReducer";
import { CompanyDetailsReducer, CompanyListReviewReducer } from "./Reducers/CompanyReducer";
import { companyReviewReducer } from "./Reducers/CompanyReviewReducer";
import { jobReducer } from "./Reducers/JobReducer";
import { sendMessageReducer } from "./Reducers/MessageReducer";

const rootReducer = combineReducers({
  signup: signUpReducer,
  login: loginReducer,
  jobs: jobReducer,
  companyReview: companyReviewReducer,
  companyDetails: CompanyDetailsReducer,
  companyReviewList: CompanyListReviewReducer,
  sendMessage: sendMessageReducer

});

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk))
);
