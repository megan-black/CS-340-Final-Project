import React from "react";
import Nav from "./Nav";
import axios from "axios";
import { Layout, PageHeader, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const SignUp = () => {
  async function postUser() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/register_user`;
      const res = await axios.post(requestUrl, {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        display_name: document.getElementById("displayName").value,
      });
      console.log(res);
      alert("You have been registered!");
      document.location.href = "/account";
    } catch (err) {
      console.log(err);
      alert("Something went wrong with your registration. Try again.");
    }
  }

  const checkValid = () => {
    if (
      !document.getElementById("username").value ||
      !document.getElementById("password").value ||
      !document.getElementById("displayName").value
    ) {
      alert("Error! Some fields are empty!");
    } else {
      postUser();
    }
  };

  return (
    <div>
      <Nav />
      <div align="center" display="flex" style={{ justifyContent: "center" }}>
        <Layout style={{ alignItems: "center" }}>
          <PageHeader title="Register" />
          <div display="flex" style={{ flexDirection: "row" }}></div>
          <br />

          <div>
            <Input
              id="username"
              placeholder="Enter your username..."
              prefix={<UserOutlined className="site-form-item-icon" />}
              style={{ marginBottom: "15px" }}
            />
            <Input
              id="displayName"
              placeholder="Enter your display name..."
              style={{ marginBottom: "15px" }}
            />
            <Input.Password
              id="password"
              placeholder="Enter your password..."
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div>
            <Button
              type="primary"
              style={{ margin: "10px" }}
              onClick={checkValid}
            >
              Register
            </Button>
          </div>

          <br />
        </Layout>
        <br />
      </div>
    </div>
  );
};

export default SignUp;
