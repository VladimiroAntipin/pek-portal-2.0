export const validateSurname = (surname) => {
    if (!surname) {
        return 'Поле "Фамилия" не может быть пустым';
    } else {
        return '';
    }
}

export const validateName = (name) => {
    if (!name) {
        return 'Поле "Имя" не может быть пустым';
    } else {
        return '';
    }
}


export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
        return 'Поле электронной почты не может быть пустым';
    } else if (!emailRegex.test(email)) {
        return 'Не валидный формат Email';
    } else {
        return '';
    }
}

export const validatePassword = (password) => {
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

export const validatePasswordMatch = (password, confirmPassword) => {
    if (!confirmPassword) {
        return 'Поле подтверждения пароля не может быть пустым';
    } else if (password !== confirmPassword) {
        return 'Пароли не совпадают';
    }
    return '';
};