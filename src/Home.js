import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "antd";
import { Row, Col } from "antd";
import { PageHeader } from "antd";
import { Card } from "antd";
import { Spin } from "antd";

const Home = () => {
  const [results, setResults] = useState();
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchHome() {
      try {
        setLoaded(false);
        const requestUrl = `http://flip2.engr.oregonstate.edu:56334/home`;
        const res = await axios.get(requestUrl);
        console.log(res.data);
        setResults(res.data);
        setLoaded(true);
      } catch (err) {
        console.log(err);
      }
    }

    fetchHome();
  }, []);

  const createCards = () => {
    return results.map(
      (results,
      (index) => {
        return (
          <Col span={6}>
            <Card
              title={index.c_name}
              bordered={true}
              style={{ marginLeft: "30px", marginRight: "30px" }}
            >
              Category: {index.category}
              <br />
              <b>Date Created:</b> {index.date_created.substring(0, 10)}
              <Card type="inner" style={{ marginTop: "15px" }}>
                <h4>Included Recipes</h4>
                <b>{index.r_name}</b> <br /> Cook Time: {index.cook_time}
              </Card>
            </Card>
          </Col>
        );
      })
    );
  };

  return (
    <div>
      {isLoaded === true ? (
        <div align="center" display="flex" style={{ justifyContent: "center" }}>
          <Layout style={{ alignItems: "center" }}>
            <PageHeader title="Log your food, create collections, and view user-curated recipes!" />
          </Layout>
          <br />
          <h2>Today's Featured Collections</h2>
          <br />
          <Row>{createCards()}</Row>
        </div>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default Home;
