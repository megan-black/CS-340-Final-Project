import React from "react";
import Nav from "./Nav";
import { Layout, PageHeader, Input, Button } from "antd";

const Recipe = () => (
  <div>
    <Nav />
    <div align="center" display="flex" style={{ justifyContent: "center" }}>
      <Layout style={{ alignItems: "left" }}>
        <PageHeader title="Recipe Search" />
        <div display="flex" style={{ flexDirection: "row" }}>
          <Input
            placeholder="Enter your search..."
            style={{ maxWidth: "50%" }}
          />
          <Button type="primary">Search</Button>
        </div>
        <br></br>
      </Layout>
      <br />
    </div>
  </div>
);

export default Recipe;
