import React, { Component } from 'react';
import {
  Spin,
  Rate,
  Progress,
  Row,
  Col,
  Input,
  Button,
  Cascader,
  Pagination,
  message,
  DatePicker,
} from 'antd';
import { getBrand, getComments } from '../../graphql-client/api';
import Wrapper from '../../hoc/Wrapper';
import { optionsDomain, optionsSort, optionsStar } from '../../constant';
import CustomerCmt from '../../components/Comment';
import moment from 'moment';
import localization from 'moment/locale/vi';

const Search = Input.Search;

class AnalyticsOverview extends Component {
  state = {
    loading: true,
    loadingCmt: true,
    data: {},
    starPercent: [],
    optionsDomain: ['ALL'],
    optionsSort: ['DESC'],
    optionsStar: ['0'],
    dataCmts: [],
    keyword: '',
    page: 1,
    totalCmt: 0,
    to: moment(),
    from: moment(1262304000000),
  };

  componentDidMount() {
    moment()
      .locale('vi', localization)
      .format('LLL');

    this.getBrandSummary();
    this.getCustomerComments();

    if (this.props.location.state !== undefined) {
      if (this.props.location.state.time !== undefined) {
        const { optionsSort, time } = this.props.location.state;
        this.setState({
          optionsSort: [`${optionsSort}`],
          from: moment(time.from),
          to: moment(time.to),
        });
      } else {
        const { optionsSort } = this.props.location.state;
        this.setState({
          optionsSort: [`${optionsSort}`],
        });
      }
    }
  }

  getBrandSummary = async (name, domain) => {
    await this.setState({ loading: true });

    const res = await getBrand(
      this.props.match.params.name,
      this.state.optionsDomain[0],
      'user',
    );

    if (res.networkStatus === 7) {
      await this.setState({
        loading: false,
        data: res.data.getBrand,
      });

      let starPercent = [];
      this.state.data.rate.rateCount.forEach((element, index) => {
        let temp = Number(element.star) - starPercent.length;
        if (temp - 1 === 0) {
          starPercent.push(
            Number(
              ((element.totalCmt / this.state.data.totalCmt) * 100).toFixed(2),
            ),
          );
        } else {
          for (let i = starPercent.length + 1; i < Number(element.star); i++) {
            starPercent.push(0);
          }
          starPercent.push(
            Number(
              ((element.totalCmt / this.state.data.totalCmt) * 100).toFixed(2),
            ),
          );
        }
      });

      starPercent.push(1, 2, 3, 4, 5);

      this.setState({
        starPercent,
      });
    } else {
      if (this.state.optionsDomain[0] === 'ALL') {
        message.error('Không tìm thấy thương hiệu');
        this.props.history.goBack();
      } else {
        message.error('Không tìm thấy thông tin thương hiệu ở kênh này');
      }
    }
  };

