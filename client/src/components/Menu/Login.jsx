import { useContext, useState, useRef } from "react";
import { stateContext } from "./Menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


function Login() {
    const { userLogged, setUserLogged } = useContext(stateContext);
    const [EyeOpen, setEyeOpen] = useState(false);

    const err = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const user = 'yaniv'; //Check data base
        if(user)
            setUserLogged(user);
        else {
            err.current.style.display = "block";
            for(const input of [usernameRef,passwordRef]){
                input.current.style.borderColor = "red";
                input.current.classList.add('shake');
                setTimeout(() => {
                    input.current.classList.remove('shake');
                }, 500);
            }
        }
    }
    function handleGuestClick() {
        setUserLogged('guest');
    }
    const handleInputChange = (e) => {
        usernameRef.current.style.borderColor = passwordRef.current.style.borderColor = "rgb(193, 193, 193)";
        err.current.style.display = "none";
    }

    function toggleEye() {
        setEyeOpen(prev => !prev)
    }
    return (
        <form id='login-form' className="menu-form" onSubmit={handleSubmitLogin}>
            <div>
                <input id="username-login" className="menu-input" ref={usernameRef} onChange={handleInputChange} placeholder="Username" maxLength={15}/>
                <div className='position-relative'>
                    <input type={EyeOpen ? "text": "password"} id="password-login" className="menu-input"
                    ref={passwordRef} onChange={handleInputChange} placeholder="Password" maxLength={15}/>
                    {EyeOpen ? <FontAwesomeIcon icon={faEye} onClick={toggleEye} className="open-eye eye"/> :
                    <FontAwesomeIcon icon={faEyeSlash} onClick={toggleEye} className="close-eye eye"/>}
                </div>
                <p className="error login-invalid" ref={err}>Invalid username or password</p>
                <p id="forgot-password" className="link">Forgot Password?</p>
                <p>Commitment-phobe?  <span className="link" onClick={handleGuestClick}>Go ahead as a guest!</span></p>
            </div>
            <button id="submit-login" className="submit-button" type="submit">Login</button>
        </form>
    )
}

export default Login;