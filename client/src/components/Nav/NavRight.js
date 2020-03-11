import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function NavRight(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`api/users/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Wylogowanie nie powiodło się')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode} style={{ borderStyle: 'none', backgroundColor: '#001529' }}>
        <Menu.Item key="mail" style={{ height: '40px' }}>
          <a href="/login">Zaloguj</a>
        </Menu.Item>
        <Menu.Item key="app" style={{ height: '40px' }}>
          <a href="/register">Zarejestruj</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode} style={{ borderStyle: 'none', backgroundColor: '#001529' }}>
        <Menu.Item key="logout" style={{ height: '40px' }}>
          <a onClick={logoutHandler}>Wyloguj</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(NavRight);