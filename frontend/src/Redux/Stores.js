import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk"
import { signUpReducer } from "./Reducers/JobSeeker";

const rootReducer = combineReducers({
                                        
                                        jobSeekerSignUp:signUpReducer,
                                        
                                    })
const createComposer  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer,createComposer(applyMiddleware(thunk)))
