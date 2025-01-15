import styles from './style.module.css';

const Input = ({value, onChange, labelDescription}) => {

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{labelDescription}:</label>
            <input type="text" className={styles.input} value={value} onChange={(e) => onChange(e)} />
        </div>
    );
}

export default Input;