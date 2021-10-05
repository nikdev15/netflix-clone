import React, { useRef, useState } from 'react';
import SignupScreen from '../SignupScreen/SignupScreen';
import { auth } from '../../firebase';
import "./SigninScreen.css"

function SigninScreen() {
    const [signUp, setSignUp] = useState(false)
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
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

    function signUpFunc() {
        setSignUp(true);
    }

    return (
        <div className="signinScreen">
            {!signUp ? 
                (
                    <form>
                    <h1>Sign In</h1>
                    <input ref={emailRef} placeholder="Email" type="email"/>
                    <input ref={passwordRef} placeholder="Password" type="password"/>
                    <button type="submit" onClick={signIn}>Sign In</button>
                    <h4>
                        <span className="signupScreen_gray">New to Netflix? </span>
                        <span className="signupScreen_link" onClick={signUpFunc}>Sign up now.</span>
                    </h4>
                </form>
                ) : (
                    <SignupScreen />
                )}
        </div>
    )
}

export default SigninScreen