import React, { useEffect, useState } from 'react'

import { Grid, Button } from '@material-ui/core';

import { API_KEY, API_URL, IMAGE_URL } from '../Config'
import MovieCard from './MovieCard';

function CardList(props) {
    const [CurrentPage, setCurrentPage] = useState(0);
    const [Loading, setLoading] = useState(true);

    const [Data, setData] = useState([]);
    const fetchData = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result);
                setData([...Data, ...result.results])
                setCurrentPage(result.page)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            );
    };

    useEffect(() => {
        const endpoint = `${API_URL}${props.request}/${props.type}?api_key=${API_KEY}&language=pl&page=1`;
        fetchData(endpoint);
    }, []);

    const handleLoadMore = () => {
        let endpoint = `${API_URL}${props.request}/${props.type}?api_key=${API_KEY}&language=pl&page=${CurrentPage + 1}`;
        fetchData(endpoint);
    }

    return (
        <div>
            <Grid container spacing={3}>
                {Data && Data.map((data, index) => (
                    <React.Fragment key={index}>
                        {`${props.request}` === 'movie' &&
                            <MovieCard
                                image={data.poster_path && `${IMAGE_URL}w500${data.poster_path}`}
                                Id={data.id}
                                Title={data.title}
                                Pop={data.popularity}
                                Votes={data.vote_count}
                                Rate={data.vote_average}
                                ReDate={data.release_date}
                                request={`${props.request}`}
                            />
                        }
                        {`${props.request}` === 'tv' &&
                            <MovieCard
                                image={data.poster_path && `${IMAGE_URL}w500${data.poster_path}`}
                                Id={data.id}
                                Title={data.name}
                                Pop={data.popularity}
                                Votes={data.vote_count}
                                Rate={data.vote_average}
                                ReDate={data.first_air_date}
                                request={`${props.request}`}
                            />
                        }
                    </React.Fragment>
                ))}
            </Grid>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleLoadMore} variant="contained" color="primary">Załaduj więcej</Button>
            </div>
            {Loading &&
                <div>Loading...</div>}
        </div>
    );
}

export default CardList;