import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL, IMAGE_URL } from '../Config';
import BackImage from '../Details/BackImage';
import { Descriptions } from 'antd';

function TvDetails(props) {
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
            {Tv &&
                <BackImage
                    image={`${IMAGE_URL}w1280${Tv.backdrop_path && Tv.backdrop_path}`}
                    title={Tv.name}
                    text={Tv.overview} />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button>Dodaj do ulubionych</button>
                </div>

                <Descriptions title="Informacje" bordered>
                    <Descriptions.Item label="Tytuł">{Tv.title}</Descriptions.Item>
                    <Descriptions.Item label="Ocena">{Tv.vote_average}</Descriptions.Item>
                    <Descriptions.Item label="Głosów">{Tv.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="Popularność">{Tv.popularity}</Descriptions.Item>
                    <Descriptions.Item label="Data wydania">{Tv.release_date}</Descriptions.Item>
                    <Descriptions.Item label="Czas trwania">{Tv.runtime}</Descriptions.Item>
                    <Descriptions.Item label="Dochód">{Tv.revenue}</Descriptions.Item>
                    <Descriptions.Item label="Stan">{Tv.status}</Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    );
}

export default TvDetails;