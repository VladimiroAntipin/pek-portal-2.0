import styles from './styles.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const FormButtons = ({ buttonDescription, isDisabled }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleButtonClick = () => {
        if(location.pathname === '/login') {
            navigate('/register');
        } else if (location.pathname === '/register') {
            navigate('/login');
        }
    }
    return (
        <div className={styles.buttonsContainer}>
            <button type='submit' className={`${styles.button} ${isDisabled ? styles.disabled : ''}`} >{buttonDescription.blue}</button>
            <button type='button' className={styles.button} onClick={handleButtonClick}>{buttonDescription.red}</button>
        </div>);
}

export default FormButtons;