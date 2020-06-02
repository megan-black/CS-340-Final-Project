import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "antd";
import { Row, Col } from "antd";
import { PageHeader } from "antd";
import { Card } from "antd";

const Home = () => {
  const [results, setResults] = useState();
  const [err, setErr] = useState(false);

  useEffect(() => {
    async function fetchHome() {
      try {
        const requestUrl = `http://flip1.engr.oregonstate.edu:12349/home`;
        const res = await axios.get(requestUrl);
        console.log(res);
        setResults(res);
      } catch (err) {
        console.log(err);
      }
    }

    fetchHome();
  }, []);

  const createCards = () => {
    return results.map(
      (results.data,
      (index) => {
        return (
          <Col span={6}>
            <Card
              title="Collection Title"
              bordered={true}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <Card.Grid style={{ width: "100%" }}>{results.data}</Card.Grid>
            </Card>
          </Col>
        );
      })
    );
  };

  return (
    <div align="center" display="flex" style={{ justifyContent: "center" }}>
      <Layout style={{ alignItems: "center" }}>
        <PageHeader title="Log your food, create collections, and view user-curated recipes!" />
      </Layout>
      <br />
      <h2>Today's Featured Collections</h2>
      <br />
      <Row>{createCards}</Row>
    </div>
  );
};

export default Home;
