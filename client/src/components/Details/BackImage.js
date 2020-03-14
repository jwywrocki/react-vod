import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

function BackImage(props) {
    return (
        <div style={{
            backgroundImage: `url(${props.image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            height: 'calc(100vh - 65px)',
            overflow: 'hidden',
        }}>

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