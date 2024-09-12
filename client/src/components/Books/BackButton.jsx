import backArrow from './../../assets/back_arrow.png';

function BackButton(props) {
    const { route, setRoute, scrollY } = props;

    function handleBackButtonClick(event) {
        console.log(scrollY);
        
        setRoute(event.target.value);
        window.scrollTo({top:scrollY,left: 0, behavior: 'smooth'})
    }

    return(
        <div id="back-button" onClick={handleBackButtonClick}>
            <img id="back-arrow" src={backArrow} />
            <span>Back</span>
        </div>
    )
}

export default BackButton;