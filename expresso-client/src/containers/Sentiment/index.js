import React, { Component } from 'react';
import { Input, message } from 'antd';
import axios from 'axios';
import Wrapper from '../../hoc/Wrapper';

class Sentiment extends Component {
  state = {
    predict: -1,
  };

  _onSearch = (text) => {
    axios
      .post('http://localhost:8000/api/sentiment/predict', {
        sentences: [`${text}`],
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            predict: res.data.outputs[0],
          });
        } else {
          message.error('Something wrong! Try again');
        }
      });
  };

  render() {
    return (
      <Wrapper isHome style={{ height: '100vh' }}>
        <Input.Search
          placeholder="Input here"
          onSearch={this._onSearch}
          enterButton
          style={{
            marginLeft: '20%',
            marginTop: '30px',
            width: '50%',
            marginBottom: '20px',
          }}
        />
        <h2 style={{ marginLeft: '20%' }}>
          Comment score: <span>{this.state.predict}</span>
        </h2>
      </Wrapper>
    );
  }
}

export default Sentiment;
