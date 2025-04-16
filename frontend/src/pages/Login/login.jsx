'use client'

import Form from '../../components/Form/Form';
import FormButtons from '../../components/FormButtons/FormButtons';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import styles from './styles.module.css';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import Input from '../../components/Input/input';
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/inputsValidation';
import { useAuth } from '../../context/authContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const { login } = useAuth();
    const navigate = useNavigate();

    const labelDescription = {
        email: 'Электронная почта',
        password: 'Пароль'
    }

    const buttonDescription = {
        blue: 'Войти',
        red: 'Зарегистрироваться'
    }

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        const setError = field === 'email' ? setEmailError : setPasswordError;
        const setValue = field === 'email' ? setEmail : setPassword;
        const validate = field === 'email' ? validateEmail : validatePassword;

        setValue(value);
        const error = validate(value);
        setError(error);

        if (value !== '') {
            if (field === 'email') {
                setPasswordError('');
            } else {
                setEmailError('');
            }
        }
    }

    useEffect(() => {
        setIsDisabled(emailError !== '' || passwordError !== '' || email === '' || password === '');
    }, [emailError, passwordError, email, password]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailValidationError = validateEmail(email);
        const passwordValidationError = validatePassword(password);

        setEmailError(emailValidationError);
        setPasswordError(passwordValidationError);

        try {
            await login(email, password);
            navigate('/feed');

        } catch (error) {
            if (error.response && error.response.status === 404) {
                setEmailError('Неправильный логин или пароль');
                setPasswordError('Неправильный логин или пароль');
            }
        }
    };

    return (
        <div className={styles.loginPage}>
            <FormWrapper>
                <Form onSubmit={handleSubmit}>
                    <Input
                        value={email}
                        onChange={(e) => handleInputChange(e, 'email')}
                        labelDescription={labelDescription.email} />
                    {emailError && <span className={styles.inputError}>{emailError}</span>}
                    <PasswordInput
                        value={password}
                        onChange={(e) => handleInputChange(e, 'password')}
                        labelDescription={labelDescription.password} />
                    {passwordError && <span className={styles.inputError}>{passwordError}</span>}
                    <FormButtons buttonDescription={buttonDescription} isDisabled={isDisabled} />
                </Form>
            </FormWrapper>
        </div>
    );
}

export default LoginPage;