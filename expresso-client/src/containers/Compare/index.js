import React, { Component } from 'react';
import moment from 'moment';
import {
  Spin,
  Row,
  Col,
  Button,
  Cascader,
  DatePicker,
  message,
  Input,
  Rate,
} from 'antd';
import Wrapper from '../../hoc/Wrapper';
import { optionsDomain, optionsRange } from '../../constant';
import { getHistogram, getBrand } from '../../graphql-client/api';
import CompareResult from '../../components/CompareResult';

const Search = Input.Search;
const MonthPicker = DatePicker.MonthPicker;

const PICKER_FORMAT = {
  date: {
    placeholder: 'Chọn ngày',
  },
  month: {
    placeholder: 'Chọn tháng',
  },
};

class Compare extends Component {
  state = {
    loadingA: true,
    loadingB: true,
    from: moment(new Date()).startOf('month'),
    to: moment(new Date()).endOf('month'),
    placeholder: PICKER_FORMAT['date'].placeholder,
    optionsDomain: ['ALL'],
    optionRange: ['date'],
    brandA: '',
    dataA: [],
    dataHistogramA: [],
    starPercentA: [],
    brandB: '',
    dataB: [],
    dataHistogramB: [],
    starPercentB: [],
  };

  _onSearchA = async (text) => {
    if (text === undefined) {
      text = this.state.brandA;
    } else {
      this.setState({ brandA: text.toLowerCase() });
    }

    const res = await getBrand(text.toLowerCase(), this.state.optionsDomain[0]);

    if (res.networkStatus === 7) {
      await this.setState({
        dataA: res.data.getBrand,
      });

      let starPercent = [];
      this.state.dataA.rate.rateCount.forEach((element, index) => {
        starPercent.push({
          x: `${element.star}*`,
          y: Number(
            ((element.totalCmt / this.state.dataA.totalCmt) * 100).toFixed(2),
          ),
        });
      });

      this.setState({ starPercentA: starPercent });
    } else {
      if (this.state.optionsDomain[0] === 'ALL') {
        message.error('Không tìm thấy thương hiệu');
      } else {
        message.error('Không tìm thấy thông tin thương hiệu ở kênh này');
      }
    }

    const response = await getHistogram({
      brandName: text.toLowerCase(),
      from: (this.state.from.valueOf() / 1000).toString(),
      to: (this.state.to.valueOf() / 1000).toString(),
      interval: 86400,
      domain: this.state.optionsDomain[0],
    });

    if (response.networkStatus === 7) {
      if (response.data.brandHistogram.length > 0) {
        this.setState({
          loadingA: false,
          dataHistogramA: response.data.brandHistogram,
        });
      } else {
        message.warn(
          'Không có bình luận nào trong khoảng thời gian hoặc kênh này',
        );
      }
    } else {
      message.error('Có lỗi xảy ra vui lòng thử lại');
    }
  };

  _onSearchB = async (text) => {
    if (text === undefined) {
      text = this.state.brandB;
    } else {
      this.setState({ brandB: text.toLowerCase() });
    }
    const res = await getBrand(text.toLowerCase(), this.state.optionsDomain[0]);
    if (res.networkStatus === 7) {
      await this.setState({
        dataB: res.data.getBrand,
      });

      let starPercent = [];
      this.state.dataB.rate.rateCount.forEach((element, index) => {
        starPercent.push({
          x: `${element.star}*`,
          y: Number(
            ((element.totalCmt / this.state.dataB.totalCmt) * 100).toFixed(2),
          ),
        });
      });

      this.setState({ starPercentB: starPercent });
    } else {
      if (this.state.optionsDomain[0] === 'ALL') {
        message.error('Không tìm thấy thương hiệu');
      } else {
        message.error('Không tìm thấy thông tin thương hiệu ở kênh này');
      }
    }

    const response = await getHistogram({
      brandName: text.toLowerCase(),
      from: (this.state.from.valueOf() / 1000).toString(),
      to: (this.state.to.valueOf() / 1000).toString(),
      interval: 86400,
      domain: this.state.optionsDomain[0],
    });

    if (response.networkStatus === 7) {
      if (response.data.brandHistogram.length > 0) {
        this.setState({
          loadingB: false,
          dataHistogramB: response.data.brandHistogram,
        });
      } else {
        message.warn(
          'Không có bình luận nào trong khoảng thời gian hoặc kênh này',
        );
      }
    } else {
      message.error('Có lỗi xảy ra vui lòng thử lại');
    }
  };

