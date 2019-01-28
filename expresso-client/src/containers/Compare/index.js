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
  AutoComplete,
} from 'antd';
import Wrapper from '../../hoc/Wrapper';
import { optionsDomain, optionsRange } from '../../constant';
import {
  getHistogram,
  getBrand,
  brandAutocomplete,
} from '../../graphql-client/api';
import CompareResult from '../../components/CompareResult';
import {
  VictoryBar,
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryStack,
  VictoryLegend,
  VictoryPie,
  VictoryGroup,
} from 'victory';

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
    completionA: [],
    completionB: [],
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
    await this.setState({
      loadingA: true,
    });

    if (text === undefined) {
      text = this.state.brandA;
    } else {
      this.setState({ brandA: text });
    }

    const res = await getBrand(text, this.state.optionsDomain[0]);

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
      brandName: text,
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
    await this.setState({
      loadingB: true,
    });

    if (text === undefined) {
      text = this.state.brandB;
    } else {
      this.setState({ brandB: text });
    }
    const res = await getBrand(text, this.state.optionsDomain[0]);
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
      brandName: text,
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

  _onInputA = async (text) => {
    if (text.trim() !== '') {
      const res = await brandAutocomplete(text.toLowerCase());
      this.setState({
        completionA: res.data.brandCompletion,
      });
    } else {
      this.setState({
        completionA: [],
      });
    }
  };

  _onInputB = async (text) => {
    if (text.trim() !== '') {
      const res = await brandAutocomplete(text.toLowerCase());
      this.setState({
        completionB: res.data.brandCompletion,
      });
    } else {
      this.setState({
        completionB: [],
      });
    }
  };

  _onSelectSuggesterA = async (text) => {
    this.setState({
      brandA: text,
    });
    this._onSearchA(text);
  };

  _onSelectSuggesterB = (text) => {
    this.setState({
      brandB: text,
    });
    this._onSearchB(text);
  };

  render() {
    return (
      <Wrapper location={this.props.location.pathname} isHome>
        <Row style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '20px 0px 0px 20px' }}>
            Nhập tên 2 thương hiệu cần so sánh
          </h2>
        </Row>
        <Row style={{ padding: 10 }}>
          <Col md={1} />
          <Col md={10}>
            <h2>Thương hiệu A</h2>
            <AutoComplete
              className="search-dashboard"
              size="large"
              style={{ width: '100%', marginBottom: '20px' }}
              dataSource={this.state.completionA}
              onSelect={this._onSelectSuggesterA}
              onSearch={this._onInputA}
              optionLabelProp="value"
            >
              <Search
                placeholder="Ví dụ: Mango, Bitis..."
                onSearch={this._onSearchA}
                enterButton
              />
            </AutoComplete>
          </Col>
          <Col md={2} />
          <Col md={10}>
            <h2>Thương hiệu B</h2>
            <AutoComplete
              className="search-dashboard"
              size="large"
              style={{ width: '100%', marginBottom: '20px' }}
              dataSource={this.state.completionB}
              onSelect={this._onSelectSuggesterB}
              onSearch={this._onInputB}
              optionLabelProp="value"
            >
              <Search
                placeholder="Ví dụ: Mango, Bitis..."
                onSearch={this._onSearchB}
                enterButton
              />
            </AutoComplete>
          </Col>
        </Row>

        <Row style={{ padding: 10 }}>
          <Col md={1} />
          <Col md={5}>
            <h2>Kênh</h2>
            <Cascader
              options={optionsDomain}
              style={{ width: '100%', marginBottom: '20px' }}
              value={this.state.optionsDomain}
              onChange={this._onChangeDomain}
            />
          </Col>
          <Col md={1} />
          <Col md={5}>
            <h2>Đơn vị</h2>
            <Cascader
              options={optionsRange}
              style={{ width: '100%', marginBottom: '20px' }}
              value={this.state.optionRange}
              onChange={this._onChangeRange}
            />
          </Col>
          <Col md={1} />
          <Col md={4}>
            <h2>Từ</h2>
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
          <Col md={4}>
            <h2>Đến</h2>
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

        <Row style={{ padding: 10 }}>
          <Col md={12}>
            {this.state.loadingA ? null : (
              <CompareResult
                brand={this.state.brandA}
                data={this.state.dataA}
                starPercent={this.state.starPercentA}
                dataHistogram={this.state.dataHistogramA}
              />
            )}
          </Col>
          <Col md={12}>
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
        {this.state.loadingA === false && this.state.loadingB === false ? (
          <Row>
            <h2 style={{ padding: 10 }}>
              Biểu đồ số lượng bình luận giữa 2 thương hiệu
            </h2>
            <VictoryChart
              height={200}
              domainPadding={20}
              theme={VictoryTheme.material}
            >
              <VictoryLegend
                x={50}
                y={10}
                title="Chú thích"
                centerTitle
                orientation="horizontal"
                style={{
                  labels: { fontSize: 5 },
                  border: { stroke: 'black' },
                  title: { fontSize: 5 },
                }}
                data={[
                  {
                    name: this.state.brandA,
                    symbol: { fill: 'rgb(51, 77, 92)' },
                  },
                  {
                    name: this.state.brandB,
                    symbol: { fill: 'rgb(69, 178, 157)' },
                  },
                ]}
              />
              <VictoryAxis
                tickFormat={(x) => moment(Number(x)).format('DD/MM')}
                style={{
                  axisLabel: { fontSize: 5, padding: 10 },
                  tickLabels: { fontSize: 3, padding: 2 },
                  ticks: { size: 1 },
                }}
                label="Ngày (DD/MM)"
                fixLabelOverlap={true}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(x) => `${Math.round(x)}`}
                style={{
                  axisLabel: { fontSize: 5, padding: 10 },
                  tickLabels: { fontSize: 4, padding: 2 },
                  ticks: { size: 1 },
                }}
                label="Số bình luận"
                fixLabelOverlap={true}
              />
              <VictoryGroup offset={3} colorScale={'qualitative'}>
                <VictoryBar
                  data={this.state.dataHistogramA}
                  x="timestamp"
                  y="total"
                />
                <VictoryBar
                  data={this.state.dataHistogramB}
                  x="timestamp"
                  y="total"
                />
              </VictoryGroup>
            </VictoryChart>
          </Row>
        ) : null}
      </Wrapper>
    );
  }
}

export default Compare;
