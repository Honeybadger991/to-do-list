import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook"

const initialState = {
    filters: [],
    filtersStatus: 'idle',
    order:'Newest',
    activeFilters:[]
};

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request('http://localhost:3001/filters')
    }
)

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersCreated: (state, action) => {state.filters.push(action.payload)},
        activeFilterAdded: (state, action) => {state.activeFilters.push(action.payload)},
        activeFilterRemoved: (state, action) => {state.activeFilters = state.activeFilters.filter(item => item !== action.payload)},
        activeFiltersCleared: (state) => {state.activeFilters = []},
        orderChanged: (state) => {state.order = state.order === 'Newest' ? 'Oldest' : 'Newest'},
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state,action) => {
                    state.filtersStatus = 'idle';
                    state.filters = action.payload
                })
            .addCase(fetchFilters.rejected, state => {state.filtersStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {reducer, actions} = filterSlice;

export default reducer;

export const {filtersCreated, activeFilterAdded, activeFilterRemoved, activeFiltersCleared, orderChanged} = actions;