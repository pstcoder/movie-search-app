function Movies(props) {
    const loopMovie = props.data.map(
        (d, i) => {
                return <ShowMovieFormat key={i} {...d} />
        }
    )
    return (
        <div className="row justify-content-around extra">
            {props.load == true ? <h1 className="text-light">Loading...</h1> : loopMovie}
        </div>
    )
}

function ShowMovieFormat(props) {
    const IMGPATH = "https://image.tmdb.org/t/p/w1280";
    return (
        <div className="box mb-4 col-lg-3 col-sm-6 rounded" style={{ height: '400px' }}>
            <img src={ 
                props.poster_path == null ? 'image-missing.png' : IMGPATH + props.poster_path
            } alt="" />
            <div className="overlay">
                    {props.title == "Guardians of the Galaxy Vol. 2" || props.title ==  "Guardians of the Galaxy" ?
                     props.title ==  "Guardians of the Galaxy" && props.title != "Guardians of the Galaxy Vol. 2"  ?
                     <audio src="Guardians_Of_The_Galaxy_-_Redbone_-_Come_And_Get_Your_Love_(mp3.pm).mp3" controls></audio> :
                     <audio src="The_Sneepers_feat._David_Hasselhoff_-_Guardians_Inferno_From_Guardians_of_the_Galaxy_Vol._2_Fro_(mp3.pm).mp3" controls></audio> :
                     ""
                    }
                    
                <div className="title">
                    <h2> {props.title} </h2>
                    <span> {props.vote_average} </span>
                </div>
                <h3>Overview :</h3>
                <p>
                    {props.overview}
                </p>
            </div>
        </div>
    )
}
export default Movies;