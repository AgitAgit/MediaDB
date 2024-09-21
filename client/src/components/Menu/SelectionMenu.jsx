import { useContext } from "react";
import { stateContext } from "./Menu";

function SelectionMenu() {
    const { userLogged, setUserLogged, setState } = useContext(stateContext);

    const handleStateButtonClick = (e) => {
        setState(e.target.textContent)
    }

    function handleSignOut() {
        setUserLogged(null);
    }

    return(
        <div id='menu-select-state'>
            <h1>Welcome {userLogged}!</h1>
            <p>Please select:</p>
            <button className="menu-button" onClick={handleStateButtonClick}>Books</button>
            <button className="menu-button" onClick={handleStateButtonClick}>Songs</button>
            <button className="menu-button" onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default SelectionMenu;