  _onChangeDomain = async (value) => {
    await this.setState({
      optionsDomain: value,
    });

    if (this.state.brandA !== '') {
      this._onSearchA();
    }

    if (this.state.brandB !== '') {
      this._onSearchB();
    }
  };

  _onChangeRange = async (value) => {
    // await this.setState({
    //   optionRange: value,
    //   placeholder: PICKER_FORMAT[value[0]].placeholder,
    // });
  };

  handleFromPanelChange = async (date, dateString) => {
    await this.setState({
      from: date,
    });

    if (this.state.brandA !== '') {
      this._onSearchA();
    }

    if (this.state.brandB !== '') {
      this._onSearchB();
    }
  };

  handleToPanelChange = async (date, dateString) => {
    if (date < this.state.from) {
      message.error('Không chọn ngày kết thúc nhỏ hơn ngày bắt đầu');
    } else {
      await this.setState({
        to: date,
      });

      if (this.state.brandA !== '') {
        this._onSearchA();
      }

      if (this.state.brandB !== '') {
        this._onSearchB();
      }
    }
  };

  render() {
    return (
      <Wrapper isHome>
        <Row style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '20px 0px 0px 50px' }}>
            Nhập tên 2 thương hiệu cần so sánh
          </h2>
        </Row>
        <Row>
          <Col span={1} />
          <Col span={10}>
            <h2>Thương hiệu A</h2>
          </Col>
          <Col span={2} />
          <Col span={10}>
            <h2>Thương hiệu B</h2>
          </Col>
        </Row>
        <Row>
          <Col span={1} />
          <Col span={10}>
            <Search
              placeholder="Ví dụ: Mango, Bitis..."
              onSearch={this._onSearchA}
              enterButton
              style={{ width: '100%', marginBottom: '20px' }}
            />
          </Col>
          <Col span={2} />
          <Col span={10}>
            <Search
              placeholder="Ví dụ: Mango, Bitis..."
              onSearch={this._onSearchB}
              enterButton
              style={{ width: '100%', marginBottom: '20px' }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={1} />
          <Col span={5}>
            <h2>Kênh</h2>
          </Col>
          <Col span={1} />
          <Col span={5}>
            <h2>Đơn vị</h2>
          </Col>
          <Col span={1} />
          <Col span={4}>
            <h2>Từ</h2>
          </Col>
          <Col span={4}>
            <h2>Đến</h2>
          </Col>
        </Row>
        <Row>
          <Col span={1} />
          <Col span={5}>
            <Cascader
              options={optionsDomain}
              style={{ width: '100%', marginBottom: '20px' }}
              value={this.state.optionsDomain}
              onChange={this._onChangeDomain}
            />
          </Col>
          <Col span={1} />
          <Col span={5}>
            <Cascader
              options={optionsRange}
              style={{ width: '100%', marginBottom: '20px' }}
              value={this.state.optionRange}
              onChange={this._onChangeRange}
            />
          </Col>
          <Col span={1} />
          <Col span={4}>
            {this.state.optionRange[0] === 'date' ? (
              <DatePicker
                placeholder={this.state.placeholder}
                onChange={this.handleFromPanelChange}
                value={this.state.from}
              />
            ) : (
              <MonthPicker
                placeholder={this.state.placeholder}
                onChange={this.handleFromPanelChange}
                value={this.state.from}
              />
            )}
          </Col>
          <Col span={4}>
            {this.state.optionRange[0] === 'date' ? (
              <DatePicker
                placeholder={this.state.placeholder}
                onChange={this.handleToPanelChange}
                value={this.state.to}
              />
            ) : (
              <MonthPicker
                placeholder={this.state.placeholder}
                onChange={this.handleToPanelChange}
                value={this.state.to}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col span={1} />
          <Col span={10}>
            {this.state.loadingA ? null : (
              <CompareResult
                brand={this.state.brandA}
                data={this.state.dataA}
                starPercent={this.state.starPercentA}
                dataHistogram={this.state.dataHistogramA}
              />
            )}
          </Col>
          <Col span={2} />
          <Col span={10}>
            {this.state.loadingB ? null : (
              <CompareResult
                brand={this.state.brandB}
                data={this.state.dataB}
                starPercent={this.state.starPercentB}
                dataHistogram={this.state.dataHistogramB}
              />
            )}
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default Compare;
