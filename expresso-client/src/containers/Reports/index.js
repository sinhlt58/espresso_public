import React, { Component } from 'react';
import moment from 'moment';
import { Spin, Row, Col, Button, Cascader, DatePicker, message } from 'antd';
import Wrapper from '../../hoc/Wrapper';
import { optionsDomain, optionsRateBy } from '../../constant';
import { getHistogram } from '../../graphql-client/api';
import {
  VictoryBar,
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryStack,
  VictoryLegend,
  VictoryPie,
} from 'victory';

const { MonthPicker } = DatePicker;

const PICKER_FORMAT = {
  date: {
    placeholder: 'Chọn ngày',
  },
  month: {
    placeholder: 'Chọn tháng',
  },
};

class Reports extends Component {
  state = {
    loading: true,
    from: moment(new Date()).startOf('month'),
    to: moment(new Date()).endOf('month'),
    placeholder: PICKER_FORMAT['date'].placeholder,
    optionsDomain: ['ALL'],
    optionRange: ['user'],
    data: [],
  };

  componentDidMount() {
    this.getHistogram();
  }

  getHistogram = async () => {
    await this.setState({
      loading: true,
    });

    const response = await getHistogram({
      brandName: this.props.match.params.name,
      from: (this.state.from.valueOf() / 1000).toString(),
      to: (this.state.to.valueOf() / 1000).toString(),
      interval: 86400,
      domain: this.state.optionsDomain[0],
      scoreBy: this.state.optionRange[0],
    });

    if (response.networkStatus === 7) {
      if (response.data.brandHistogram.length > 0) {
        let total = 0;
        let pos = 0;
        let result = [];
        response.data.brandHistogram.forEach((element) => {
          total = total + Number(element.total);
          pos = pos + Number(element.count.positive);
        });

        result.push({
          x: `${Number((pos / total) * 100).toFixed(2)}%`,
          y: Number(((pos / total) * 100).toFixed(2)),
        });

        result.push({
          x: `${(100 - Number(((pos / total) * 100).toFixed(2))).toFixed(2)}%`,
          y: 100 - Number(((pos / total) * 100).toFixed(2)),
        });

        this.setState({
          loading: false,
          data: response.data.brandHistogram,
          cmtPercent: result,
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

    this.getHistogram();
  };

  _onChangeRange = async (value) => {
    await this.setState({
      optionRange: value,
    });

    this.getHistogram();
  };

  handleFromPanelChange = async (date, dateString) => {
    await this.setState({
      from: date,
    });

    this.getHistogram();
  };

  handleToPanelChange = async (date, dateString) => {
    if (date < this.state.from) {
      message.error('Không chọn ngày kết thúc nhỏ hơn ngày bắt đầu');
    } else {
      await this.setState({
        to: date,
      });

      this.getHistogram();
    }
  };

  render() {
    return (
      <Wrapper
        location={this.props.location.pathname}
        brand={this.props.match.params.name}
      >
        <Row style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '20px 0px 0px 20px' }}>
            Báo cáo liên quan đến từ khoá:{' '}
            <p style={{ color: 'red', fontWeight: '500', display: 'inline' }}>
              {this.props.match.params.name}
            </p>{' '}
          </h2>
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
            <h2>Đánh giá</h2>
            <Cascader
              options={optionsRateBy}
              style={{ width: '100%', marginBottom: '20px' }}
              value={this.state.optionRange}
              onChange={this._onChangeRange}
            />
          </Col>
          <Col md={1} />
          <Col md={4}>
            <h2>Từ</h2>
            <DatePicker
              placeholder={this.state.placeholder}
              onChange={this.handleFromPanelChange}
              value={this.state.from}
            />
          </Col>
          <Col md={4}>
            <h2>Đến</h2>
            <DatePicker
              placeholder={this.state.placeholder}
              onChange={this.handleToPanelChange}
              value={this.state.to}
            />
          </Col>
        </Row>

        {this.state.loading ? null : (
          <Row>
            <Col md={8}>
              <VictoryPie
                data={this.state.cmtPercent}
                height={300}
                style={{ labels: { fontSize: 8 } }}
                colorScale={['#42f47d', '#f44141']}
              />
            </Col>
            <Col md={16}>
              <VictoryChart
                height={180}
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
                    { name: 'Tích cực', symbol: { fill: '#42f47d' } },
                    { name: 'Tiêu cực', symbol: { fill: '#f44141' } },
                  ]}
                />
                <VictoryAxis
                  tickFormat={(x) => moment(Number(x)).format('DD/MM')}
                  style={{
                    axisLabel: { fontSize: 5, padding: 10 },
                    tickLabels: { fontSize: 2, padding: 2 },
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
                <VictoryStack>
                  <VictoryBar
                    style={{
                      data: {
                        fill: '#42f47d',
                      },
                    }}
                    data={this.state.data}
                    x="timestamp"
                    y={(d) => d.count.positive}
                  />
                  <VictoryBar
                    style={{
                      data: {
                        fill: '#f44141',
                      },
                    }}
                    data={this.state.data}
                    x="timestamp"
                    y={(d) => d.count.negative}
                  />
                </VictoryStack>
              </VictoryChart>
            </Col>
          </Row>
        )}
      </Wrapper>
    );
  }
}

export default Reports;
