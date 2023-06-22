import './modal.scss'
import Filters from '../filters/Filters'

const Modal = ({modal, setModal, setBackground, back}) => {
  return (
    <div className={modal ? 'modal active' : 'modal'} onClick={() => setModal(false)}>
        <div className={modal ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
            <Filters setBackground={setBackground} back={back} setModal={setModal}/>
        </div>
    </div>
  )
}

export default Modal