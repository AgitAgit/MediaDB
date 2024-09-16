import backToTopLight from './../../assets/back-to-top-light.png'
import backToTopDark from './../../assets/back-to-top-dark.png'

function BackToTop(props) {
    const { theme } = props;

    function handleBackToTopClick() {
        window.scrollTo({top:0,left: 0, behavior: 'smooth'})
    }

    return (
        <img id="back-to-top" onClick={handleBackToTopClick} src={theme === 'light' ? backToTopLight : backToTopDark} />
    )
}

export default BackToTop