import styles from './styles.module.css';
import logo from '../../images/pek_logo.svg';

const Form = ({ children }) => {

    return (
        <form className={styles.form}>
            <img src={logo} alt="logo" className={styles.logo} />
            {children}
        </form>
    );
}

export default Form;