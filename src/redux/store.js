import { configureStore } from '@reduxjs/toolkit'
import tabReducer from './reducer/tabReducer'

export const store = configureStore({
  reducer: {
    route: tabReducer,
  },
})