  getCustomerComments = async (keyword = this.state.keyword) => {
    await this.setState({
      keyword,
      loadingCmt: true,
    });

    const cmts = await getComments({
      offset: (this.state.page - 1) * 10,
      brand: this.props.match.params.name,
      star: this.state.optionsStar[0],
      domain: this.state.optionsDomain[0],
      sort: this.state.optionsSort[0],
      keyword: this.state.keyword,
      from: (this.state.from.valueOf() / 1000).toString(),
      to: (this.state.to.valueOf() / 1000).toString(),
    });

    if (cmts.networkStatus === 7) {
      this.setState({
        loadingCmt: false,
        dataCmts: cmts.data.getComments.comments,
        totalCmt: cmts.data.getComments.total,
      });
    } else {
      message.error('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  _onChangeSort = async (value) => {
    await this.setState({
      optionsSort: value,
      page: 1,
    });

    this.getCustomerComments();
  };

  _onChangeDomain = async (value) => {
    await this.setState({
      optionsDomain: value,
      page: 1,
    });
    this.getBrandSummary();
    this.getCustomerComments();
  };

  _onChangeStar = async (value) => {
    await this.setState({
      optionsStar: value,
      page: 1,
    });

    this.getCustomerComments();
  };

  _onClickStar = async (star) => {
    await this.setState({
      optionsStar: [`${star}`],
      page: 1,
    });

    this.getCustomerComments();
  };

  _onSearch = async (value) => {
    await this.setState({
      page: 1,
    });
    this.getCustomerComments(value);
  };

  _onChangePage = async (page) => {
    await this.setState({
      page,
    });

    this.getCustomerComments();
  };

  handleFromPanelChange = async (date, dateString) => {
    await this.setState({
      from: date,
    });

    this.getCustomerComments();
  };

  handleToPanelChange = async (date, dateString) => {
    await this.setState({
      to: date,
    });

    this.getCustomerComments();
  };

  render() {
    return (
      <Wrapper
        location={this.props.location.pathname}
        brand={this.props.match.params.name}
      >
        <Row style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '20px 0px 0px 50px' }}>
            Kết quả phân tích liên quan đến từ khoá:{' '}
            <p style={{ color: 'red', fontWeight: '500', display: 'inline' }}>
              {this.props.match.params.name}
            </p>{' '}
          </h2>
        </Row>
        <Row style={{ width: '100%', padding: '10px' }}>
          <Col md={1} />
          <Col md={5}>
            {this.state.loading ? null : (
              <div>
                <h2>Bình luận của khách hàng</h2>
                <span>
                  <Rate
                    disabled
                    value={Number(this.state.data.rate.average.toFixed(1))}
                    allowHalf={true}
                  />
                  <span className="ant-rate-text">
                    <h2>{this.state.data.totalCmt}</h2>
                  </span>
                </span>
                <p>{this.state.data.rate.average.toFixed(2)} out of 5 stars</p>
                {this.state.starPercent.map((item, index) => {
                  if (index >= 5) return null;
                  return (
                    <Button
                      onClick={() =>
                        this._onClickStar(this.state.starPercent[index + 5])
                      }
                      key={index}
                      block
                      ghost
                      style={{ padding: 0 }}
                    >
                      <p
                        style={{
                          paddingRight: '20px',
                          display: 'inline',
                        }}
                      >
                        {this.state.starPercent[index + 5]} star
                      </p>
                      <Progress
                        percent={this.state.starPercent[index]}
                        style={{ width: '80%' }}
                      />
                    </Button>
                  );
                })}
              </div>
            )}
          </Col>
          <Col md={2} />
          <Col md={14}>
            <Search
              placeholder="Nhập từ khoá để tìm kiếm bình luận"
              onSearch={this._onSearch}
              enterButton
              style={{ width: '100%', marginBottom: '20px', marginTop: '20px' }}
            />

            <Row>
              <Col md={7}>
                <h2>Sắp xếp</h2>
                <Cascader
                  options={optionsSort}
                  style={{ width: '100%', marginBottom: '20px' }}
                  value={this.state.optionsSort}
                  onChange={this._onChangeSort}
                />
              </Col>
              <Col md={1} />
              <Col md={16}>
                <h2>Lọc</h2>
                <Row>
                  <Col md={10}>
                    <Cascader
                      options={optionsDomain}
                      style={{ width: '100%', marginBottom: '20px' }}
                      value={this.state.optionsDomain}
                      onChange={this._onChangeDomain}
                    />
                  </Col>
                  <Col md={2} />
                  <Col md={10}>
                    <Cascader
                      options={optionsStar}
                      style={{ width: '100%', marginBottom: '20px' }}
                      value={this.state.optionsStar}
                      onChange={this._onChangeStar}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col md={16}>
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
          </Col>
        </Row>
        <hr
          style={{
            alignSelf: 'center',
            width: '95%',
            marginTop: '30px',
            marginBottom: '30px',
          }}
        />
        <Row>
          <Col span={1} />
          <Col span={23}>
            {this.state.loadingCmt ? (
              <Spin style={{ margin: '0px 0px 0px 50%' }} size="large" />
            ) : (
              this.state.dataCmts.map((item, index) => (
                <CustomerCmt
                  key={item.id}
                  author={item.author}
                  rate={item.rate}
                  content={item.content}
                  date={Number(item.date)}
                  url={item.product.source.url}
                  sentimentStar={item.sentimentStar}
                />
              ))
            )}
          </Col>
        </Row>
        <Row>
          <Col span={1} />
          <Pagination
            current={this.state.page}
            total={this.state.totalCmt}
            onChange={this._onChangePage}
            pageSize={10}
            style={{ marginBottom: '30px' }}
          />
        </Row>
      </Wrapper>
    );
  }
}

export default AnalyticsOverview;
