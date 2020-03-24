import React, { useEffect, useState } from 'react'

import { Grid, Button, makeStyles } from '@material-ui/core';

import { API_KEY, API_URL, IMAGE_URL } from '../../Config'
import TvCard from './TvCard';

import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    loading: {
        margin: '0 auto',
        fontSize: '40px'
    },
}))

function TvList(props) {
    const classes = useStyles();

    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [CurrentPage, setCurrentPage] = useState(0);

    async function fetchData(endpoint) {
        await fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result);
                setData([...Data, ...result.results])
                setCurrentPage(result.page)
            }, setLoading(false))
            .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        const endpoint = `${API_URL}tv/${props.type}?api_key=${API_KEY}&language=pl&page=1`;
        fetchData(endpoint);
    }, []);

    const handleLoadMore = () => {
        let endpoint = `${API_URL}tv/${props.type}?api_key=${API_KEY}&language=pl&page=${CurrentPage + 1}`;
        fetchData(endpoint);
    }
    return (
        <div>
            <Grid container spacing={3}>
                {Loading === true ? <div className={classes.loading}>TEST<CircularProgress /></div> : null}
                {Data && Data.map((data, index) => (
                    <React.Fragment key={index}>
                        <TvCard
                            image={data.poster_path && `${IMAGE_URL}w500${data.poster_path}`}
                            Id={data.id}
                            Title={data.name}
                            Pop={data.popularity}
                            Votes={data.vote_count}
                            Rate={data.vote_average}
                            ReDate={data.first_air_date}
                        />
                    </React.Fragment>
                ))}
            </Grid>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleLoadMore} variant="contained" color="primary">Załaduj więcej</Button>
            </div>
        </div>
    );
}

export default TvList;