import React, { useEffect, useState } from 'react';

import { CssBaseline, makeStyles } from '@material-ui/core';

import BackImage from '../Details/BackImage';
import { API_KEY, API_URL, IMAGE_URL } from '../Config';

const useStyles = makeStyles(theme => ({

}));

function MovieDetails(props) {
    const classes = useStyles();
    const [Movie, setMovie] = useState([]);
    useEffect(() => {
        const movieId = props.match.params.movieId

        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=pl`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
            })
    }, [props.match.params.movieId])
    return (
        <div>
            <CssBaseline />
            {Movie &&
                <BackImage
                    vid_id={`${Movie.id}`}
                    image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`}
                    poster={`${IMAGE_URL}w500${Movie.poster_path && Movie.poster_path}`}
                    title={Movie.title}
                    originalTitle={Movie.original_title}
                    text={Movie.overview}
                    grade={Movie.vote_average}
                    type_vid={`movie`}
                />
            }
        </div>
    );
}

export default MovieDetails;