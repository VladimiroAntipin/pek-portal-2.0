import styles from './styles.module.css';
import Search from '../../images/blueSearch.svg';
import News from '../../images/blueNews.svg';
import User from '../../images/blueUser.svg';
import TV from '../../images/blueTv.svg';
import Cart from '../../images/blueCart.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
 
const BottomNav = () => {
    const [isLinkActive, setIsLinkActive] = useState({
        search: false,
        news: false,
        user: false,
        tv: false,
        cart: false,
    });

    const handleClick = (link) => {
        setIsLinkActive((prev) => {
            return Object.keys(prev).reduce((acc, key) => {
                acc[key] = key === link ? true : false;
                return acc;
            }, {});
        });
    };

    return ( 
        <div className={styles.bottomNav}>
            <div className={styles.bottomNavContent}>
                <Link className={`${styles.bottomNavItem} ${isLinkActive.search ? styles.bottomNavItemActive : ''}`} to={'/home'} onClick={() => handleClick('search')}>
                    <img className={styles.bottomNavItemIcon} src={Search} alt="Пойск" />
                    <p className={styles.bottomNavItemText}>Пойск</p>
                </Link>

                <Link className={`${styles.bottomNavItem} ${isLinkActive.news ? styles.bottomNavItemActive : ''}`} to={'/home'} onClick={() => handleClick('news')}>
                    <img className={styles.bottomNavItemIcon} src={News} alt="Новости" />
                    <p className={styles.bottomNavItemText}>Hовости</p>
                </Link>

                <Link className={`${styles.bottomNavItem} ${isLinkActive.user ? styles.bottomNavItemActive : ''}`} to={'/home'} onClick={() => handleClick('user')}>
                    <img className={styles.bottomNavItemIcon} src={User} alt="Профиль" />
                    <p className={styles.bottomNavItemText}>Профиль</p>
                </Link>

                <Link className={`${styles.bottomNavItem} ${isLinkActive.tv ? styles.bottomNavItemActive : ''}`} to={'/home'} onClick={() => handleClick('tv')}>
                    <img className={styles.bottomNavItemIcon} src={TV} alt="ТВ" />
                    <p className={styles.bottomNavItemText}>ТВ</p>
                </Link>

                <Link className={`${styles.bottomNavItem} ${isLinkActive.cart ? styles.bottomNavItemActive : ''}`} to={'/home'} onClick={() => handleClick('cart')}>
                    <img className={styles.bottomNavItemIcon} src={Cart} alt="Корзина" />
                    <p className={styles.bottomNavItemText}>Корзина</p>
                </Link>

            </div>
        </div>
     );
}
 
export default BottomNav;