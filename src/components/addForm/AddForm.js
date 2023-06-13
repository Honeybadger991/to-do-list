import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";
import { todoCreated } from "../todoList/todoSlice";
import './addForm.scss'

const TodoAddForm = () => {
    const [todoName, setTodoName] = useState('')
    const [todoColor, setTodoColor] = useState('')

    const {request} = useHttp();
    const dispatch = useDispatch();

    const filters = useSelector(state => state.filters.filters)

    const renderOptions = (arr) => {
        if(filters && filters.length > 0 ) {
            return arr.map(({id, name}) => {
                const color = {color: `${name}`}
                return <option key={id} className="content__add-option" value={name} style={color}>{name}</option>
            })
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const todo = {
            id: nanoid(),
            name: todoName,
            color: todoColor
        }
        
        request('http://localhost:3001/todos','POST', JSON.stringify(todo))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(dispatch(todoCreated({...todo, isEdit: false})))
            .catch(err => console.log(err))

        setTodoName('')
        setTodoColor('')
    }


    const selectStyle = todoColor !== "noColor" ? {color: `${todoColor}`} : {color: 'black'};
    const options = renderOptions(filters);


    return (
        <form className="content__add-form" onSubmit={onSubmitHandler}>
            <input
            className="content__add-input"
            name="taskName"
            type="text"
            id="taskName"
            required
            placeholder="what we'll need to do?"
            value={todoName}
            onChange={e => setTodoName(e.target.value)}
            />
            <select 
            className="content__add-select"
            name="taskColor"
            id="taskColor"
            value={todoColor}
            style={selectStyle}
            onChange={e => setTodoColor(e.target.value)}>
            <option className="content__add-mark" value="noColor">no color</option>
            {options}
            </select>
            <button 
            type="submit"
            className="content__add-btn btn"
            >ADD</button>
        </form>
    )

}
export default TodoAddForm