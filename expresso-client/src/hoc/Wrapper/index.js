import React, { Component } from "react";
import { Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

class Wrapper extends Component {
  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header>
          <div
            className="logo"
            style={{
              float: "left",
              color: "#FFF",
              margin: "0px 150px 0px 0px"
            }}
          >
            <h2 style={{ margin: "0px 0px 0px 0px", color: "#FFF" }}>
              Expresso
            </h2>
          </div>
          {this.props.isHome ? null : (
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">Từ khoá</Menu.Item>
              <Menu.Item key="2">Khảo sát</Menu.Item>
              <Menu.Item key="3">So sánh</Menu.Item>
            </Menu>
          )}
        </Header>
        <Content>{this.props.children}</Content>
      </Layout>
    );
  }
}

export default Wrapper;
