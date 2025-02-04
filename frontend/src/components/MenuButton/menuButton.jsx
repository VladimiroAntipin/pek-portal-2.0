import styles from './styles.module.css';

const MenuButton = ({toggleSidebar, showSidebar}) => {
    const hambClass = styles.hamburger + (showSidebar ? ' ' + styles.active : '');

    return (
        <div className={hambClass} onClick={toggleSidebar}>
            <span className={styles.hamburgerline}></span>
            <span className={styles.hamburgerline}></span>
            <span className={styles.hamburgerline}></span>
        </div>
    );
}

export default MenuButton;