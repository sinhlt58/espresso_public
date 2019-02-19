import React, { Component } from 'react';
import {
  Table,
  Input,
  Row,
  Col,
  message,
  Button,
  Icon,
  AutoComplete,
} from 'antd';
import { Link } from 'react-router-dom';
import Wrapper from '../../hoc/Wrapper';
import { getBrands, productAutocomplete } from '../../graphql-client/api';

class ProductsSearch extends Component {
  state = {
    data: [],
    loading: false,
    completion: [],
    keyword: '',
    str: '',
  };

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      const { product } = this.props.location.state;
      this.setState({
        keyword: product,
        str: product,
      });
      this._onSearch(product);
    }
  }

  _onSearch = async (text) => {
    await this.setState({
      loading: true,
    });
    const res = await getBrands(text);

    if (res.networkStatus === 7) {
      this.setState({
        data: res.data.getBrandsByProduct,
        loading: false,
      });
    } else {
      message.error('Không tìm thấy thương hiệu nào ứng với sản phẩm');
    }
  };

  _onInput = async (text) => {
    this.setState({
      str: text,
    });
    if (text.trim() !== '') {
      const res = await productAutocomplete(text.toLowerCase());
      const result = [text, ...res.data.productCompletion];
      this.setState({
        completion: result,
      });
    } else {
      this.setState({
        completion: [],
      });
    }
  };

  _onSelectSuggester = (text) => {
    this.setState({
      keyword: text,
      str: text,
    });
    this._onSearch(text);
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
        title: 'Số lượng sản phẩm liên quan',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
      },
      {
        title: '',
        dataIndex: 'name',
        key: 'action',
        render: (text) => (
          <Link to={`/products/${text}/${this.state.keyword}`}>
            Xem chi tiết
          </Link>
        ),
      },
    ];

    return (
      <Wrapper location={this.props.location.pathname} isHome>
        <div style={{ textAlign: 'center', marginTop: 80, width: '100%' }}>
          <h1>Nhập tên sản phẩm muốn tìm kiếm</h1>
          <AutoComplete
            className="auto"
            size="large"
            style={{ width: '60%' }}
            dataSource={this.state.completion}
            onSelect={this._onSelectSuggester}
            onChange={this._onInput}
            optionLabelProp="value"
            value={this.state.str}
          >
            <Input.Search
              className="search-dashboard"
              placeholder="Ví dụ: quần đùi, áo len"
              onSearch={this._onSearch}
              enterButton
              size="large"
            />
          </AutoComplete>
        </div>
        <Row
          style={{
            marginTop: '30px',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          <h2>
            Các thương hiệu có sản phẩm{' '}
            <p style={{ color: 'red', fontWeight: '500', display: 'inline' }}>
              {this.state.keyword}
            </p>{' '}
          </h2>
          <Col md={7} />
          <Col md={10}>
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

export default ProductsSearch;
