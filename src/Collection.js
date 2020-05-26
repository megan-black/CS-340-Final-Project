import React, { useState } from "react";
import Nav from "./Nav";
import { Layout, PageHeader, Input, Button, BackTop, Descriptions } from "antd";

const Collection = () => {
  const [runSearch, setSearch] = useState(false);

  function handleKeyPress(e) {
    if (e.which === 13) {
      setSearch(true);
    }
  }

  return (
    <div>
      <Nav />
      <div align="center" display="flex" style={{ justifyContent: "center" }}>
        <Layout style={{ alignItems: "center" }}>
          <PageHeader title="Collections" />
        </Layout>

        <Button type="primary" style={{ margin: "10px" }}>
          Create New
        </Button>

        <div align="center" style={{ maxWidth: "75%" }}>
          <Descriptions
            bordered
            title="Collection 1"
            style={{ borderWidth: "1px", borderStyle: "solid", margin: "15px" }}
          >
            <Descriptions.Item label="Type">Breakfast</Descriptions.Item>
            <Descriptions.Item label="Name">Light Meals</Descriptions.Item>
            <Descriptions.Item label="Date Created">
              2020 February 20
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            bordered
            title="Collection 2"
            style={{ borderWidth: "1px", borderStyle: "solid", margin: "15px" }}
          >
            <Descriptions.Item label="Type">Breakfast</Descriptions.Item>
            <Descriptions.Item label="Name">Fancy Meals</Descriptions.Item>
            <Descriptions.Item label="Date Created">
              2020 February 20
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            bordered
            title="Collection 3"
            style={{ borderWidth: "1px", borderStyle: "solid", margin: "15px" }}
          >
            <Descriptions.Item label="Type">Lunch</Descriptions.Item>
            <Descriptions.Item label="Name">Sandwiches</Descriptions.Item>
            <Descriptions.Item label="Date Created">
              2020 February 20
            </Descriptions.Item>
          </Descriptions>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Collection;
