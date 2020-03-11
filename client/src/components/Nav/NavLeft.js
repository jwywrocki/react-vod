import React from 'react';
import { Menu } from 'antd';

function NavLeft(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item>
        <a href="/">Filmy</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/">Seriale</a>
      </Menu.Item>
    </Menu>
  )
}

export default NavLeft