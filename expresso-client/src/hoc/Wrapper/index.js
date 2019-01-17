import React, { Component } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import SideMenu from '../../components/SideMenu';

const { Header, Content } = Layout;

class Wrapper extends Component {
  state = {
    selectedMenu: '',
  };

  componentWillMount() {
    this.setState({
      selectedMenu: this.props.location.split('/')[1],
    });
  }

  render() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    let sentimentNav = <Menu.Item key="sentiment">
                          <Link to="/sentiment">Sentiment</Link>
                       </Menu.Item>
    if (!isDevelopment) {
      sentimentNav = '';
    }

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
            defaultSelectedKeys={[this.state.selectedMenu]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="compare">
              <Link to={`/compare`}>So sánh</Link>
            </Menu.Item>
            <Menu.Item key="products">
              <Link to="/products">Sản phẩm</Link>
            </Menu.Item>
            {sentimentNav}
          </Menu>
        </Header>
        <Row
          style={{
            display: '-webkit-flex',
            display: '-ms-flexbox',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {this.props.isHome ? null : (
            <SideMenu
              path={this.state.selectedMenu}
              brand={this.props.brand}
              style={{ flex: 1 }}
            />
          )}
          <Content style={{ flex: 9 }}>{this.props.children}</Content>
        </Row>
      </Layout>
    );
  }
}

export default Wrapper;
