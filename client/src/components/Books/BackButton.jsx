import backArrow from './../../assets/back_arrow.png';

function BackButton(props) {
    const { route, setRoute, scrollY } = props;

    function handleBackButtonClick(event) {
        setRoute(event.target.value);
    }

    return(
        <div id="back-button" onClick={handleBackButtonClick}>
            <img id="back-arrow" src={backArrow} />
            <span>Back</span>
        </div>
    )
}

export default BackButton;