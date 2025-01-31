import styles from './styles.module.css';

const Overlay = ({showSidebar, toggleSidebar}) => {
    return ( 
        <div className={showSidebar ? styles.overlayActive : styles.overlay}></div>
     );
}
 
export default Overlay;