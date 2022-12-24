"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* *********** Start try auto login ************/
let userAuth = localStorage.getItem('userAuth');
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    if (userAuth !== null && userAuth !== undefined && userAuth !== '') {
        localStorage.setItem('tempUserAuth', userAuth);
        window.location.href = "products.html";
    }
    let phone = document.getElementById('phone');
    phone.addEventListener("input", (e) => {
        const value = phone.value.replace(/\D+/g, "");
        const numberLength = 11;
        let result = "+";
        for (let i = 0; i < value.length && i < numberLength; i++) {
            switch (i) {
                case 0:
                    result += "9 (";
                    continue;
                case 4:
                    result += ") ";
                    break;
                case 7:
                    result += "-";
                    break;
                case 9:
                    result += "-";
                    break;
                default:
                    break;
            }
            result += value[i];
        }
        phone.value = result;
    });
}));
/* *********** End auto login **************/
/* *********** Start Signup **************/
let signupForm = document.getElementById('signup-form');
if (signupForm !== null) {
    signupForm.addEventListener('submit', function (e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            if (e.target !== null) {
                const userName = e.target.nam.value.trim();
                const serName = e.target.sername.value.trim();
                const phone = e.target.phone.value.trim();
                const mail = e.target.email.value.trim();
                const pass = e.target.password.value.trim();
                const confirmpassword = e.target.confirmpassword.value.trim();
                if (userName.length > 3) {
                    if (serName.length > 3) {
                        if (phone) {
                            if (mail.length > 4 && mail.includes('@')) {
                                // regular expression for alphanumeric characters
                                let regEx = /^[0-9a-zA-Z]+$/;
                                if (pass.length >= 6 && pass.length <= 20 && confirmpassword === pass && pass.match(regEx)) {
                                    try {
                                        signup(mail, pass, userName);
                                    }
                                    catch (err) {
                                        //Show error message
                                        let ErrorMsg = document.getElementById('error-signup');
                                        ErrorMsg.innerHTML = err + '';
                                        ErrorMsg.style.display = 'block';
                                    }
                                }
                                else {
                                    //show error message
                                    let ErrorMsg = document.getElementById('error-signup');
                                    ErrorMsg.innerText = "Password length should be between 6-20 char, a-z,A-Z,0-9 ";
                                    ErrorMsg.style.display = 'block';
                                }
                            }
                            else {
                                //show error message
                                let ErrorMsg = document.getElementById('error-signup');
                                ErrorMsg.innerText = "Please enter correct mail address";
                                ErrorMsg.style.display = 'block';
                            }
                        }
                        else {
                            //show error message
                            let ErrorMsg = document.getElementById('error-signup');
                            ErrorMsg.innerText = "Please enter Phone Number";
                            ErrorMsg.style.display = 'block';
                        }
                    }
                    else {
                        //show error message
                        let ErrorMsg = document.getElementById('error-signup');
                        ErrorMsg.innerText = "Please enter Ser Name";
                        ErrorMsg.style.display = 'block';
                    }
                }
                else {
                    //show error message
                    let ErrorMsg = document.getElementById('error-signup');
                    ErrorMsg.innerText = "Please enter Your Name";
                    ErrorMsg.style.display = 'block';
                }
            }
        });
    });
}
/* *********** End Signup **************/
/* *********** Start login **************/
let loginForm = document.getElementById('login-form');
if (loginForm !== null) {
    loginForm.addEventListener('submit', function (e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            if (e.target !== null) {
                const mail = e.target.email.value.trim();
                const pass = e.target.password.value.trim();
                if (mail.length > 4 && mail.includes('@')) {
                    if (pass.length >= 6 && pass.length <= 20) {
                        try {
                            signin(mail, pass);
                        }
                        catch (err) {
                            //Show error message
                            let ErrorMsg = document.getElementById('error-login');
                            ErrorMsg.innerHTML = err + '';
                            ErrorMsg.style.display = 'block';
                        }
                    }
                    else {
                        //show error message
                        let ErrorMsg = document.getElementById('error-login');
                        ErrorMsg.innerText = "Password length should be between 6-20 char ";
                        ErrorMsg.style.display = 'block';
                    }
                }
                else {
                    //show error message
                    let ErrorMsg = document.getElementById('error-login');
                    ErrorMsg.innerText = "Please enter correct mail address";
                    ErrorMsg.style.display = 'block';
                }
            }
        });
    });
}
/* *********** End login **************/
/****change sign page******/
let toSignIn = document.getElementById('to-sgnin');
let toSignUp = document.getElementById('to-sgnup');
toSignIn.addEventListener('click', function () {
    let signupPage = document.getElementById('signup-page');
    signupPage.classList.remove('show');
    let loginPage = document.getElementById('signin-page');
    loginPage.classList.add('show');
});
toSignUp.addEventListener('click', function () {
    let signupPage = document.getElementById('signup-page');
    signupPage.classList.add('show');
    let loginPage = document.getElementById('signin-page');
    loginPage.classList.remove('show');
});
/****change sign page******/
/* *********** SignUp **************/
function signup(email, pass, userName) {
    axios({
        method: 'post',
        url: 'https://assignment-api.piton.com.tr/api/v1/user/register',
        data: {
            name: userName,
            password: pass,
            email: email
        }
    }).then(function (response) {
        userAuth = response.data['token'];
        window.location.href = "products.html";
        localStorage.setItem('tempUserAuth', userAuth);
    });
}
/* *********** End Signup **************/
/* *********** SignIn **************/
function signin(email, pass) {
    axios({
        method: 'post',
        url: 'https://assignment-api.piton.com.tr/api/v1/user/login',
        data: {
            password: pass,
            email: email
        }
    }).then(function (response) {
        if (response.data['token'] !== '') {
            userAuth = response.data['token'];
            localStorage.setItem('tempUserAuth', userAuth);
            window.location.href = "products.html";
            let rememberme = document.getElementById('rememberme');
            if (rememberme.checked) {
                localStorage.setItem('userAuth', userAuth);
            }
        }
        else {
            //show error message
            let ErrorMsg = document.getElementById('error-login');
            ErrorMsg.innerText = "Please check your Email and Password";
            ErrorMsg.style.display = 'block';
        }
    });
}
/* *********** end SignIn **************/ 
