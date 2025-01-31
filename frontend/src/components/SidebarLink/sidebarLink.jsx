import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import Arrow from '../../images/arrow.svg';
import BlueArrow from '../../images/blueArrow.svg';
import { useState, useLayoutEffect } from 'react';

const SidebarLink = ({
    icon,
    text,
    to = '#',
    hasDropdown = false,
    dropdownLinks = [],
    isDropdownVisible = false,
    onToggleDropdown,
    onClick,
    children
}) => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 800);

    useLayoutEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 800);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <li className={styles.linkItem}>
            <Link
                className={`${styles.link} ${isDropdownVisible ? styles.linkActive : ''}`}
                to={to}
                onClick={(event) => {
                    if (onToggleDropdown) {
                        onToggleDropdown(event)
                    }
                    if (onClick) {
                        onClick(event);
                    }
                }}>
                <div className={styles.linkWrapper}>
                    <img className={styles.linkIcon} src={icon} alt={text} />
                    <p className={styles.linkText}>{text}</p>
                </div>
                {hasDropdown && <img className={styles.arrow} src={isLargeScreen ? BlueArrow : Arrow} alt="arrow" />}
            </Link>

            {hasDropdown && (
                <div className={`${isDropdownVisible ? styles.dropdownVisible : styles.dropdown}`}>
                    {dropdownLinks.map((link, index) => (
                        <Link key={index} to={link.to} className={styles.dropdownLink}>{link.text}</Link>
                    ))}
                    {children}
                </div>
            )}
            {children && !hasDropdown && (
                <ul>
                    {children}
                </ul>
            )}
        </li>
    );
};

export default SidebarLink;