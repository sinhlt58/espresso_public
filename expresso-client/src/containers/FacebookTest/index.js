import React, { Component } from 'react';
import { Input, Button, Spin, Row, Col, message, List } from 'antd';
import Wrapper from '../../hoc/Wrapper';
import { getFbPages } from '../../graphql-client/api';

const Search = Input.Search;

class FacebookTest extends Component {
  state = {
    initLoading: false,
    loading: false,
    offset: 0,
    data: [],
  };

  getData = async (name) => {
    const res = await getFbPages(name, this.state.offset);

    if (res.networkStatus === 7) {
      if (res.data.getFacebookPage.length === 0) {
        if (this.state.data.length === 0) {
          message.warning('Không tìm thấy thương hiệu');
        } else {
          message.success('Đã tải hết toàn bộ các page');
          this.setState({
            loading: false,
            initLoading: false,
            name,
          });
        }
      } else {
        const data = [...this.state.data, ...res.data.getFacebookPage];
        const newOffset = this.state.offset + 10;
        this.setState({
          initLoading: false,
          loading: false,
          data: data,
          offset: newOffset,
          name,
        });
      }
    } else {
      message.error('Có lỗi xảy ra vui lòng thử lại');
      this.setState({
        loading: false,
        initLoading: false,
        name,
      });
    }
  };

  onLoadMore = async () => {
    await this.setState({
      loading: true,
    });

    this.getData(this.state.name);
  };

  _onSearch = async (text) => {
    await this.setState({
      data: [],
      offset: 0,
    });
    this.getData(text);
  };

  render() {
    const { initLoading, loading } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>More</Button>
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Spin />
        </div>
      );
    return (
      <Wrapper isHome location={this.props.location.pathname}>
        <div
          style={{
            textAlign: 'center',
            marginTop: 80,
            width: '100%',
            marginBottom: 100,
          }}
        >
          <h1>Nhập tên thương hiệu</h1>
          <Search
            className="search-dashboard"
            placeholder="Ví dụ: Bitis, Mango"
            onSearch={this._onSearch}
            enterButton
            size="large"
            style={{ width: '80%' }}
          />
        </div>
        <List
          style={{ marginLeft: '5%' }}
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={this.state.data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <a target="_blank" href={item.url}>
                    {item.name}
                  </a>
                }
                description={`${Number(
                  item.likes_count,
                ).toLocaleString()} lượt thích ${
                  item.location === null ? '' : `- ${item.location}`
                }`}
              />
            </List.Item>
          )}
        />
      </Wrapper>
    );
  }
}

export default FacebookTest;
