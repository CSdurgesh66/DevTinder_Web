import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectioReducer from '../Slices/ConnectionSlice';
import requestReducer from '../Slices/RequestSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connection: connectioReducer,
        request: requestReducer,
    }
})

export default appStore;