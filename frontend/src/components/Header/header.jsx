'use client';

import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../images/pek_logo_header.svg';
import Search from '../../images/search.svg';
import Notification from '../../images/notification.svg';
import News from '../../images/news.svg';
import Tv from '../../images/tv.svg';
import User from '../../images/user.svg';
import Cart from '../../images/cart.svg';
import MenuButton from '../MenuButton/menuButton';
import Sidebar from '../Sidebar/sidebar';
import { useState } from 'react';
import SidebarOverlay from '../SidebarOverlay/sidebarOverlay';

const Header = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    const toggleSidebar = () => {
        setShowSidebar(state => !state);
    };

    return (
        <header className={styles.header}>
            <div className={styles.content} >
                <nav className={styles.navbar}>
                    <Link to="/feed" onClick={scrollToTop}>
                        <img className={styles.logo} src={Logo} alt="Logo" />
                    </Link>

                    <div className={styles.navcontainer}>
                        <ul className={styles.linkscontainer}>
                            <li className={styles.linkitem}>
                                <Link className={styles.link} to="/#" >
                                    <img src={Search} className={styles.icon} alt="search" />
                                </Link>
                            </li>
                            <li className={styles.linkitem}>
                                <Link className={styles.link} to="/#" >
                                    <img src={Notification} className={styles.icon} alt="notification" />
                                </Link>
                            </li>
                            <li className={styles.linkitem}>
                                <Link className={styles.link} to="/#" >
                                    <img src={Cart} className={styles.icon} alt="cart" />
                                </Link>
                            </li>
                            <li className={styles.linkitem}>
                                <Link className={styles.link} to="/#" >
                                    <img src={News} className={styles.icon} alt="news" />
                                </Link>
                            </li>
                            <li className={styles.linkitem}>
                                <Link className={styles.link} to="/#" >
                                    <img src={Tv} className={styles.icon} alt="tv" />
                                </Link>
                            </li>
                            <li className={styles.linkitem}>
                                <Link className={styles.link} to="/#" >
                                    <img src={User} className={styles.icon} alt="user" />
                                </Link>
                            </li>
                        </ul>

                        <MenuButton toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
                    </div>
                </nav>
            </div>
            <Sidebar showSidebar={showSidebar}/>
            <SidebarOverlay showSidebar={showSidebar} onClose={toggleSidebar} />
        </header>
    );
}

export default Header;