import styles from './styles.module.css';

const FormButtons = ({ buttonDescription, isDisabled }) => {
    return (
        <div className={styles.buttonsContainer}>
            <button type='submit' className={`${styles.button} ${isDisabled ? styles.disabled : ''}`}>{buttonDescription.blue}</button>
            <button type='button' className={styles.button}>{buttonDescription.red}</button>
        </div>);
}

export default FormButtons;