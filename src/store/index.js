import { configureStore } from "@reduxjs/toolkit";
import editSlice from "./edit-slice";

const store = configureStore({
    reducer: {
        edit: editSlice.reducer,
      },
    });
    
    export default store;
