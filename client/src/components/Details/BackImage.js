import React from 'react';
import { Typography } from 'antd';
const { Title } = Typography;

function BackImage(props) {
    return (
        <div
            style={{
                background:
                    `linear-gradient(to bottom,
                    rgba(0,0,0,.5) 33%,
                    rgba(0,0,0,.75) 66%,
                    rgba(0,0,0,1) 100%),
                    url('${props.image}'),
                    #1c1c1c`,
                height: '100vh',
                backgroundSize: '100%, cover',
                backgroundPosition: 'center, center',
                width: '100%',
                position: 'relative',
                zIndex: '1',
            }}
        >
            <div>
                <div style={{ position: 'absolute', maxWidth: '500px', bottom: '25px', marginLeft: '25px' }} >
                    <Title style={{ color: 'white' }} level={2} > {props.title} </Title>
                    <p style={{ color: 'white', fontSize: '16px' }}>{props.text} </p>
                </div>
            </div>
        </div>
    );
}

export default BackImage;