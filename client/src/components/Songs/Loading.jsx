/**
 * I want to create a loading page that shows a spinning duck
 */
import duck from './../../assets/Duck-PNG-Picture.png';

function Loading(){
    return(
        <div class="loadingDiv">
            <img src={duck} class="loadingImg"></img>
            <span id="loadingSpan">Loading content...</span>
        </div>
    );
}

export default Loading;