import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_URL } from '../Config'
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MovieList from './MovieList';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '1000px',
        [theme.breakpoints.up('xl')]: {
            maxWidth: '2000px',
        },
        margin: '0 auto',
        padding: theme.spacing(6),
        flexGrow: 1,
    },
}));

function Home() {
    const classes = useStyles();
    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=pl&page=1`
        fetchMovies(endpoint)
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setMovies([...Movies, ...result.results])
                setCurrentPage(result.page)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }

    const handleClick = () => {
        let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=pl&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)
    }

    return (
        <div className={classes.root}>
            <Typography gutterBottom variant="h5" component="h2">
                Poplarne filmy
            </Typography>
            <Grid container spacing={4}>
                {Movies && Movies.map((movie, index) => (
                    <React.Fragment key={index}>
                        <MovieList
                            image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                            movieId={movie.id}
                            movieTitle={movie.original_title}
                            moviePop={movie.popularity}
                            movieRateC={movie.vote_count}
                            movieRate={movie.vote_average}
                            movieDate={movie.release_date}
                        />
                    </React.Fragment>
                ))}
            </Grid>


            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={handleClick}>Załaduj więcej</button>
            </div>
            {Loading &&
                <div>Loading...</div>}
        </div>
    )
}

export default Home