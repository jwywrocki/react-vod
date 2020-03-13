import React from 'react';
import { Col, Card, Descriptions } from 'antd';

const { Meta } = Card;

function MovieList(props) {
    return (
        <Col lg={6} md={8} xs={24}>

            <Card
                hoverable
                style={{ width: '240px' }}
                cover={<img alt='img' src={props.image} />}
                extra={<a href={`/movie/${props.movieId}`}></a>}
            >
                <Meta
                    title={props.movieTitle}
                    description={
                        <Descriptions size='small'>
                            <Descriptions.Item label='Popularność: '>{props.moviePop}</Descriptions.Item>
                            <Descriptions.Item label='Głosów: '>{props.movieRateC}</Descriptions.Item>
                            <Descriptions.Item label='Ocena: '>{props.movieRate}</Descriptions.Item>
                            <Descriptions.Item label='Publikacja: '>{props.movieDate}</Descriptions.Item>
                        </Descriptions>
                    }
                />
            </Card>,
            {/* <div style={{ position: 'relative' }}>
                <a href={`/movie/${props.movieId}`}>
                    <img style={{ height: '320px' }} alt='img' src={props.image} />
                </a>

            </div> */}
        </Col>
    );
}

export default MovieList;