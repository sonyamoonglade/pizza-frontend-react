import {createSlice} from "@reduxjs/toolkit";


interface WindowState {
    menu: boolean
}

const initialState:WindowState = {
    menu: false
}


export const windowSlice = createSlice({
    initialState,
    name:'window',
    reducers:{

        toggleMenu:(s) => {
            s.menu = !s.menu
        }

    }

})

export default windowSlice.reducer