import React, { Component } from 'react';
import { Input } from 'antd';
import Wrapper from '../../hoc/Wrapper';

const Search = Input.Search;

class Dashboard extends Component {
  _onSearch = (value) => {
    if (value.trim() === '' || value === undefined) {
      alert('Vui lòng nhập tên thương hiệu trước khi tiếp tục');
    } else {
      this.props.history.push(`/analytics/${value}`);
    }
  };

  render() {
    return (
      <Wrapper
        isHome
        location={this.props.location.pathname}
        style={{ height: '100vh' }}
      >
        <div style={{ textAlign: 'center', marginTop: 80, width: '100%' }}>
          <h1>Nhập tên thương hiệu muốn phân tích</h1>
          <Search
            className="search-dashboard"
            style={{ width: '60%' }}
            placeholder="Ví dụ: Bitis, Mango"
            onSearch={this._onSearch}
            enterButton
            size="large"
          />
        </div>
      </Wrapper>
    );
  }
}

export default Dashboard;
