import styles from './styles.module.css';
import DeliveryGuy from '../../images/404.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import Logo from  '../../images/pek_logo.svg';

const NotFound = () => {
    const {isAuthenticated} = useAuth();

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={DeliveryGuy} alt="404" />
            </div>
            <div className={styles.content}>
                <img className={styles.logo} src={Logo} alt='logo' /> 
                <div className={styles.textContainer}>
                    <h1 className={styles.errorCode}>Ошибка 404</h1>
                    <p className={styles.errorMessage}>Страница не найдена</p>
                </div>

                <Link className={styles.link} to={isAuthenticated ? '/feed' : '/login'}>{isAuthenticated ? 'На главную' : 'Войти'}</Link>
            </div>
        </div>
    );
}

export default NotFound;