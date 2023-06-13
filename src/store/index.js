import { configureStore } from "@reduxjs/toolkit";
import todos from '../components/todoList/todoSlice';
import filters from '../components/filters/filtersSlice'

const store = configureStore({
    reducer:{todos, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;