
function Signup() {
    

    return (
        <form id='login-form' action='/'>
            <div>
                <input id="username-input" className="menu-input" placeholder="Username"/>
                <input id="password-input" className="menu-input" placeholder="Password"/>
                <input id="password-input" className="menu-input" placeholder="Repeat Password"/>
            </div>
            <button id="submit-login-button" className="submit-button" type="button">Sign Up</button>
        </form>
    )
}

export default Signup;