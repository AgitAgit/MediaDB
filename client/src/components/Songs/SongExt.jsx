import backImg from './../../assets/back_arrow.png';

function SongExt(props){
    const {img, track, album, artist, trackLink, albumLink, artistLink} = props.data;
    return(
        <div>
            <img src={backImg}></img>
            <div class="imgDiv">
                <img src={img} alt={album}></img>
            </div>
            <div class="infoDiv">

            </div>
        </div>
    );
}