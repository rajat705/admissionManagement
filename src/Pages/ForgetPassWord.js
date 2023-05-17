import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { auth } from '../firebase';
import './SignPage.css'

export default function ForgetPassWord() {

    const email = useRef(null)

    const forgetPassword_link_gen = async () => {
        sendPasswordResetEmail(auth, email.current.value)
            .then((user) => {
                console.log(user);
                alert('Email Sended')
            })
            .catch((error) => {
                alert(error.message)
            })
    }


    return (
        <div class="container">
            <div class="forms-container">
                <div class="signin-signup">
                    <form class="sign-in-form">
                        <h2 class="title">Reset Password</h2>
                        <div class="input-field">
                            <i class="fas fa-user" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                </svg>
                            </i>
                            <input type="text" placeholder="Email Address" name="email" ref={email} required="" />
                        </div>
                        <input type="button" value="Send Verification Link" name="resetPassword" class="btn" onClick={() => forgetPassword_link_gen()} />
                    </form>
                </div>
            </div>

            <div class="panels-container">
                <div class="panel left-panel">
                    <div class="content">
                        <h3>Forgot Password ?</h3>
                        <p>
                            Kindly Enter Your Registered E-mail.

                        </p>
                    </div>
                    <img src="https://www.ecajmer.ac.in/proctorwebsite/signin/img/log.svg" class="image" alt="" />
                </div>
            </div>
        </div>
    )
}
