import React from "react";
import { Layout } from "antd";
import { Row, Col } from "antd";
import { PageHeader } from "antd";
import { Card } from "antd";

const Home = () => {
  useEffect(() => {
    async function fetchHome() {
      try {
        const requestUrl = ``;
      }
    }
  });

  return (
    <div align="center" display="flex" style={{ justifyContent: "center" }}>
      <Layout style={{ alignItems: "center" }}>
        <PageHeader title="Log your food, create collections, and view user-curated recipes!" />
      </Layout>
      <br />
      <h2>Today's Featured Collections</h2>
      <br />
      <Row>
        <Col span={6}>
          <Card
            title="Collection Title"
            bordered={true}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Collection Title"
            bordered={true}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Collection title"
            bordered={true}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Card title"
            bordered={true}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
            <Card.Grid style={{ width: "100%" }}>Card content</Card.Grid>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
