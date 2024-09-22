import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useRef, useContext } from 'react';
import { createUser } from '../../dataCenter';
import { stateContext } from './Menu';

function Signup(props) {
    const { setCurrForm } = props;
    const { userLogged, setUserLogged } = useContext(stateContext);
    const [EyeOpen, setEyeOpen] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const err = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const repeatPasswordRef = useRef(null);
    
    const handleSubmitSignup = async (e) => {
        e.preventDefault();
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
        setUserLogged("");
        const { newUserCreated } = await createUser(usernameRef.current.value,passwordRef.current.value);
        setUserLogged(null);
        if(!newUserCreated){
            err.current.textContent = "Username Already Taken";
            err.current.style.display = "block";
            usernameRef.current.style.borderColor = "red";
            usernameRef.current.classList.add('shake');
            setTimeout(() => {
                usernameRef.current.classList.remove('shake');
            }, 500);
        }
        else {
            setIsPopupVisible(true);
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
    function togglePopUp() {
        setIsPopupVisible(false);
        setCurrForm("login");
    }
    return (
        <form id='signup-form' className="menu-form" onSubmit={handleSubmitSignup}>
            {isPopupVisible && (
            <div className="overlay">
                <div className="popup">
                    <p>Sign-up successful!<br/> Welcome to StoryTunes. You can now log in and start exploring.</p>
                    <FontAwesomeIcon icon={faXmark} className='pop-msg-x' onClick={togglePopUp} beatFade style={{color: "#ce1c1c",}} />
                </div>
            </div>)}
            <div>
                <input id="username-signup" className="menu-input" required
                ref={usernameRef} onChange={handleInputChange} placeholder="Username" maxLength={15}/>
                <div className='position-relative'>
                    <input type={EyeOpen ? "text": "password"} id="password-signup" className="menu-input" required
                    ref={passwordRef} onChange={handleInputChange} placeholder="Password" maxLength={15}/>
                    {EyeOpen ? <FontAwesomeIcon icon={faEye} onClick={toggleEye} className="open-eye eye"/> :
                    <FontAwesomeIcon icon={faEyeSlash} onClick={toggleEye} className="close-eye eye"/>}
                </div>
                <div className='position-relative'>
                    <input type={EyeOpen ? "text": "password"} id="repeat-password-signup" className="menu-input" required
                    ref={repeatPasswordRef} onChange={handleInputChange} placeholder="Repeat Password" maxLength={15} />
                    {EyeOpen ? <FontAwesomeIcon icon={faEye} onClick={toggleEye} className="open-eye eye"/> :
                    <FontAwesomeIcon icon={faEyeSlash} onClick={toggleEye} className="close-eye eye"/>}
                </div>
                <p className="error signup-invalid" ref={err}></p>
            </div>
            <button id="submit-signup" className="menu-button" type="submit">
                {userLogged === "" ? <FontAwesomeIcon icon={faSpinner} spinPulse/> :"Sign Up"}</button>
        </form>
    )
}

export default Signup;