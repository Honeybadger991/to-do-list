
import './todoItem.scss'
import pencil from '../../assets/pencil-svgrepo-com.svg'

const TodoItem = ({name, color, i, onDelete, onEdit}) =>{

    const circleStyle = {background: `${color}`};
    const itemStyle = (i+1) % 2 === 0 ? {background: '#cac0cf'} : {background: '#caebe2'}

    return(
        <li className="content__list-item" style={itemStyle}>
            <span className="content__list-circle" style={circleStyle}></span>
            <p className="content__list-text">{name}</p>
            <button className="content__list-edit btn" onClick={onEdit}><img src={pencil} alt="pencil" /></button>
            <button className="content__list-close btn" aria-label="Close" onClick={onDelete}><span aria-hidden="true" className="content__list-close-x">×</span></button>
        </li>
    )
}

export default TodoItem