import loading from './../../assets/loadingGif.gif';

function Loading(){
    return(
        <div className="loadingDiv">
            <img src={loading} className="loadingImg"></img>
        </div>
    );
}

export default Loading;