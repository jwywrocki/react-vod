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

function TvDetails(props) {
    const classes = useStyles();
    const [Tv, setTv] = useState([]);
    const [Vid, setVid] = useState([]);
    useEffect(() => {
        const tvId = props.match.params.tvId

        fetch(`${API_URL}tv/${tvId}?api_key=${API_KEY}&language=pl`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setTv(response)

                let endpointForVids = `${API_URL}tv/${tvId}/videos?api_key=${API_KEY}&language=pl`;
                fetch(endpointForVids)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        if (response.results.length === 0) {
                            let endpointForVidsEn = `${API_URL}tv/${tvId}/videos?api_key=${API_KEY}`;
                            fetch(endpointForVidsEn)
                                .then(response => response.json())
                                .then(response => {
                                    console.log(response)
                                    setVid(response.results[0])
                                })
                        } else {
                            setVid(response.results[0])
                        }
                    })
            })
    }, [props.match.params.tvId])
    return (
        <div>
            <div id='back-to-top-anchor'>
                <ScrollTop />
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
                        video={Vid.key}
                    />
                }
            </div>
            <div className={classes.hello}>
                Informacje o serialu "{Tv.name}"
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

export default TvDetails;