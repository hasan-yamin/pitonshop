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
let userAuth;
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    if (userAuth !== null && userAuth !== '') {
        // window.location.href = "products.html";
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
            // console.log(' value[',i,']: ',value[i])
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
                                if (pass.length >= 6 && pass.length <= 20 && confirmpassword === pass) {
                                    try {
                                        signup(mail, pass, userName);
                                        // hide signup page
                                        let signupPage = document.getElementById('signup-page');
                                        signupPage.classList.remove('show');
                                        // Show Signin Page
                                        let loginPage = document.getElementById('signin-page');
                                        loginPage.classList.add('show');
                                        //Hide error message
                                        let ErrorMsg = document.getElementById('error-signup');
                                        ErrorMsg.style.display = 'none';
                                    }
                                    catch (err) {
                                        //Show error message
                                        let ErrorMsg = document.getElementById('error-signup');
                                        ErrorMsg.innerHTML = err + '';
                                        ErrorMsg.style.display = 'block';
                                        console.log('signup error: ', err);
                                    }
                                }
                                else {
                                    //show error message
                                    let ErrorMsg = document.getElementById('error-signup');
                                    ErrorMsg.innerText = "Password length should be between 6-20 char ";
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
                            // window.location.href = "products.html";
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
/* *********** [1] SignUp **************/
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
        console.log('token : ', response.data['token']);
        userAuth = response.data['token'];
    })
        .catch(function (error) {
        console.log(error);
    });
}
/* *********** End Signup **************/
/* *********** [2] SignIn **************/
function signin(email, pass) {
    axios({
        method: 'post',
        url: 'https://assignment-api.piton.com.tr/api/v1/user/login',
        data: {
            password: pass,
            email: email
        }
    }).then(function (response) {
        console.log('data : ', response.data['token']);
        userAuth = response.data['token'];
        window.location.href = "products.html";
        let rememberme = document.getElementById('rememberme');
        if (rememberme.checked) {
            localStorage.setItem('userAuth', userAuth);
        }
    })
        .catch(function (error) {
        console.log(error);
    });
}
/* *********** end SignIn **************/
//     MaskedInput({
//         elm: document.getElementById('phone'), // select only by id
//         format: '+375 (__) ___-__-__',
//         separator: '+375 (   )-'
//     });
//     MaskedInput({
//         elm: document.getElementById('phone2'), // select only by id
//         format: '+375 (__) ___-__-__',
//         separator: '+375 ()-'
//     });
// };
// // masked_input_1.4-min.js
// // angelwatt.com/coding/masked_input.php
// (function (a) {
//     a.MaskedInput = function (f) {
//         if (!f || !f.elm || !f.format) { return null } if (!(this instanceof a.MaskedInput)) { return new a.MaskedInput(f) } var o = this, d = f.elm, s = f.format, i = f.allowed || "0123456789", h = f.allowedfx || function () { return true }, p = f.separator || "/:-", n = f.typeon || "_YMDhms", c = f.onbadkey || function () { }, q = f.onfilled || function () { }, w = f.badkeywait || 0, A = f.hasOwnProperty("preserve") ? !!f.preserve : true, l = true, y = false, t = s, j = (function () { if (window.addEventListener) { return function (E, C, D, B) { E.addEventListener(C, D, (B === undefined) ? false : B) } } if (window.attachEvent) { return function (D, B, C) { D.attachEvent("on" + B, C) } } return function (D, B, C) { D["on" + B] = C } }()), u = function () { for (var B = d.value.length - 1; B >= 0; B--) { for (var D = 0, C = n.length; D < C; D++) { if (d.value[B] === n[D]) { return false } } } return true }, x = function (C) { try { C.focus(); if (C.selectionStart >= 0) { return C.selectionStart } if (document.selection) { var B = document.selection.createRange(); return -B.moveStart("character", -C.value.length) } return -1 } catch (D) { return -1 } }, b = function (C, E) { try { if (C.selectionStart) { C.focus(); C.setSelectionRange(E, E) } else { if (C.createTextRange) { var B = C.createTextRange(); B.move("character", E); B.select() } } } catch (D) { return false } return true }, m = function (D) { D = D || window.event; var C = "", E = D.which, B = D.type; if (E === undefined || E === null) { E = D.keyCode } if (E === undefined || E === null) { return "" } switch (E) { case 8: C = "bksp"; break; case 46: C = (B === "keydown") ? "del" : "."; break; case 16: C = "shift"; break; case 0: case 9: case 13: C = "etc"; break; case 37: case 38: case 39: case 40: C = (!D.shiftKey && (D.charCode !== 39 && D.charCode !== undefined)) ? "etc" : String.fromCharCode(E); break; default: C = String.fromCharCode(E); break }return C }, v = function (B, C) { if (B.preventDefault) { B.preventDefault() } B.returnValue = C || false }, k = function (B) { var D = x(d), F = d.value, E = "", C = true; switch (C) { case (i.indexOf(B) !== -1): D = D + 1; if (D > s.length) { return false } while (p.indexOf(F.charAt(D - 1)) !== -1 && D <= s.length) { D = D + 1 } if (!h(B, D)) { c(B); return false } E = F.substr(0, D - 1) + B + F.substr(D); if (i.indexOf(F.charAt(D)) === -1 && n.indexOf(F.charAt(D)) === -1) { D = D + 1 } break; case (B === "bksp"): D = D - 1; if (D < 0) { return false } while (i.indexOf(F.charAt(D)) === -1 && n.indexOf(F.charAt(D)) === -1 && D > 1) { D = D - 1 } E = F.substr(0, D) + s.substr(D, 1) + F.substr(D + 1); break; case (B === "del"): if (D >= F.length) { return false } while (p.indexOf(F.charAt(D)) !== -1 && F.charAt(D) !== "") { D = D + 1 } E = F.substr(0, D) + s.substr(D, 1) + F.substr(D + 1); D = D + 1; break; case (B === "etc"): return true; default: return false }d.value = ""; d.value = E; b(d, D); return false }, g = function (B) { if (i.indexOf(B) === -1 && B !== "bksp" && B !== "del" && B !== "etc") { var C = x(d); y = true; c(B); setTimeout(function () { y = false; b(d, C) }, w); return false } return true }, z = function (C) { if (!l) { return true } C = C || event; if (y) { v(C); return false } var B = m(C); if ((C.metaKey || C.ctrlKey) && (B === "X" || B === "V")) { v(C); return false } if (C.metaKey || C.ctrlKey) { return true } if (d.value === "") { d.value = s; b(d, 0) } if (B === "bksp" || B === "del") { k(B); v(C); return false } return true }, e = function (C) { if (!l) { return true } C = C || event; if (y) { v(C); return false } var B = m(C); if (B === "etc" || C.metaKey || C.ctrlKey || C.altKey) { return true } if (B !== "bksp" && B !== "del" && B !== "shift") { if (!g(B)) { v(C); return false } if (k(B)) { if (u()) { q() } v(C, true); return true } if (u()) { q() } v(C); return false } return false }, r = function () { if (!d.tagName || (d.tagName.toUpperCase() !== "INPUT" && d.tagName.toUpperCase() !== "TEXTAREA")) { return null } if (!A || d.value === "") { d.value = s } j(d, "keydown", function (B) { z(B) }); j(d, "keypress", function (B) { e(B) }); j(d, "focus", function () { t = d.value }); j(d, "blur", function () { if (d.value !== t && d.onchange) { d.onchange() } }); return o }; o.resetField = function () { d.value = s }; o.setAllowed = function (B) { i = B; o.resetField() }; o.setFormat = function (B) { s = B; o.resetField() }; o.setSeparator = function (B) { p = B; o.resetField() }; o.setTypeon = function (B) { n = B; o.resetField() }; o.setEnabled = function (B) { l = B }; return r()
//     }
// }(window));
//# sourceMappingURL=main.js.map