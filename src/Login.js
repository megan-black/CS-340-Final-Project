import React from "react";
import Nav from "./Nav";
import { Layout, PageHeader, Input, Button } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

const Login = () => (
  <div>
    <Nav />
    <div align="center" display="flex" style={{ justifyContent: "center" }}>
      <Layout style={{ alignItems: "center" }}>
        <PageHeader title="Login" />
        <div display="flex" style={{ flexDirection: "row" }}></div>
        <br />

        <div>
          <Input
            placeholder="Enter your username..."
            prefix={<UserOutlined className="site-form-item-icon" />}
            style={{ marginBottom: "15px" }}
          />
          <Input.Password
            placeholder="Enter your password..."
            style={{ marginBottom: "15px" }}
          />
        </div>

        <div>
          <Button type="primary" style={{ margin: "10px" }}>
            Sign Up
          </Button>
          <Button type="primary">Login</Button>
        </div>

        <br />
      </Layout>
      <br />
    </div>
  </div>
);

export default Login;
