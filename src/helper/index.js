const regxEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regxpassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!$%^&*()_+|~=`{}\[\]:;"'<>,.?/])(?=\S)(?=.{8,})[A-Za-z\d!$%^&*()_+|~=`{}\[\]:;"'<>,.?/]+$/;

const validateEmail = function (email) {
    return regxEmail.test(email)
};
const validatePassword = function (password) {
    return regxpassword.test(password)
};



export { validateEmail, validatePassword }