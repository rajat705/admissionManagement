import React, { useEffect, useRef, useState } from 'react'
import './SignPage.css'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { auth } from '../firebase';

export default function SignPage() {

    const email_logIn = useRef(null)
    const password_logIn = useRef(null)

    const email = useRef(null)
    const password = useRef(null)
    const confirm_password = useRef(null)
    const fullName = useRef(null)

    const [authChecker, setAuthChecker] = useState(false)
    const [alertBool, setAlertBool] = useState({ state: false, value: 'alert' })


    React.useEffect(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");

        sign_up_btn.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
        });

        sign_in_btn.addEventListener("click", () => {
            container.classList.remove("sign-up-mode");
        });

        if (authChecker == false) {
            onAuthStateChanged(auth, (user) => {
                // window.location.href = '/Admission_Home';
                // if (user.emailVerified === true) {
                // }
            })
            setAuthChecker(true)
        }

    })

    const LoginForm = async () => {
        if (email_logIn.current.value != "" && password_logIn.current.value != "") {
            signInWithEmailAndPassword(
                auth,
                email_logIn.current.value,
                password_logIn.current.value
            )
                .then((val) => {
                    console.log("Loged In");
                    window.location.href = '/Admission_Home';
                })
                .catch((error) => {
                    var alertContent = 'error'
                    if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                        alertContent = 'Please LogIn  This Email is Already Registered'
                    }
                    else if (error.message === 'Firebase: Error (auth/wrong-password).') {
                        alertContent = 'Wrong Password'
                    }
                    else if (error.message === 'Firebase: Error (auth/user-not-found).') {
                        alertContent = 'User not Found Please Register First'
                    }
                    else if (error.message === 'Firebase: Error (auth/invalid-email).') {
                        alertContent = 'Please enter valid Email'
                    }
                    else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                        alertContent = 'Password should be at least 6 characters and weak password'
                    }
                    else {
                        alertContent = error.message
                    }
                    setAlertBool({ state: true, value: alertContent })
                });

        } else {
            setAlertBool({ state: true, value: "Please Enter Email And password" })
        }
    }

    const signup_form = async () => {
        if (email.current.value != "" && password.current.value != "" ) {
            if (fullName.current.value != '') {
                if (password.current.value === confirm_password.current.value) {
                    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                        .then((val) => {
                            console.log("Success");
                            sendEmailVerification(auth.currentUser)
                                .then(() => {
                                    alert('Email for Verification Sended');
                                    updateProfile(auth.currentUser, {
                                        displayName: fullName.current.value
                                    })
                                });
                        })
                        .catch((error) => {
                            var alertContent = 'error'
                            if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                                alertContent = 'Please LogIn  This Email is Already Registered'
                            }
                            else if (error.message === 'Firebase: Error (auth/wrong-password).') {
                                alertContent = 'Wrong Password'
                            }
                            else if (error.message === 'Firebase: Error (auth/user-not-found).') {
                                alertContent = 'User not Found Please Register First'
                            }
                            else if (error.message === 'Firebase: Error (auth/invalid-email).') {
                                alertContent = 'Please enter valid Email'
                            }
                            else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                                alertContent = 'Password should be at least 6 characters and weak password'
                            }
                            else {
                                alertContent = error.message
                            }
                            setAlertBool({ state: true, value: alertContent })
                        });
                }
                else {
                    setAlertBool({ state: true, value: "Password is not Same" })
                }
            }
            else {
                setAlertBool({ state: true, value: "Please Enter Your Name" })
            }
        } else {
            setAlertBool({ state: true, value: "Enter Valid email password" })
        }
    }


    return (
        <div className="container">
            <div className="forms-container">
                {
                    alertBool.state ? (
                        <div style={{ position: 'fixed', top: 0, zIndex: 7, background: '#e25151', color: '#fff', padding: '7px 15px', margin: '10px', width: '-webkit-fill-available', borderRadius: '5px', display: 'flex', justifyContent: 'space-between' }}>
                            <span>
                                {alertBool.value}
                            </span>
                            <button className='btn' style={{ width: '25px', height: '25px', margin: 0, background: 'none' }} onClick={() => setAlertBool({ state: false, value: alertBool.value })}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div></div>
                    )
                }
                <div className="signin-signup">
                    <form className="sign-in-form">

                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                </svg>
                            </i>
                            <input type="text" placeholder="Email Address" name='email' ref={email_logIn} required="" />
                        </div>
                        <div className="input-field">
                            <i aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                </svg>
                            </i>
                            <input type="password" placeholder="Password" name='password' ref={password_logIn} required="" />
                        </div>
                        <input type="button" value="Login" className="btn solid" onClick={LoginForm} />
                        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', }}>
                            <input type="button" value="Forgot Password?" style={{ color: '#4590ef', background: 'none', border: 'none' }} onClick={() => window.location.href = '/forgetpassword'} />
                        </p>
                        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', }}>
                            <input type="button" value="Resend Activation Link?" style={{ color: '#4590ef', background: 'none', border: 'none' }} onClick={() => window.location.href = '/resendactivationlink'} />
                        </p>
                    </form>
                    <form className="sign-up-form">
                        <h1 className="title">Sign up</h1>
                        <div className="input-field">
                            <i aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                </svg>
                            </i>
                            <input type="text" placeholder="Full Name" name='fullName' ref={fullName} required="" />
                        </div>
                        <div className="input-field">
                            <i aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                                    <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z" />
                                    <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
                                </svg>
                            </i>
                            <input type="email" placeholder="Email Address" name='email' ref={email} required="" />
                        </div>
                        <div className="input-field">
                            <i aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                </svg>
                            </i>
                            <input type="password" placeholder="Password " name='password' ref={password} required="" />
                        </div>
                        <div className="input-field">
                            <i aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                </svg>
                            </i>
                            <input type="password" placeholder="Confirm Password" name='confirm_password' ref={confirm_password} required="" />
                        </div>
                        <input type="button" className="btn" onClick={signup_form} value="Sign up" />
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h2>Engineering College, Ajmer</h2>
                        <h3 style={{ color: '#C8FF00' }}>New here ?</h3>
                        <p>
                            <span style={{ color: '#C8FF00' }}>New User </span> Kindly Register with Email Id.
                        </p>
                        <button className="btn transparent" id="sign-up-btn">
                            Sign up
                        </button>
                    </div>
                    <img src="https://www.ecajmer.ac.in/proctorwebsite/signin/img/register.svg" className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h2>Engineering College, Ajmer</h2><h3 style={{ color: '#C8FF00' }}>Existing User?</h3>
                        <p>
                            <span style={{ color: '#C8FF00' }}>Existing User</span> Kindly Login with Your Registered Email Id.
                        </p>
                        <button className="btn transparent" id="sign-in-btn">
                            Sign in
                        </button>
                    </div>
                    <img src="https://www.ecajmer.ac.in/proctorwebsite/signin/img/log.svg" className="image" alt="" />
                </div>
            </div>
        </div>


    )
}
