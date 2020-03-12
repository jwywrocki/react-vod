import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_URL } from '../Config'

import { Typography, Row } from 'antd';
import List from './List';
const { Title } = Typography;

function Home() {

    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=pl&page=1`
        fetchMovies(endpoint)
    }, [])

    const fetchMovies = (path) => {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovies([...Movies, ...response.results])
                setCurrentPage(response.page)
            })
    }

    const handleClick = () => {
        let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=pl&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)
    }

    return (
        <div style={{ width: '100%', margin: 0 }}>
            <div style={{ width: '85%', margin: '60px auto' }}>
                <Title level={2}>Popularne filmy</Title>
                <hr />
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <List
                                image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                                movieId={movie.id}
                            />
                        </React.Fragment>
                    ))}

                </Row>

                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={handleClick}>Załaduj więcej</button>
                </div>
            </div>
        </div>
    )
}

export default Home