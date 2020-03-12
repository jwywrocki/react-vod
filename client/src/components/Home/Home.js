import React, { useEffect } from 'react'
import { API_KEY, API_URL } from '../Config'

import { Typography, Row } from 'antd';
const { Title } = Typography;

function Home() {

    useEffect(() => {
        fetch(`${API_URL}movie/popular?api_key=${API_KEY}&language=pl&page=1`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
    }, [])

    return (
        <div style={{ width: '100%', margin: 0 }}>
            <div style={{ width: '85%', margin: '60px auto' }}>
                <Title level={2}>Popularne filmy</Title>
                <hr />
                <Row gutter={[16, 16]}>


                </Row>

                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button>Załaduj więcej</button>
                </div>
            </div>
        </div>
    )
}

export default Home