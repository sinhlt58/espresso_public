import React, { Component } from 'react';
import { Layout, Input } from 'antd';

const { Header, Content, Footer } = Layout;
const Search = Input.Search;

class Dashboard extends Component {
  _onSearch = (value) => {
    if (value.trim() === '' || value === undefined) {
      alert('Vui lòng nhập tên thương hiệu trước khi tiếp tục');
    } else {
      this.props.history.push(`/analytics/overview/${value}`);
    }
  };

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <h2 style={{ color: '#FFF' }}>Expresso</h2>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ textAlign: 'center', marginTop: 80 }}>
            <h1>Nhập tên thương hiệu muốn phân tích</h1>
            <Search
              style={{ width: '60%' }}
              placeholder=""
              onSearch={this._onSearch}
              enterButton
              size="large"
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'right' }}>Expresso ©2018</Footer>
      </Layout>
    );
  }
}

export default Dashboard;
