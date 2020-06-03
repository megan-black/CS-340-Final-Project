import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";
import { Layout, PageHeader, List, Button, Skeleton, Spin } from "antd";

const Collection = () => {
  const [results, setResults] = useState();
  const [isLoaded, setLoaded] = useState(false);

  async function getCollection() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/collections`;
      const res = await axios.get(requestUrl, {
        id: sessionStorage.getItem("id"),
      });
      console.log(res.data);
      setResults(res.data);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function newCollection() {
    try {
      // type, name, recipe_id
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/new_collection`;
      const res = await axios.post(requestUrl, {
        id: sessionStorage.getItem("id"),
      });
      console.log(res.data);
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteCollection() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/delete_collections`;
      const res = await axios.post(requestUrl, {
        id: sessionStorage.getItem("id"),
      });
      console.log(res.data);
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateCollection() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/collections`;
      const res = await axios.post(requestUrl, {
        id: sessionStorage.getItem("id"),
      });
      console.log(res.data);
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const displayCollections = () => {
    console.log(results);
    return results.map(
      (results,
      (index) => {
        return (
          <List
            size="large"
            style={{
              border: "solid",
              borderWidth: "2px",
              marginBottom: "10px",
            }}
          >
            <List.Item
              key={index.collection_id}
              actions={[<a key="edit">edit</a>]}
            >
              <List.Item.Meta
                title={<input value={index.name} />}
                description={
                  <div>
                    <b>Date Created: </b>
                    <input value={index.date_created.substring(0, 10)} />
                    <br />
                    <b>Category: </b>
                    <input value={index.category} />
                    <br />
                    <b>Recipe Name: </b>
                    <input value={index.category} />
                    <br />
                    <b>Cook Time: </b>
                    <input value={index.category} />
                    <br />
                  </div>
                }
              />
            </List.Item>
          </List>
        );
      })
    );
  };

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <div>
      <Nav />
      <div align="center" display="flex" style={{ justifyContent: "center" }}>
        <Layout style={{ alignItems: "center" }}>
          <PageHeader title="Collections" />
        </Layout>

        <Button type="primary" style={{ margin: "10px" }}>
          Add Collection
        </Button>

        <div align="center" style={{ maxWidth: "75%" }}>
          <br /> {isLoaded === true ? displayCollections() : <Spin />}
        </div>
      </div>
    </div>
  );
};

export default Collection;
