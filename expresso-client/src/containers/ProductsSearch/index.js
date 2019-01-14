import React, { Component } from 'react';
import { Table, Input, Row, Col, message, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Wrapper from '../../hoc/Wrapper';
import { getBrands } from '../../graphql-client/api';
import Highlighter from 'react-highlight-words';

class ProductsSearch extends Component {
  state = {
    data: [],
    loading: false,
  };

  // getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     clearFilters,
  //   }) => (
  //     <div style={{ padding: 8 }}>
  //       <Input
  //         ref={(node) => {
  //           this.searchInput = node;
  //         }}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
  //         style={{ width: 188, marginBottom: 8, display: 'block' }}
  //       />
  //       <Button
  //         type="primary"
  //         onClick={() => this.handleSearch(selectedKeys, confirm)}
  //         icon="search"
  //         size="small"
  //         style={{ width: 90, marginRight: 8 }}
  //       >
  //         Search
  //       </Button>
  //       <Button
  //         onClick={() => this.handleReset(clearFilters)}
  //         size="small"
  //         style={{ width: 90 }}
  //       >
  //         Reset
  //       </Button>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex]
  //       .toString()
  //       .toLowerCase()
  //       .includes(value.toLowerCase()),
  //   onFilterDropdownVisibleChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => this.searchInput.select());
  //     }
  //   },
  //   render: (text) => (
  //     <Highlighter
  //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
  //       searchWords={[this.state.searchText]}
  //       autoEscape
  //       textToHighlight={text.toString()}
  //     />
  //   ),
  // });

  // handleSearch = (selectedKeys, confirm) => {
  //   confirm();
  //   this.setState({ searchText: selectedKeys[0] });
  // };

  // handleReset = (clearFilters) => {
  //   clearFilters();
  //   this.setState({ searchText: '' });
  // };

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

  render() {
    const columns = [
      {
        title: 'Tên thương hiệu',
        dataIndex: 'name',
        key: 'name',
        render: (text) => (
          <Link to={`/analytics/${text.toLowerCase()}`}>{text}</Link>
        ),
      },
      {
        title: 'Số lượng sản phẩm liên quan',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
      },
    ];

    return (
      <Wrapper isHome>
        <div style={{ textAlign: 'center', marginTop: 80, width: '100%' }}>
          <h1>Nhập tên sản phẩm muốn tìm kiếm</h1>
          <Input.Search
            className="search-dashboard"
            style={{ width: '60%' }}
            placeholder="Ví dụ: quần đùi, áo len"
            onSearch={this._onSearch}
            enterButton
            size="large"
          />
        </div>
        <Row style={{ marginTop: '30px', marginBottom: '30px' }}>
          <Col span={7} />
          <Col span={10}>
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
