import styles from './style.module.css';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/input';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import FormButtons from '../../components/FormButtons/FormButtons';
import { useState, useEffect } from 'react';

const RegisterPage = () => {
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [patronimic, setPatronimic] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const labelDescription = {
        name: 'Имя',
        surname: 'Фамилия',
        patronimic: 'Отчество',
        email: 'Электронная почта',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
    }

    const buttonDescription = {
        blue: 'Зарегистрироваться',
        red: 'Войти'
    }

    const validateSurname = (surname) => {
        if (!surname) {
            setSurnameError('Поле "Фамилия" не может быть пустым');
        } else {
            setSurnameError('');
        }
    }

    const handleSurnameChange = (e) => {
        setSurname(e.target.value);
        validateSurname(e.target.value);
    }

    const validateName = (name) => {
        if (!name) {
            setNameError('Поле "Имя" не может быть пустым');
        } else {
            setNameError('');
        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
        validateName(e.target.value);
    }

    const handlePatronimicChange = (e) => {
        setPatronimic(e.target.value);
    }

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            return 'Поле электронной почты не может быть пустым';
        } else if (!emailRegex.test(email)) {
            return 'Не валидный формат Email';
        } else {
            return '';
        }
    }

    const handleEmailChange = (event) => {
        const email = event.target.value;
        setEmail(email);
        const error = validateEmail(email);
        setEmailError(error);
    }

    const validatePassword = (password) => {
        const passwordRegex = /.{4,}/;
        if (!password) {
            return 'Поле пароля не может быть пустым';
        } else if (!passwordRegex.test(password)) {
            return 'Пароль должен быть длиной не менее 4 симболов';
        }
        else {
            return '';
        }
    };

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setPassword(password);
        const passwordError = validatePassword(password);
        const confirmPasswordError = validatePasswordMatch(password, confirmPassword);
        setPasswordError(passwordError);
        setConfirmPasswordError(confirmPasswordError);
    }

    const validatePasswordMatch = (password, confirmPassword) => {
        if (!confirmPassword) {
            return 'Поле подтверждения пароля не может быть пустым';
        } else if (password !== confirmPassword) {
            return 'Пароли не совпадают';
        }
        return '';
    };

    const handleConfirmPasswordChange = (event) => {
        const confirmPassword = event.target.value;
        setConfirmPassword(confirmPassword);
        const error = validatePasswordMatch(password, confirmPassword);
        setConfirmPasswordError(error);
    }

    useEffect(() => {
        setIsDisabled(surnameError !== '' || nameError !== '' || emailError !== '' || passwordError !== '' || confirmPasswordError !== '' || surname === '' || name === '' || email === '' || password === '' || confirmPassword === '');
    }, [surname, name, email, password, confirmPassword, surnameError, nameError, emailError, passwordError, confirmPasswordError]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: send the request to the server to register
    }

    return (
        <div className={styles.registerPage}>
            <FormWrapper>
                <Form onSubmit={handleSubmit} >
                    <Input value={surname} labelDescription={labelDescription.surname} onChange={handleSurnameChange} />
                    {surnameError && <span className={styles.inputError}>{surnameError}</span>}
                    <Input value={name} labelDescription={labelDescription.name} onChange={handleNameChange} />
                    {nameError && <span className={styles.inputError}>{nameError}</span>}
                    <Input value={patronimic} labelDescription={labelDescription.patronimic} onChange={handlePatronimicChange} />

                    <Input value={email} labelDescription={labelDescription.email} onChange={handleEmailChange} />
                    {emailError && <span className={styles.inputError}>{emailError}</span>}

                    <PasswordInput value={password} labelDescription={labelDescription.password} onChange={handlePasswordChange} />
                    {passwordError && <span className={styles.inputError}>{passwordError}</span>}
                    <PasswordInput value={confirmPassword} labelDescription={labelDescription.confirmPassword} onChange={handleConfirmPasswordChange} />
                    {confirmPasswordError && <span className={styles.inputError}>{confirmPasswordError}</span>}

                    <FormButtons buttonDescription={buttonDescription} isDisabled={isDisabled} />
                </Form>
            </FormWrapper>
        </div>
    );
}

export default RegisterPage;