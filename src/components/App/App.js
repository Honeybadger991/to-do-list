import { useState, useEffect } from 'react';
import './app.scss';
import TodoAddForm from '../addForm/AddForm';
import TodoList from '../todoList/TodoList';
import Filters from '../filters/Filters';
import img from '../../assets/bg_green.jpg';



const App = () => {

    const [background, setBackground] = useState()

    useEffect(() => {
        let b = localStorage.getItem('bg') || img;
        setBackground(b)
    }, [background])

    
    return (
        <main className='app' style={{backgroundImage: `url(${background})`}}>
            <div className='content'>
                <div className='content__main'>
                    <TodoAddForm/>
                    <TodoList/>
                </div>
                <div className='content__sidepanel'>
                    <Filters setBackground={setBackground} back={background}/>
                </div>
            </div>
        </main>
    )
}

export default App;