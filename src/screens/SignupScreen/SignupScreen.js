import React, { useRef } from 'react';
import { auth } from '../../firebase';
import "./SignupScreen.css"

function SignupScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register =(e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((authUser) => {
            console.log(authUser);

        })
        .catch((err) => {
            alert(err.message);
        })

    };

    return (
        <div className="signupScreen">
            <form>
                <h1>Sign up</h1>
                <input ref={emailRef} placeholder="Email" type="email"/>
                <input ref={passwordRef} placeholder="Password" type="password"/>
                <button type="submit" onClick={register}>Sign Up</button>
               
            </form>
        </div>
    )
}

export default SignupScreen
