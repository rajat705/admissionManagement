import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react'
import { auth } from '../firebase';

export default function ResendVerificationLink() {

    const email_logIn = useRef(null)
    const password_logIn = useRef(null)

    const LoginForm = async () => {
        if (email_logIn.current.value != "" && password_logIn.current.value != "" ) {
            signInWithEmailAndPassword(
                auth,
                email_logIn.current.value,
                password_logIn.current.value
            )
                .then((val) => {
                    alert(`Verification Email is Sended Your your mail ${email_logIn.current.value}`)
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
                    alert('Please Enter Valid Email and Password')
                });

        } else {
            alert('Please Enter Valid Email and Password')
        }
    }

    return (
        <div  className="container">
            <div  className="forms-container">
                <div  className="signin-signup">
                    <form  className="sign-in-form">
                        <h2  className="title">Resend Activation link</h2>
                        <div  className="input-field">
                            <i  className="fas fa-user" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"   className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                </svg>
                            </i>
                            <input type="text" placeholder="Email Address" name="email" ref={email_logIn} required="" />
                        </div>
                        <div  className="input-field">
                            <i  className="fas fa-lock" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"   className="bi bi-lock-fill" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                </svg>
                            </i>
                            <input type="password" placeholder="Password" name="password" ref={password_logIn} required="" />
                        </div>
                        <input type="button" value="Submit" onClick={() => LoginForm()}  className="btn solid" />
                    </form>
                </div>
            </div>
        </div>
    )
}
