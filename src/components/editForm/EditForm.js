import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { todoEdited } from "../todoList/todoSlice";
import '../addForm/addForm.scss'

const EditForm = ({name, color, id}) => {
    const [editedName, setEditedName] = useState(name)
    const [editedColor, setEditedColor] = useState(color)

    const {request} = useHttp();
    const dispatch = useDispatch();

    const filters = useSelector(state => state.filters.filters)

    const renderOptions = (arr) => {
        if(filters && filters.length > 0 ) {
            return arr.map(({id, name}) => {
                const color = {color: `${name}`}
                return  <option key={id} className="content__add-option" value={name} style={color}>{name}</option>
            })
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const todo = {
            id: id,
            name: editedName,
            color: editedColor,
            isEdit: false
        }
        
        request(`http://localhost:3001/todos/${id}`,'PUT', JSON.stringify(todo))
            .then(res => console.log(res, 'updated'))
            .then(dispatch(todoEdited({id, todo})))
            .catch(err => console.log(err))

        setEditedName('')
        setEditedColor('')
    }


    const selectStyle = editedColor !== "noColor" ? {color: `${editedColor}`} : {color: 'black'};
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
            value={editedName}
            onChange={e => setEditedName(e.target.value)}
            />
            <select 
            className="content__add-select"
            name="taskColor"
            id="taskColor"
            value={editedColor}
            style={selectStyle}
            onChange={e => setEditedColor(e.target.value)}>
            <option className="content__add-mark" value="noColor">no color</option>
            {options}
            </select>
            <button 
            type="submit"
            className="content__add-btn btn"
            >EDIT</button>
        </form>
    )

}

export default EditForm