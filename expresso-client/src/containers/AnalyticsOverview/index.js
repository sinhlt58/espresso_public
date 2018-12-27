import React, { Component } from 'react';
import { Spin } from 'antd';
import { getBrand } from '../../graphql-client/api';
import Wrapper from '../../hoc/Wrapper';
import SideMenu from '../../components/SideMenu';

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

  _handleClick = (e) => {
    if (e.key === 'detail') {
      this.props.history.replace(
        `/analytics/detail/${this.props.match.params.name}`,
      );
    }
  };

  render() {
    return (
      <Wrapper>
        <SideMenu path="overview" handleClick={this._handleClick} />
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
      </Wrapper>
    );
  }
}

export default AnalyticsOverview;
