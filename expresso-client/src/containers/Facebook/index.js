import React, { Component } from 'react';
import Wrapper from '../../hoc/Wrapper';
import { Row, Col, message, Button, Spin, List } from 'antd';
import { getFbPages } from '../../graphql-client/api';

class Facebook extends Component {
  state = {
    initLoading: true,
    loading: true,
    offset: 0,
    data: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const res = await getFbPages(
      this.props.match.params.name,
      this.state.offset,
    );

    if (res.networkStatus === 7) {
      if (res.data.getFacebookPage.length === 0) {
        message.success('Đã tải hết toàn bộ các page');
        this.setState({
          loading: false,
          initLoading: false,
        });
      } else {
        const data = [...this.state.data, ...res.data.getFacebookPage];
        const newOffset = this.state.offset + 10;
        this.setState({
          initLoading: false,
          loading: false,
          data: data,
          offset: newOffset,
        });
      }
    } else {
      message.error('Có lỗi xảy ra vui lòng thử lại');
      this.setState({
        loading: false,
        initLoading: false,
      });
    }
  };

  onLoadMore = async () => {
    await this.setState({
      loading: true,
    });

    this.getData();
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
      <Wrapper
        location={this.props.location.pathname}
        brand={this.props.match.params.name}
      >
        <Row style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '20px 0px 0px 50px' }}>
            Các page liên quan đến từ khoá:{' '}
            <p style={{ color: 'red', fontWeight: '500', display: 'inline' }}>
              {this.props.match.params.name}
            </p>{' '}
          </h2>
        </Row>
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

export default Facebook;
