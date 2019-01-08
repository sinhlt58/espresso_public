import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

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
            <h2 style={{ margin: '0px 0px 0px 0px', color: '#FFF' }}>
              Espresso
            </h2>
          </div>
          {this.props.isHome ? null : (
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">Chi tiết</Menu.Item>
              <Menu.Item key="2">Báo cáo</Menu.Item>
              <Menu.Item key="3">So sánh</Menu.Item>
            </Menu>
          )}
        </Header>
        <Content>{this.props.children}</Content>
      </Layout>
    );
  }
}

export default Wrapper;
