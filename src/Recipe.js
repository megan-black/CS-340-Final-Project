import React, { useState } from "react";
import Nav from "./Nav";
import { Layout, PageHeader, Input, Button, Empty, BackTop } from "antd";

const Recipe = () => {
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
          <PageHeader title="Recipes" />
        </Layout>
        <Layout style={{ paddingBottom: "30px", marginBottom: "15px" }}>
          <div display="flex" style={{ flexDirection: "row" }}>
            <BackTop />
            <Input
              placeholder="Enter your search..."
              style={{ maxWidth: "50%" }}
              onChange={() => setSearch(false)}
              onKeyPress={handleKeyPress}
            />
            <Button type="primary">Search</Button>
          </div>
        </Layout>
        {runSearch === true ? <span /> : <Empty />}
        <br />
      </div>
    </div>
  );
};

export default Recipe;
