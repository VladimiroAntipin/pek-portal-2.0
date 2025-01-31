import styles from './styles.module.css';

const Input = ({ value, onChange, labelDescription }) => {

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{labelDescription}:</label>
            <input
                type="text"
                className={styles.input}
                value={value}
                onChange={(e) => onChange(e)}
                autoComplete='off' />
        </div>
    );
}

export default Input;