import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook"

const initialState = {
    todos: [],
    todosStatus: 'idle'
};

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    () => {
        const {request} = useHttp();
        return request('http://localhost:3001/todos')
    }
)

const listSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoCreated: (state, action) => {state.todos.push(action.payload)},
        todoDeleted: (state, action) => {state.todos = state.todos.filter(item => item.id !== action.payload)},
        todoEditing: (state, action) => {state.todos = state.todos.map(item => 
            {return item.id === action.payload.id ? {...item, isEdit: !action.payload.isEdit} : item})},
        todoEdited: (state, action) => {state.todos = state.todos.map(item => 
            {return item.id === action.payload.id ? action.payload.todo : item})},
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, state => {state.todosStatus = 'loading'})
            .addCase(fetchTodos.fulfilled, (state, action) => {
                    state.todosStatus = 'idle';
                    state.todos = action.payload
                })
            .addCase(fetchTodos.rejected, state => {state.todosStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {reducer, actions} = listSlice;

export default reducer;

export const {todoCreated, todoDeleted, todoEditing, todoEdited} = actions;