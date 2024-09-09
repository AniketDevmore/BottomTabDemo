import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isRecentFocused: false,
    isAllExpenseFocused: false
}

export const accessPermissionReducer = createSlice({
    name: 'Route',
    initialState,
    reducers: {
        SET_RECENT_FOCUSED: (state, action) => {
            state.isRecentFocused = action.payload
        },
        SET_ALL_EXPENSE_FOCUSED: (state, action) => {
            state.isRecentFocused = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { SET_RECENT_FOCUSED, SET_ALL_EXPENSE_FOCUSED } = accessPermissionReducer.actions

export default accessPermissionReducer.reducer