import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequest: (state, action) => {
            return action.payload;
        },
        removeRequest: (state, action) => {
            const newArray = state.filter((r) => r._id !== action.payload);
            return newArray;
        }
    }
});


export const { addRequest, removeRequest } = connectionSlice.actions;

export default connectionSlice.reducer;