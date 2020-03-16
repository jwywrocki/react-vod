import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL, IMAGE_URL } from '../Config';
import BackImage from '../Details/BackImage';
import { Descriptions } from 'antd';

function MovieDetails(props) {
    const [Movie, setMovie] = useState([])
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
            {Movie &&
                <BackImage
                    image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`}
                    title={Movie.title}
                    text={Movie.overview} />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button>Dodaj do ulubionych</button>
                </div>

                <Descriptions title="Informacje" bordered>
                    <Descriptions.Item label="Tytuł">{Movie.title}</Descriptions.Item>
                    <Descriptions.Item label="Ocena">{Movie.vote_average}</Descriptions.Item>
                    <Descriptions.Item label="Głosów">{Movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="Popularność">{Movie.popularity}</Descriptions.Item>
                    <Descriptions.Item label="Data wydania">{Movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="Czas trwania">{Movie.runtime}</Descriptions.Item>
                    <Descriptions.Item label="Dochód">{Movie.revenue}</Descriptions.Item>
                    <Descriptions.Item label="Stan">{Movie.status}</Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    );
}

export default MovieDetails;