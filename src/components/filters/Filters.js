import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFilters, activeFilterAdded, activeFilterRemoved, activeFiltersCleared, orderChanged } from "./filtersSlice";
import './filters.scss';
import svg from "../../assets/arrow-right-349-svgrepo-com.svg";
import img from '../../assets/bg_green.jpg';
import img2 from '../../assets/bg_pink.jpg';
import img3 from '../../assets/bg_dark.jpg';
import img4 from '../../assets/bg_orange.jpg'

const Filters = ({setBackground, back}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters())
    }, [])

    const filters = useSelector(state => state.filters.filters)
    const order = useSelector(state => state.filters.order)
    const activeFilters = useSelector(state => state.filters.activeFilters)

    console.log(activeFilters)

    const checkboxes = document.querySelectorAll('.content__filters-checkbox')


    
    const onChangeHandler = (e) => {
        activeFilters.find(item => item === e.target.name) ? dispatch(activeFilterRemoved(e.target.name)) :
        dispatch(activeFilterAdded(e.target.name))
    }
    const onClearFilters = () => {
        dispatch(activeFiltersCleared())
        checkboxes.forEach(item => item.checked = false)
    }
    const onToggleOrder = () => {
        dispatch(orderChanged())
    }

    const renderFilters = (arr) => {
        if(arr.length === 0) {
            return (
                <h5 className="content__filters-free">No available filters</h5>
            )
        }
        return arr.map(({id, name}) => {
            const color = {color: `${name}`}
            return (
                <li key={id}>
                    <label className="content__filters-item">
                        <input type="checkbox" className="content__filters-checkbox" id={`${id}-check`} name={name} onChange={onChangeHandler}/>
                        <span className="content__filters-name" style={color}>{name}</span>
                    </label>
                </li>
            )
        })
    }


    const elements = renderFilters(filters)
    const background = () => {
        let b = back === img ? img2 : back === img2 ? img3 : back === img3 ? img4 : img
        localStorage.setItem('bg', b)
        return b
    }

    return (
        <div className="content__filters-wrapper">
            <h5 className="content__filters-subtitle">Filter your tasks</h5>
            <div className="content__filters-top">
                <ul className="content__filters-list">
                    {elements}
                    <label className="content__filters-item">
                        <input type="checkbox" className="content__filters-checkbox" id={'noColor-check'} name='noColor' onChange={onChangeHandler}/>
                        <span className="content__filters-name">no color</span>
                    </label>
                </ul>
                <button className="content__filters-clear btn" onClick={onClearFilters}>Clear filters</button>
            </div>
            <div className="content__filters-mid">
                <button className="content__filters-date btn" onClick={onToggleOrder}>Change order</button>
                <img src={svg} alt="arrow" />
                <p className="content__filters-mid-text">{order} first</p>
            </div>
            <div className="content__filters-bot">
                <button className="content__filters-background btn" onClick={() => setBackground(background)}>change background</button>
            </div>
        </div>

    )

}

export default Filters