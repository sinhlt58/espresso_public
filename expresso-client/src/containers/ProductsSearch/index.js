import React, { Component } from "react";
import {
  Table,
  Input,
  Row,
  Col,
  message,
  Button,
  Icon,
  AutoComplete
} from "antd";
import { Link } from "react-router-dom";
import Wrapper from "../../hoc/Wrapper";
import { getBrands, productAutocomplete } from "../../graphql-client/api";

class ProductsSearch extends Component {
  state = {
    data: [],
    loading: false,
    completion: [],
    keyword: ""
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

  _onSearch = async text => {
    await this.setState({
      loading: true
    });
    const res = await getBrands(text);

    if (res.networkStatus === 7) {
      this.setState({
        data: res.data.getBrandsByProduct,
        loading: false
      });
    } else {
      message.error("Không tìm thấy thương hiệu nào ứng với sản phẩm");
    }
  };

  _onInput = async text => {
    if (text.trim() !== "") {
      const res = await productAutocomplete(text.toLowerCase());
      const result = [text, ...res.data.productCompletion];
      this.setState({
        completion: result
      });
    } else {
      this.setState({
        completion: []
      });
    }
  };

  _onSelectSuggester = text => {
    this.setState({
      keyword: text
    });
    this._onSearch(text);
  };

  render() {
    const columns = [
      {
        title: "Tên thương hiệu",
        dataIndex: "name",
        key: "name",
        render: text => <Link to={`/analytics/${text}`}>{text}</Link>
      },
      {
        title: "Số lượng sản phẩm liên quan",
        dataIndex: "count",
        key: "count",
        sorter: (a, b) => a.count - b.count
      },
      {
        title: "",
        dataIndex: "name",
        key: "action",
        render: text => (
          <Link to={`/products/${text}/${this.state.keyword}`}>
            Xem chi tiết
          </Link>
        )
      }
    ];

    return (
      <Wrapper location={this.props.location.pathname} isHome>
        <div style={{ textAlign: "center", marginTop: 80, width: "100%" }}>
          <h1>Nhập tên sản phẩm muốn tìm kiếm</h1>
          <AutoComplete
            className="auto"
            size="large"
            style={{ width: "60%" }}
            dataSource={this.state.completion}
            onSelect={this._onSelectSuggester}
            onChange={this._onInput}
            optionLabelProp="text"
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
            marginTop: "30px",
            marginBottom: "30px",
            textAlign: "center"
          }}
        >
          <h2>
            Các thương hiệu có sản phẩm{" "}
            <p style={{ color: "red", fontWeight: "500", display: "inline" }}>
              {this.state.keyword}
            </p>{" "}
          </h2>
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
