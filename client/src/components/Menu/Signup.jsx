import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useRef } from 'react';

function Signup() {
    const [EyeOpen, setEyeOpen] = useState(false);
    const err = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const repeatPasswordRef = useRef(null);
    
    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        err.current.style.display = "block";

        if(passwordRef.current.value !== repeatPasswordRef.current.value) {
            err.current.style.display = "block";
            err.current.textContent = "Passwords Do Not Match";
            for(const input of [passwordRef,repeatPasswordRef]) {
                input.current.style.borderColor = "red";
                input.current.classList.add('shake');
                setTimeout(() => {
                    input.current.classList.remove('shake');
                }, 500);
            }
            return;
        }
        const user = "yaniv"; //Check data base
        if(user){
            err.current.textContent = "Username Already Taken";
            err.current.style.display = "block";
            usernameRef.current.style.borderColor = "red";
            usernameRef.current.classList.add('shake');
            setTimeout(() => {
                usernameRef.current.classList.remove('shake');
            }, 500);
        }
        else {
            alert("Account Added");
            // Update Database add user
        }
    }

    const handleInputChange = (e) => {
        if(e.target === passwordRef.current || e.target === repeatPasswordRef.current)
            passwordRef.current.style.borderColor = repeatPasswordRef.current.style.borderColor = "rgb(193, 193, 193)";
        else
            e.target.style.borderColor = "rgb(193, 193, 193)";
        err.current.style.display = "none";
    }

    function toggleEye() {
        setEyeOpen(prev => !prev)
    }
    return (
        <form id='signup-form' className="menu-form" onSubmit={handleSubmitSignup}>
            <div>
                <input id="username-signup" className="menu-input" 
                ref={usernameRef} onChange={handleInputChange} placeholder="Username" maxLength={15}/>
                <div className='position-relative'>
                    <input type={EyeOpen ? "text": "password"} id="password-signup" className="menu-input"
                    ref={passwordRef} onChange={handleInputChange} placeholder="Password" maxLength={15}/>
                    {EyeOpen ? <FontAwesomeIcon icon={faEye} onClick={toggleEye} className="open-eye eye"/> :
                    <FontAwesomeIcon icon={faEyeSlash} onClick={toggleEye} className="close-eye eye"/>}
                </div>
                <div className='position-relative'>
                    <input type={EyeOpen ? "text": "password"} id="repeat-password-signup" className="menu-input"
                    ref={repeatPasswordRef} onChange={handleInputChange} placeholder="Repeat Password" maxLength={15} />
                    {EyeOpen ? <FontAwesomeIcon icon={faEye} onClick={toggleEye} className="open-eye eye"/> :
                    <FontAwesomeIcon icon={faEyeSlash} onClick={toggleEye} className="close-eye eye"/>}
                </div>
                <p className="error signup-invalid" ref={err}>hello</p>
            </div>
            <button id="submit-signup" className="submit-button" type="submit">Sign Up</button>
        </form>
    )
}

export default Signup;