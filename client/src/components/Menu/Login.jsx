
function Login() {
    

    return (
        <form id='login-form' action='/'>
            <div>
                <input id="username-input" className="menu-input" placeholder="Username"/>
                <input id="password-input" className="menu-input" placeholder="Password"/>
                <p id="forgot-password" className="link">Forgot Password?</p>
                <p>Commitment-phobe?  <span className="link">Go ahead as a guest!</span></p>
            </div>
            <button id="submit-login-button" className="submit-button" type="button">Login</button>
        </form>
    )
}

export default Login;