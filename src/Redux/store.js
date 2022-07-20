import {configureStore} from "@reduxjs/toolkit"
import  gameSlice  from "./GameSlice/gameSlice"
export const store=configureStore({
    reducer:{
        game:gameSlice,
    }
})