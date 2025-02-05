import styles from './styles.module.css';
import Overlay from '../Overlay/overlay';

const Modal = ({isActive, onRefuse, onAccept, onOverlayClick}) => {
    return (
        <>
            <Overlay isActive={isActive} onClick={onOverlayClick} />
            <div className={isActive ? styles.modalActive : styles.modal}>
                <p className={styles.modalText}>
                    Вы уверены что хотите выйти?
                </p>
                <div className={styles.modalButtonsContainer}>
                    <button className={styles.button} onClick={onAccept}>Да</button>
                    <button className={styles.button} onClick={onRefuse}>Нет</button>
                </div>
            </div>
        </>
    );
}

export default Modal;