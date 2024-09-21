import backToTopLight from './../../assets/back-to-top-light.png'
import backToTopDark from './../../assets/back-to-top-dark.png'
import { useContext } from 'react';
import { stateContext } from '../Menu/Menu';

function BackToTop(props) {
    const { theme } = useContext(stateContext);

    function handleBackToTopClick() {
        window.scrollTo({top:0,left: 0, behavior: 'smooth'})
    }

    return (
        <img id="back-to-top" onClick={handleBackToTopClick} src={theme === 'light' ? backToTopLight : backToTopDark} />
    )
}

export default BackToTop