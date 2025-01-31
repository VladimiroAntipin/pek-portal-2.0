import styles from './styles.module.css';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ value, onChange, labelDescription }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{labelDescription}:</label>
            <div className={styles.passwordInputWrapper}>
                <input
                    type={showPassword ? 'text' : 'password'}
                    className={styles.input}
                    value={value}
                    onChange={(e) => onChange(e)}
                    autoComplete='off' />
                <button
                    type='button'
                    className={styles.eyeIcon}
                    onClick={togglePasswordVisibility}>

                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                    
                </button>
            </div>
        </div>
    );
}

export default PasswordInput;