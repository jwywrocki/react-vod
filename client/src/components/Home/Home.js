import React, { useEffect, useState } from 'react'

import { Grid, Typography, Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { API_KEY, API_URL, IMAGE_URL } from '../Config'
import MovieList from './MovieList';
import ScrollTop from './ScrollTop';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '1000px',
        [theme.breakpoints.up('xl')]: {
            maxWidth: '2000px',
        },
        margin: '0 auto',
        padding: theme.spacing(2),
    },
}));



function Home(props) {
    const classes = useStyles();
    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)
    const [Loading, setLoading] = useState(true)

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setMovies([...Movies, ...result.results])
                setCurrentPage(result.page)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    };

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=pl&page=1`
        fetchMovies(endpoint)
    }, []);

    const handleLoadMore = () => {
        let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=pl&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)
    }

    return (
        <div className={classes.root}>
            <Typography id="back-to-top-anchor" gutterBottom variant="h5" component="h2">
                Poplarne filmy
            </Typography>
            <Grid container spacing={3}>
                {Movies && Movies.map((movie, index) => (
                    <React.Fragment key={index}>
                        <MovieList
                            image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                            movieId={movie.id}
                            movieTitle={movie.title}
                            moviePop={movie.popularity}
                            movieVotes={movie.vote_count}
                            movieRate={movie.vote_average}
                            movieDate={movie.release_date}
                        />
                    </React.Fragment>
                ))}
            </Grid>

            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleLoadMore} variant="contained" color="primary">Załaduj więcej</Button>
            </div>
            <ScrollTop {...props}>
            </ScrollTop>
            {Loading &&
                <div>Loading...</div>}
        </div>
    )
}

export default Home