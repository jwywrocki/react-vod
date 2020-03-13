import React, { useState } from 'react';
import NavLeft from './NavLeft';
import NavRight from './NavRight';
import { Menu, Drawer, Button } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import './styles.css';

function Nav() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <Menu theme="dark">

      <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
        <div className="menu__logo">
          <a href="/"><img src='../pixie1.png' height="50px" alt="Logo"></img></a>
        </div>
        <div className="menu__container">
          <div className="menu_left">
            <NavLeft mode="horizontal" />
          </div>
          <div className="menu_rigth">
            <NavRight mode="horizontal" />
          </div>
          <Button
            className="menu__mobile-button"
            type="primary"
            onClick={showDrawer}
          >
            <BarsOutlined />
          </Button>
          <Drawer
            title=""
            placement="right"
            className="menu_drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <NavLeft mode="inline" />
            <NavRight mode="inline" />
          </Drawer>
        </div>
      </nav>
    </Menu>
  )
}

export default Nav