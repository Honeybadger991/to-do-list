
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useCallback } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { fetchTodos } from "../todoList/todoSlice";
import { useHttp } from "../../hooks/http.hook";
import TodoItem from "../todoItem/TodoItem";
import EditForm from "../editForm/EditForm";
import { todoDeleted, todoEditing} from "../todoList/todoSlice";
import './todoList.scss'

const TodoList = () => {

    const dispatch = useDispatch();
    const {request} = useHttp();


    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    const filteredTodosSelector = createSelector(
        (state) => state.todos.todos,
        (state) => state.filters.activeFilters,
        (todos, filters) => {
            if (filters.length === 0){
                return todos
            }else {
                let rez = []
                for (let i = 0; i < filters.length; i++) {
                    for (let j = 0; j < todos.length; j++) {
                        if (filters[i] === todos[j].color){
                            rez.push(todos[j])
                        }
                    }
                }
                return rez;
            }
        }
    )

    const filteredTodos = useSelector(filteredTodosSelector)
    const order = useSelector(state => state.filters.order)


    const onTodoDelete = useCallback((id) => {
        request(`http://localhost:3001/todos/${id}`, 'DELETE')
            .then(data => console.log(data, 'deleted'))
            .then(dispatch(todoDeleted(id)))
            .catch(err => console.log(err))
    }, [request])

    const onAllDelete = () => {
        filteredTodos.forEach(({id}) => onTodoDelete(id))
    }

    const onToggleEdit = (id, isEdit) =>{
        dispatch(todoEditing({id, isEdit}))
    }
    

    const renderTodos = (arr) => {
        if(arr.length === 0) {
            return (
                <h5 className="content__list-free">This list is empty, you can chill</h5>
            )
        }
        return arr.map(({id, isEdit,...props}, i) => {
            return isEdit ? (<EditForm key={id} id={id} {...props} onEdit={() => onToggleEdit(id, isEdit)}/>)
            : (<TodoItem key={id} {...props} i={i} onEdit={() => onToggleEdit(id, isEdit)} onDelete={() => onTodoDelete(id)}/> )
        })
    }


    const counter = filteredTodos.length
    const elements = order === 'Newest' ? renderTodos(filteredTodos) : renderTodos([...filteredTodos].reverse())
    const deleteStyle ={display: filteredTodos.length ? 'block' : 'none'}

    return (
        <>
            <div className="content__list-header">
                <h1 className="content__list-title">Things to do: </h1>
                <div className="content__list-counter">{counter}</div>
            </div>
            <div className="content__list-divider"></div>
            <ul className="content__list-list">
                {elements}
            </ul>
            <button className="content__list-delete btn" style={deleteStyle} onClick={onAllDelete}>Delete all</button>
        </>

    )

}

export default TodoList