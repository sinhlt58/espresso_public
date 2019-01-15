import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const SideMenu = (props) => (
  <Menu
    theme="dark"
    onClick={props.handleClick}
    style={props.style}
    defaultSelectedKeys={props.path}
    mode="inline"
  >
    <Menu.Item key="analytics">
      <Link to={`/analytics/${props.brand}`}>Chi tiết</Link>
    </Menu.Item>
    <Menu.Item key="reports">
      <Link to={`/reports/${props.brand}`}>Báo cáo</Link>
    </Menu.Item>
  </Menu>
);

export default SideMenu;
