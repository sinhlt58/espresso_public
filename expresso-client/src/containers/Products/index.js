import React, { Component } from "react";
import { List, Spin, Button, message } from "antd";
import Wrapper from "../../hoc/Wrapper";
import { getProductsByBrand } from "../../graphql-client/api";

class Products extends Component {
  state = {
    initLoading: true,
    loading: true,
    offset: 0,
    data: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const res = await getProductsByBrand(
      this.props.match.params.name,
      this.props.match.params.keyword,
      this.state.offset
    );

    if (res.networkStatus === 7) {
      if (res.data.getProducts.total === this.state.data.length) {
        message.success("Đã tải hết toàn bộ sản phẩm của thương hiệu");
        this.setState({
          loading: false,
          initLoading: false
        });
      } else {
        const data = [...this.state.data, ...res.data.getProducts.products];
        const newOffset = this.state.offset + 10;
        this.setState({
          initLoading: false,
          loading: false,
          data: data,
          offset: newOffset
        });
      }
    } else {
      message.error("Có lỗi xảy ra vui lòng thử lại");
      this.setState({
        loading: false,
        initLoading: false
      });
    }
  };

  onLoadMore = async () => {
    await this.setState({
      loading: true
    });

    this.getData();
  };

  render() {
    const { initLoading, loading } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            height: 32,
            lineHeight: "32px"
          }}
        >
          <Button onClick={this.onLoadMore}>More</Button>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            height: 32,
            lineHeight: "32px"
          }}
        >
          <Spin />
        </div>
      );

    return (
      <Wrapper isHome location={this.props.location.pathname}>
        <div style={{ padding: "20px 80px" }}>
          <h2>
            Các sản phẩm{" "}
            <p style={{ color: "red", fontWeight: "500", display: "inline" }}>
              {this.props.match.params.keyword}
            </p>{" "}
            của thương hiệu{" "}
            <p style={{ color: "red", fontWeight: "500", display: "inline" }}>
              {this.props.match.params.name}
            </p>{" "}
          </h2>
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <a target="_blank" href={item.source.url}>
                      {item.title}
                    </a>
                  }
                  description={`Giá ${Number(
                    item.price
                  ).toLocaleString()}VNĐ tại ${item.source.domain}`}
                />
              </List.Item>
            )}
          />
        </div>
      </Wrapper>
    );
  }
}

export default Products;
