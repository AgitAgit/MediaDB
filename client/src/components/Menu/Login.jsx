
function Login() {
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <form id='login-form' className="menu-form" onSubmit={handleSubmit}>
            <div>
                <input id="username-login" className="menu-input" placeholder="Username" maxLength={15}/>
                <input id="password-login" className="menu-input" placeholder="Password" maxLength={15}/>
                <p id="forgot-password" className="link">Forgot Password?</p>
                <p>Commitment-phobe?  <span className="link">Go ahead as a guest!</span></p>
            </div>
            <button id="submit-login" className="submit-button" type="submit">Login</button>
        </form>
    )
}

export default Login;