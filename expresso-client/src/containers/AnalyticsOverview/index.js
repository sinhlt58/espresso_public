import React, { Component } from 'react';
import { Layout, Menu, Spin } from 'antd';
import { getBrand } from '../../graphql-client/api';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class AnalyticsOverview extends Component {
  state = {
    loading: true,
    data: {},
  };

  componentDidMount() {
    getBrand(this.props.match.params.name).then((res) => {
      this.setState({
        loading: false,
        data: res.data.getBrand,
      });
    });
  }

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
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
              Expresso
            </h2>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Từ khoá</Menu.Item>
            <Menu.Item key="2">Khảo sát</Menu.Item>
            <Menu.Item key="3">So sánh</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ display: 'flex', flexDirection: 'row' }}>
          <Menu
            theme="dark"
            onClick={this.handleClick}
            style={{
              width: 200,
              display: 'flex',
              flexDirection: 'column',
              padding: '30px 0px 0px 0px',
            }}
            defaultSelectedKeys={['a']}
            mode="inline"
          >
            <Menu.Item key="a">Tổng quan</Menu.Item>
            <Menu.Item key="b">Chi tiết</Menu.Item>
          </Menu>
          <div style={{ width: '100%' }}>
            <h2 style={{ margin: '10px 0px 0px 30px' }}>
              Kết quả phân tích liên quan đến từ khoá:{' '}
              <p style={{ color: 'red', fontWeight: '500', display: 'inline' }}>
                {this.props.match.params.name}
              </p>{' '}
            </h2>
            {this.state.loading ? (
              <Spin style={{ margin: '0px 0px 0px 50%' }} size="large" />
            ) : (
              <div>
                <h2 style={{ margin: '10px 0px 0px 30px' }}>
                  Tổng số bình luận:{' '}
                  <p
                    style={{
                      color: 'red',
                      fontWeight: '500',
                      display: 'inline',
                    }}
                  >
                    {this.state.data.totalCmt}
                  </p>{' '}
                </h2>
                <h2 style={{ margin: '10px 0px 0px 30px' }}>
                  Đánh giá trung bình:{' '}
                  <p
                    style={{
                      color: 'red',
                      fontWeight: '500',
                      display: 'inline',
                    }}
                  >
                    {this.state.data.rate.average.toFixed(2)}
                  </p>{' '}
                </h2>
              </div>
            )}
          </div>
        </Content>
      </Layout>
    );
  }
}

export default AnalyticsOverview;
