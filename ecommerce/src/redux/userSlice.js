 
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    _id: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            const { _id, firstName, lastName, email } = action.payload.data;
            state._id = _id;
            state.firstName = firstName;
            state.lastName = lastName;
            state.email = email;
        },

        logoutRedux: (state, action) => {
            state._id = "";
            state.firstName = "";
            state.lastName = "";
            state.email = "";
        },
    },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;
