import { combineReducers } from "redux";
import {todoReducer} from "./reducers/todoReducer/todoReducer";

export const rootReducer = combineReducers({
    todoReducer,
});
