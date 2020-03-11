import React from 'react';
import { Menu } from 'antd';

function NavLeft(props) {
  return (
    <Menu mode={props.mode} style={{ borderStyle: 'none', backgroundColor: '#001529' }}>
      <Menu.Item style={{ height: '40px' }}>
        <a href="/">Filmy</a>
      </Menu.Item>
      <Menu.Item style={{ height: '40px' }}>
        <a href="/">Seriale</a>
      </Menu.Item>
    </Menu>
  )
}

export default NavLeft