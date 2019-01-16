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
        <div style={{ width: '800px', margin: '20px auto' }}>
          <h4>
            Phần mềm giúp phân tích, so sánh các thương hiệu, shop thời trang
            trên các website thương mại điện tử như shopee.vn, lazada.vn,
            tiki.vn, …, facebook. Với hơn 500,000+ nhãn hàng và 1,000,000+ bình
            luận.
          </h4>
        </div>
      </Wrapper>
    );
  }
}

export default Dashboard;
