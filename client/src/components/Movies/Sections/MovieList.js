import React, { useEffect, useState } from 'react'

import { Grid, Button, Box } from '@material-ui/core';

import { API_KEY, API_URL, IMAGE_URL } from '../../Config'
import MovieCard from './MovieCard';

import CircularProgress from '@material-ui/core/CircularProgress';

function MovieList(props) {
    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [CurrentPage, setCurrentPage] = useState(0);

    async function fetchData(endpoint) {
        await fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setData([...Data, ...result.results]);
                setCurrentPage(result.page);
                setLoading(false);
                console.log(result);
            })
            .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        const endpoint = `${API_URL}movie/${props.type}?api_key=${API_KEY}&language=pl&page=1`;
        fetchData(endpoint);
    }, []);

    const handleLoadMore = () => {
        let endpoint = `${API_URL}movie/${props.type}?api_key=${API_KEY}&language=pl&page=${CurrentPage + 1}`;
        fetchData(endpoint);
    }
    return (
        <div>
            <Grid container spacing={3}>
                {Loading &&
                    <Box display="flex" justifyContent="center" my={3} flexGrow={1}>
                        <CircularProgress size={50} disableShrink />
                    </Box>
                }
                {Data && Data.map((data, index) => (
                    <React.Fragment key={index}>
                        <MovieCard
                            image={data.poster_path && `${IMAGE_URL}w500${data.poster_path}`}
                            Id={data.id}
                            Title={data.title}
                            Pop={data.popularity}
                            Votes={data.vote_count}
                            Rate={data.vote_average}
                            ReDate={data.release_date}
                        />
                    </React.Fragment>
                ))}
            </Grid>
            <br />
            <Box display="flex" justifyContent="center" my={3} flexGrow={1}>
                <Button onClick={handleLoadMore} variant="contained" color="primary">Załaduj więcej</Button>
            </Box>
        </div>
    );
}

export default MovieList;