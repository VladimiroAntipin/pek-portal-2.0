import styles from './styles.module.css';

const Overlay = ({isActive, onClick}) => {
    return ( 
        <div onClick={onClick} className={isActive ? styles.overlayActive : styles.overlay}></div>
     );
}
 
export default Overlay;