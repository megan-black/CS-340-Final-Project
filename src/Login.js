import React from "react";
import Nav from "./Nav";
import axios from "axios";
import { Layout, PageHeader, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Login = () => {
  async function loginUser() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/auth_user`;
      console.log(document.getElementById("username").value);
      console.log(document.getElementById("password").value);
      const res = await axios.post(requestUrl, {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      });
      console.log(res);
      if (!res) {
        alert("Invalid credentials!");
        return;
      }
      alert("You have been logged in!");
      sessionStorage.setItem("id", res.data.id);
      document.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("Something went wrong with your login. Try again.");
    }
  }

  const checkValid = () => {
    if (
      !document.getElementById("username").value ||
      !document.getElementById("password").value
    ) {
      alert("Error! Some fields are empty!");
    } else {
      loginUser();
    }
  };

  return (
    <div>
      <Nav />
      <div align="center" display="flex" style={{ justifyContent: "center" }}>
        <Layout style={{ alignItems: "center" }}>
          <PageHeader title="Login" />
          <div display="flex" style={{ flexDirection: "row" }}></div>
          <br />

          <div>
            <Input
              id="username"
              placeholder="Enter your username..."
              prefix={<UserOutlined className="site-form-item-icon" />}
              style={{ marginBottom: "15px" }}
            />
            <Input.Password
              id="password"
              placeholder="Enter your password..."
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div>
            <Button type="primary" style={{ margin: "10px" }}>
              <a href="/signup">Sign Up</a>
            </Button>
            <Button type="primary" onClick={checkValid}>
              Login
            </Button>
          </div>

          <br />
        </Layout>
        <br />
      </div>
    </div>
  );
};

export default Login;
