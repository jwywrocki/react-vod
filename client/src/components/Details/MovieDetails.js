import React, { useEffect, useState } from 'react';

import { CssBaseline, makeStyles } from '@material-ui/core';

import BackImage from '../Details/BackImage';
import { API_KEY, API_URL, IMAGE_URL } from '../Config';

import ScrollTop from '../Nav/Sections/ScrollTop';

const useStyles = makeStyles(theme => ({
    hello: {
        height: '100vh',
        padding: '25px',
        fontSize: '22px'
    },
}));

function MovieDetails(props) {
    const classes = useStyles();
    const [Movie, setMovie] = useState([]);
    const [Vid, setVid] = useState([]);
    const [Genres, setGenres] = useState([]);
    const [Images, setImages] = useState([]);
    useEffect(() => {
        const movieId = props.match.params.movieId

        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=pl&append_to_response=images&include_image_language=en,null`)
            .then(response => response.json())
            .then(response => {
                console.log('Movie info:', response);
                setMovie(response);
                console.log('Genres:', response.genres);
                setGenres(response.genres);
                console.log('Images:', response.images.backdrops);
                setImages(response.images.backdrops);

                let endpointForVids = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}&language=pl`;
                fetch(endpointForVids)
                    .then(response => response.json())
                    .then(response => {
                        console.log('Vid in pl:', response)
                        if (response.results.length === 0) {
                            let endpointForVidsEn = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}`;
                            fetch(endpointForVidsEn)
                                .then(response => response.json())
                                .then(response => {
                                    console.log('Vid in en:', response)
                                    setVid(response.results[0])
                                })
                        } else {
                            setVid(response.results[0])
                        }
                    })
            })
    }, [props.match.params.movieId])
    return (
        <div>
            <div id='back-to-top-anchor'>
                <ScrollTop />
                <CssBaseline />
                {Movie &&
                    <BackImage
                        vid_id={`${Movie.id}`}
                        image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`}
                        poster={`${IMAGE_URL}w342${Movie.poster_path && Movie.poster_path}`}
                        title={Movie.title}
                        originalTitle={Movie.original_title}
                        text={Movie.overview ? Movie.overview : `Przepraszamy nie posiadamy opisu do filmu: "${Movie.title}" w języku polskim.`}
                        grade={Movie.vote_average}
                        type_vid={`movie`}
                        video={Vid ? Vid.key : null}
                        genres={Genres}
                    />
                }
            </div>
            <div className={classes.hello}>
                Obsada
            </div>
            <div className={classes.hello}>
                Galeria
            </div>
            <div className={classes.hello}>
                Komentarze
            </div>
        </div>
    );
}

export default MovieDetails;