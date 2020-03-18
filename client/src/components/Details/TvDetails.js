import React, { useEffect, useState } from 'react';

import { CssBaseline, makeStyles } from '@material-ui/core';

import BackImage from '../Details/BackImage';
import { API_KEY, API_URL, IMAGE_URL } from '../Config';

const useStyles = makeStyles(theme => ({

}));

function TvDetails(props) {
    const classes = useStyles();
    const [Tv, setTv] = useState([])
    useEffect(() => {
        const tvId = props.match.params.tvId

        fetch(`${API_URL}tv/${tvId}?api_key=${API_KEY}&language=pl`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setTv(response)
            })
    }, [props.match.params.tvId])
    return (
        <div>
            <CssBaseline />
            {Tv &&
                <BackImage
                    vid_id={`${Tv.id}`}
                    image={`${IMAGE_URL}w1280${Tv.backdrop_path && Tv.backdrop_path}`}
                    poster={`${IMAGE_URL}w500${Tv.poster_path && Tv.poster_path}`}
                    title={Tv.name}
                    originalTitle={Tv.original_name}
                    text={Tv.overview}
                    grade={Tv.vote_average}
                    type_vid={`tv`}
                />
            }
        </div>
    );
}

export default TvDetails;