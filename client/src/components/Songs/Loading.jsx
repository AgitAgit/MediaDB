import loading from './../../assets/loadingGif.gif';

function Loading(){
    return(
        <div class="loadingDiv">
            <img src={loading} class="loadingImg"></img>
        </div>
    );
}

export default Loading;