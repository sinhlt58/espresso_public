import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

class Wrapper extends Component {
  render() {
    return (
      <Layout style={this.props.style}>
        <Header>
          <div
            className="logo"
            style={{
              float: 'left',
              color: '#FFF',
              margin: '0px 150px 0px 0px',
            }}
          >
            <Link to="/">
              <h2 style={{ margin: '0px 0px 0px 0px', color: '#FFF' }}>
                Espresso
              </h2>
            </Link>
          </div>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Chi tiết</Menu.Item>
            <Menu.Item key="2">Báo cáo</Menu.Item>
            <Menu.Item key="3">So sánh</Menu.Item>
            <Menu.Item key="4">
              <Link to="/sentiment">Sentiment</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>{this.props.children}</Content>
      </Layout>
    );
  }
}

export default Wrapper;
