import React, { Component } from 'react';
import moment from 'moment';
import { Spin, Row, Col, Button, Cascader, DatePicker, message } from 'antd';
import Wrapper from '../../hoc/Wrapper';
import { optionsDomain, optionsRange } from '../../constant';

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
    from: moment(new Date()),
    to: moment(new Date()),
    domain: '',
    placeholder: PICKER_FORMAT['date'].placeholder,
    optionsDomain: ['ALL'],
    optionRange: ['date'],
  };

  _onChangeDomain = async (value) => {
    await this.setState({
      optionsDomain: value,
    });
  };

  _onChangeRange = async (value) => {
    await this.setState({
      optionRange: value,
      placeholder: PICKER_FORMAT[value[0]].placeholder,
    });
  };

  handleFromPanelChange = (date, dateString) => {
    this.setState({
      from: date,
    });
  };

  handleToPanelChange = (date, dateString) => {
    this.setState({
      to: date,
    });
  };

  render() {
    return (
      <Wrapper brand={this.props.match.params.name}>
        <Row style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '20px 0px 0px 50px' }}>
            Báo cáo liên quan đến từ khoá:{' '}
            <p style={{ color: 'red', fontWeight: '500', display: 'inline' }}>
              {this.props.match.params.name}
            </p>{' '}
          </h2>
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
      </Wrapper>
    );
  }
}

export default Reports;
