import styles from './styles.module.css';
import { useState } from 'react';

const MenuButton = ({toggleSidebar}) => {
    const [showMenu, setShowMenu] = useState(false);

    const hambClass = styles.hamburger + (showMenu ? ' ' + styles.active : '');
    const toggleMenu = () => {
        setShowMenu(state => !state);
        toggleSidebar();
    };

    return (
        <div className={hambClass} onClick={toggleMenu}>
            <span className={styles.hamburgerline}></span>
            <span className={styles.hamburgerline}></span>
            <span className={styles.hamburgerline}></span>
        </div>
    );
}

export default MenuButton;