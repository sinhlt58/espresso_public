import React, { Component } from 'react';
import Wrapper from '../../hoc/Wrapper';
import SideMenu from '../../components/SideMenu';
import {
  Input,
  Row,
  Col,
  Cascader,
  Radio,
  Comment,
  Icon,
  Tooltip,
  Avatar,
} from 'antd';
import moment from 'moment';

const Search = Input.Search;

const options = [
  {
    value: 'asc',
    label: 'Điểm từ thấp đến cao',
  },
  {
    value: 'desc',
    label: 'Điểm từ cao đến thấp',
  },
  {
    value: 'recently',
    label: 'Gần đây nhất',
  },
];

class AnalyticsDetail extends Component {
  _handleClick = (e) => {
    if (e.key === 'overview') {
      this.props.history.replace(
        `/analytics/overview/${this.props.match.params.name}`,
      );
    }
  };

  render() {
    return (
      <Wrapper>
        <SideMenu path="detail" handleClick={this._handleClick} />
        <div style={{ width: '100%' }}>
          <h2 style={{ margin: '10px 0px 0px 30px' }}>
            Chi tiết liên quan đến từ khoá:{' '}
            <p style={{ color: 'red', fontWeight: '500', display: 'inline' }}>
              {this.props.match.params.name}
            </p>{' '}
          </h2>
          <div>
            <Row style={{ padding: '30px' }}>
              <Col span={8}>
                <h2>Tìm kiếm</h2>
                <Search
                  placeholder="Nhập từ khoá để tìm kiếm bình luận"
                  onSearch={this._onSearch}
                  enterButton
                  style={{ width: '100%', 'margin-bottom': '20px' }}
                />
                <h2>Sắp xếp</h2>
                <Cascader
                  options={options}
                  placeholder="Lựa chọn thuộc tính sắp xếp"
                  style={{ width: '100%', 'margin-bottom': '20px' }}
                />
                <h2>Lọc</h2>
                <Radio.Group defaultValue="all" buttonStyle="solid">
                  <Radio.Button value="all">All</Radio.Button>
                  <Radio.Button value="shopee">Shopee</Radio.Button>
                  <Radio.Button value="tiki">Tiki</Radio.Button>
                  <Radio.Button value="lazada">Lazada</Radio.Button>
                </Radio.Group>
              </Col>
              <Col span={2} />
              <Col span={14}>
                <Comment
                  author={<a>Han Solo</a>}
                  avatar={
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt="Han Solo"
                    />
                  }
                  content={
                    <p>
                      We supply a series of design principles, practical
                      patterns and high quality design resources (Sketch and
                      Axure), to help people create their product prototypes
                      beautifully and efficiently.
                    </p>
                  }
                  datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                      <span>{moment().fromNow()}</span>
                    </Tooltip>
                  }
                />
              </Col>
            </Row>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default AnalyticsDetail;
