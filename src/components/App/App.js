import { useState, useEffect } from 'react';
import './app.scss';
import TodoAddForm from '../addForm/AddForm';
import TodoList from '../todoList/TodoList';
import Filters from '../filters/Filters';
import Modal from '../modal/Modal';
import img from '../../assets/bg_green.jpg';



const App = () => {

    const [background, setBackground] = useState();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        let b = localStorage.getItem('bg') || img;
        setBackground(b)
    }, [background])

    
    return (
        <main className='app' style={{backgroundImage: `url(${background})`}}>
            <div className='content'>
                <div className='content__main'>
                    <TodoAddForm/>
                    <TodoList modal={modal} setModal={setModal}/>
                    <Modal modal={modal} setModal={setModal} setBackground={setBackground} back={background}/>
                </div>
                <div className='content__sidepanel'>
                    <Filters setBackground={setBackground} back={background} setModal={setModal}/>
                </div>
            </div>
        </main>
    )
}

export default App;