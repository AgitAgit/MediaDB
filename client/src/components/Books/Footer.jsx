import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faReact, faFacebook, faTwitter, faLinkedin, faNode, faNpm  } from '@fortawesome/free-brands-svg-icons'; // Brand icons
import { useContext } from 'react';
import { stateContext } from '../Menu/Menu';

function Footer() {
    const { theme } = useContext(stateContext);
    
    return(
        <footer className="footer-container">
            {theme === 'light' ?
            <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 590" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="63%" y1="2%" x2="37%" y2="98%"><stop offset="5%" stopColor="#ffbe9e"></stop><stop offset="95%" stopColor="#ff7736"></stop></linearGradient></defs><path d="M 0,600 L 0,150 C 86.07435897435897,187.17435897435897 172.14871794871794,224.34871794871793 242,200 C 311.85128205128206,175.65128205128207 365.47948717948725,89.77948717948718 445,95 C 524.5205128205127,100.22051282051282 629.9333333333334,196.53333333333333 720,212 C 810.0666666666666,227.46666666666667 884.7871794871794,162.0871794871795 955,143 C 1025.2128205128206,123.9128205128205 1090.9179487179488,151.11794871794874 1171,160 C 1251.0820512820512,168.88205128205126 1345.5410256410255,159.44102564102565 1440,150 L 1440,600 L 0,600 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-0"></path><defs><linearGradient id="gradient" x1="63%" y1="2%" x2="37%" y2="98%"><stop offset="5%" stopColor="#ffbe9e"></stop><stop offset="95%" stopColor="#ff7736"></stop></linearGradient></defs><path d="M 0,600 L 0,350 C 83.23846153846154,308.8461538461538 166.47692307692307,267.6923076923077 254,280 C 341.5230769230769,292.3076923076923 433.3307692307692,358.0769230769231 503,366 C 572.6692307692308,373.9230769230769 620.1999999999999,324 689,304 C 757.8000000000001,284 847.8692307692309,293.9230769230769 943,302 C 1038.1307692307691,310.0769230769231 1138.323076923077,316.3076923076923 1222,324 C 1305.676923076923,331.6923076923077 1372.8384615384616,340.8461538461538 1440,350 L 1440,600 L 0,600 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
            :
            <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 590" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="63%" y1="2%" x2="37%" y2="98%"><stop offset="5%" stopColor="#243b55"></stop><stop offset="95%" stopColor="#3a6073"></stop></linearGradient></defs><path d="M 0,600 L 0,150 C 86.07435897435897,187.17435897435897 172.14871794871794,224.34871794871793 242,200 C 311.85128205128206,175.65128205128207 365.47948717948725,89.77948717948718 445,95 C 524.5205128205127,100.22051282051282 629.9333333333334,196.53333333333333 720,212 C 810.0666666666666,227.46666666666667 884.7871794871794,162.0871794871795 955,143 C 1025.2128205128206,123.9128205128205 1090.9179487179488,151.11794871794874 1171,160 C 1251.0820512820512,168.88205128205126 1345.5410256410255,159.44102564102565 1440,150 L 1440,600 L 0,600 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-0"></path><defs><linearGradient id="gradient" x1="63%" y1="2%" x2="37%" y2="98%"><stop offset="5%" stopColor="#243b55"></stop><stop offset="95%" stopColor="#3a6073"></stop></linearGradient></defs><path d="M 0,600 L 0,350 C 83.23846153846154,308.8461538461538 166.47692307692307,267.6923076923077 254,280 C 341.5230769230769,292.3076923076923 433.3307692307692,358.0769230769231 503,366 C 572.6692307692308,373.9230769230769 620.1999999999999,324 689,304 C 757.8000000000001,284 847.8692307692309,293.9230769230769 943,302 C 1038.1307692307691,310.0769230769231 1138.323076923077,316.3076923076923 1222,324 C 1305.676923076923,331.6923076923077 1372.8384615384616,340.8461538461538 1440,350 L 1440,600 L 0,600 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
            }
            <div className="footer-content">
                <div className='contact-container'>
                    <h2>Contact Info</h2>
                    <div className='icons-row'>
                        <a href='https://github.com/AgitAgit/MediaDB'  target='_blank'><FontAwesomeIcon icon={faGithub} className='footer-icon'/></a>
                        <a href='https://www.facebook.com/'  target='_blank'><FontAwesomeIcon icon={faFacebook} className='footer-icon' /></a>
                        <a href='https://x.com/'  target='_blank'><FontAwesomeIcon icon={faTwitter} className='footer-icon'/></a>
                        <a href='https://www.linkedin.com/'  target='_blank'><FontAwesomeIcon icon={faLinkedin} className='footer-icon'/></a>
                    </div>
                </div>
                <div className='made-with-container'>
                    <h2>Made With</h2>
                    <div className='made-with-row'>
                        <a href='https://react.dev/'  target='_blank'><FontAwesomeIcon icon={faReact} className='footer-icon'/></a>
                        <a href='https://nodejs.org/en'  target='_blank'><FontAwesomeIcon icon={faNode} className='footer-icon'/></a>
                        <a href='https://www.npmjs.com/' target='_blank'><FontAwesomeIcon icon={faNpm} className='footer-icon'/></a>
                    </div>
                </div>
                <div className='contact-row'>
                    <a  href='#'>Home</a>
                    <a  href='#'>News</a>
                    <a  href='#'>About</a>
                    <a  href='#'>Contact Us</a>
                    <a  href='#'>Our Team</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;