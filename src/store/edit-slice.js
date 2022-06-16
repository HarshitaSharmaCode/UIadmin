import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
    name: 'edit',
    initialState: { editIsVisible: false },
    reducers: {
        toggle(state){
            state.editIsVisible = !state.editIsVisible;
        }
    } 
});

export const editActions = editSlice.actions;

export default editSlice;