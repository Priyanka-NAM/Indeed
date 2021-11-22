import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk"
import { signUpReducer } from "./Reducers/SignupReducer";
import { loginReducer } from "./Reducers/LoginReducer";

const rootReducer = combineReducers({
    signup: signUpReducer,
    login: loginReducer
})

const createComposer  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer,createComposer(applyMiddleware(thunk)))
