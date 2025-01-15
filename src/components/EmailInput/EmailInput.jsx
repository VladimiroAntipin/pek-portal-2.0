import styles from './style.module.css';

const EmailInput = ({value, onChange}) => {

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>Электронная почта:</label>
            <input type="text" className={styles.input} value={value} onChange={(e) => onChange(e)} />
        </div>
    );
}

export default EmailInput;