import React, { useEffect, useState } from 'react'

import { Grid, Button, Box } from '@material-ui/core';

import { API_KEY, API_URL, IMAGE_URL } from '../../Config'
import PersonCard from './PersonCard';

import CircularProgress from '@material-ui/core/CircularProgress';

function PersonsList() {
    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [CurrentPage, setCurrentPage] = useState(0);
    const [TotalPages, setTotalPages] = useState(0);

    async function fetchData(endpoint) {
        await fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setData([...Data, ...result.results]);
                setTotalPages(result.total_pages);
                setCurrentPage(result.page);
                setLoading(false);
            })
            .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        const endpoint = `${API_URL}person/popular?api_key=${API_KEY}&language=pl&page=1`;
        fetchData(endpoint);
    }, []);

    const handleLoadMore = () => {
        let endpoint = `${API_URL}person/popular?api_key=${API_KEY}&language=pl&page=${CurrentPage + 1}`;
        fetchData(endpoint);
    }
    return (
        <div>
            <div id="back-to-top-anchor"></div>
            <Grid container spacing={3}>
                {Loading &&
                    <Box display="flex" justifyContent="center" my={3} flexGrow={1}>
                        <CircularProgress size={50} disableShrink />
                    </Box>
                }
                {Data && Data.map((data, index) => (
                    <React.Fragment key={index}>
                        <PersonCard
                            image={data.profile_path && `${IMAGE_URL}w500${data.profile_path}`}
                            id={data.id}
                            name={data.name}
                            knownFor={data.known_for}
                        />
                    </React.Fragment>
                ))}
            </Grid>
            <br />
            <Box display="flex" justifyContent="center" my={3} flexGrow={1}>
                {CurrentPage !== TotalPages
                    ? <Button onClick={handleLoadMore} variant="contained" color="primary">Załaduj więcej</Button>
                    : <Button variant="contained" disabled>Załaduj więcej</Button>
                }
            </Box>
        </div>
    );
}

export default PersonsList;