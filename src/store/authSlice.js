import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    studentloginstatus: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        studentlogin: (state, action) => {
            state.status = true;
            state.studentloginstatus = true;
            state.userData = action.payload.userData;
        },
        studentlogout: (state) => {
            state.status = false;
            state.studentloginstatus = false;
            state.userData = null;
        }
     }
})

export const {login, logout, studentlogin, studentlogout} = authSlice.actions;

export default authSlice.reducer;