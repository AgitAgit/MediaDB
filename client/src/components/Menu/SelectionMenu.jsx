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
            <h1>Welcome!</h1>
            <p>Please select:</p>
            <div className="selection-menu-buttons">
                <button className="menu-button" onClick={handleStateButtonClick}>Books</button>
                <button className="menu-button" onClick={handleStateButtonClick}>Songs</button>
                <button className="menu-button" onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    )
}

export default SelectionMenu;