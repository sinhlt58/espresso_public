import React from 'react';
import { Menu } from 'antd';

const SideMenu = (props) => (
  <Menu
    theme="dark"
    onClick={props.handleClick}
    style={{
      width: 200,
      display: 'flex',
      flexDirection: 'column',
      padding: '30px 0px 0px 0px',
    }}
    defaultSelectedKeys={props.path}
    mode="inline"
  >
    <Menu.Item key="overview">Tổng quan</Menu.Item>
    <Menu.Item key="detail">Chi tiết</Menu.Item>
  </Menu>
);

export default SideMenu;
