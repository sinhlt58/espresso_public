import React, { Component } from 'react';
import { Table, Input, Row, Col, message, DatePicker, Cascader } from 'antd';
import { Link } from 'react-router-dom';
import Wrapper from '../../hoc/Wrapper';
import { optionsType } from '../../constant';
import { getRanking } from '../../graphql-client/api';
import moment from 'moment';

class BrandRanking extends Component {
  state = {
    data: [],
    loading: true,
    to: moment(),
    from: moment(1262304000000),
    optionsType: ['brand'],
  };

  componentDidMount() {
    this.getRank();
  }

  getRank = async () => {
    const res = await getRanking({
      from: (this.state.from.valueOf() / 1000).toString(),
      to: (this.state.to.valueOf() / 1000).toString(),
      by: this.state.optionsType[0],
    });

    if (res.networkStatus === 7) {
      this.setState({
        loading: false,
        data: res.data.getAllBrand,
      });
    } else {
      message.error('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  _onChangeType = async (text) => {
    await this.setState({
      optionsType: text,
      loading: true,
    });

    this.getRank();
  };

  handleFromPanelChange = async (date) => {
    await this.setState({
      from: date,
      loading: true,
    });

    this.getRank();
  };

  handleToPanelChange = async (date) => {
    await this.setState({
      to: date,
      loading: true,
    });

    this.getRank();
  };

  render() {
    const columns = [
      {
        title: 'Tên thương hiệu',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <Link to={`/analytics/${text}`}>{text}</Link>,
      },
      {
        title: 'Số lượng bình luận',
        dataIndex: 'totalCmts',
        key: 'totalCmts',
        sorter: (a, b) => a.totalCmts - b.totalCmts,
      },
      {
        title: 'Số lượng bình luận tốt',
        dataIndex: 'positive',
        key: 'positive',
        sorter: (a, b) => a.positive - b.positive,
      },
      {
        title: 'Số lượng bình luận xấu',
        dataIndex: 'negative',
        key: 'negative',
        sorter: (a, b) => a.negative - b.negative,
      },
      {
        title: 'Đánh giá trung bình',
        dataIndex: 'avg',
        key: 'avg',
        sorter: (a, b) => a.avg - b.avg,
      },
    ];

    return (
      <Wrapper location={this.props.location.pathname} isHome>
        <Row style={{ marginTop: 20 }}>
          <Col md={1} />
          <Col md={5}>
            <h2>Phân loại</h2>
            <Cascader
              options={optionsType}
              style={{ width: '100%', marginBottom: '20px' }}
              value={this.state.optionsType}
              onChange={this._onChangeType}
            />
          </Col>
          <Col md={3} />
          <Col md={10}>
            <Col md={12}>
              <h2>Từ</h2>
              <DatePicker
                placeholder="Chọn ngày"
                onChange={this.handleFromPanelChange}
                value={this.state.from}
              />
            </Col>
            <Col md={12}>
              <h2>Đến</h2>
              <DatePicker
                placeholder="Chọn ngày"
                onChange={this.handleToPanelChange}
                value={this.state.to}
              />
            </Col>
          </Col>
        </Row>
        <Row
          style={{
            marginTop: '30px',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          <h2>Các thương hiệu hiện có: </h2>
          <Col md={2} />
          <Col md={20}>
            <Table
              columns={columns}
              dataSource={this.state.data}
              bordered
              loading={this.state.loading}
            />
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default BrandRanking;
