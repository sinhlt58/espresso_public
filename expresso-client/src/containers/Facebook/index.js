import React, { Component } from 'react';
import Wrapper from '../../hoc/Wrapper';
import { Row, Col } from 'antd';

class Facebook extends Component {
  render() {
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
      </Wrapper>
    );
  }
}

export default Facebook;
