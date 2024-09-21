
function Signup() {
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <form id='signup-form' className="menu-form" onSubmit={handleSubmit}>
            <div>
                <input id="username-signup" className="menu-input" placeholder="Username" maxLength={15}/>
                <input id="password-signup" className="menu-input" placeholder="Password" maxLength={15}/>
                <input id="repeat-password-signup" className="menu-input" placeholder="Repeat Password" maxLength={15}/>
            </div>
            <button id="submit-signup" className="submit-button" type="submit">Sign Up</button>
        </form>
    )
}

export default Signup;