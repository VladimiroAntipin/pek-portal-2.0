import styles from './styles.module.css';

const SidebarOverlay = ({showSidebar, onClose}) => {
    const className = showSidebar ? styles.overlayActive : styles.overlay;

    return (
        <div className={className} onClick={onClose} />
    );
}

export default SidebarOverlay;