import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";
import {
  Layout,
  PageHeader,
  Popconfirm,
  Button,
  Spin,
  Card,
  Select,
  Empty,
} from "antd";
import { MinusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
const { Option } = Select;

const Collection = () => {
  const [selectedType, setSelectedType] = useState();
  const [collections, setCollections] = useState();
  const [userCollectionId, setCollectionId] = useState();
  const [recipes, setRecipes] = useState();
  const [isLoadedCollection, setLoadedCollection] = useState(false);
  const [isLoadedRecipe, setLoadedRecipe] = useState(false);

  async function getCollection() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/collections`;
      const res = await axios.post(requestUrl, {
        id: sessionStorage.getItem("id"),
      });
      console.log(res.data);
      setCollections(res.data);
      if (res.data.length > 0) setCollectionId(res.data[0].collection_id);
      setLoadedCollection(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function getRecipesForCollection() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/recipes_collection`;
      const res = await axios.post(requestUrl, {
        user_id: sessionStorage.getItem("id"),
      });
      console.log(res.data);
      setRecipes(res.data);
      setLoadedRecipe(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function addCollection() {
    try {
      console.log(selectedType);
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/new_collection`;
      const res = await axios.post(requestUrl, {
        name: document.getElementById("name").value,
        type: selectedType,
        user_id: sessionStorage.getItem("id"),
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteCollection() {
    try {
      const requestContains = `http://flip2.engr.oregonstate.edu:56334/delete_contains`;
      await axios.post(requestContains, {
        collection_id: userCollectionId,
      });
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/delete_collections`;
      const res = await axios.post(requestUrl, {
        collection_id: userCollectionId,
        user_id: sessionStorage.getItem("id"),
      });
      console.log(res.data);
      alert("Collection deleted!");
    } catch (err) {
      console.log(err);
    }
  }

  async function removeRecipeFromCollection(r_id) {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/remove_contains`;
      const res = await axios.post(requestUrl, {
        recipe_id: r_id,
        collection_id: userCollectionId,
      });
      console.log(res);
      alert("Successfully removed!");
    } catch (err) {
      console.log(err);
      alert("An error occured!");
    }
  }

  const displayRecipes = () => {
    const children = [];

    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].name === "") recipes[i].name = "Untitled Recipe";
      children.push(
        <Card
          key={recipes[i].recipe_id}
          type="inner"
          title={recipes[i].name}
          actions={[
            <MinusCircleOutlined
              id={recipes[i].recipe_id}
              key="remove"
              onClick={(e) => removeRecipeFromCollection(e.currentTarget.id)}
            />,
          ]}
          style={{ marginTop: "15px" }}
        >
          This recipe includes the following ingredients:{" "}
          {recipes[i].ingredients} and takes {recipes[i].cook_time} minutes to
          cook.
        </Card>
      );
    }

    return <span>{children}</span>;
  };

  const displayCollections = () => {
    const seenArr = [];
    var numCollection = -1;
    if (collections.length > 0) {
      return collections.map(
        (collections,
        (index) => {
          if (seenArr.includes(index.collection_id))
            return <span key={index.collection_id + 1} />;
          seenArr.push(index.collection_id);
          numCollection += 1;
          return (
            <Card
              key={index.collection_id}
              id={index.collection_id}
              title={index.name}
              actions={[
                <DeleteOutlined
                  key="delete"
                  onClick={(e) => deleteCollection(e.currentTarget.id)}
                />,
              ]}
            >
              <b>Created</b> {index.date_created.substring(0, 10)}. <br />
              <b>Category:</b> {index.type}. <br />
              {displayRecipes(numCollection)}
            </Card>
          );
        })
      );
    } else {
      return <Empty />;
    }
  };

  useEffect(() => {
    getCollection();
    getRecipesForCollection();
  }, []);

  return (
    <div>
      <Nav />
      <div align="center" display="flex" style={{ justifyContent: "center" }}>
        <Layout style={{ alignItems: "center" }}>
          <PageHeader title="Collections" />
        </Layout>
        {isLoadedRecipe === true &&
        isLoadedCollection === true &&
        collections.length > 0 ? (
          <span />
        ) : (
          <Popconfirm
            placement="bottom"
            title={
              <div>
                Collection name?
                <br />
                <input id="name" type="text" />
                <br />
                Category?
                <br />
                <Select
                  id="category"
                  defaultValue="Breakfast"
                  style={{ width: 120 }}
                  onChange={(value) => {
                    setSelectedType(`${value}`);
                  }}
                >
                  <Option value="Breakfast">Breakfast</Option>
                  <Option value="Lunch">Lunch</Option>
                  <Option value="Dinner">Dinner</Option>
                  <Option value="Snack">Snack</Option>
                  <Option value="Dessert">Dessert</Option>
                </Select>
              </div>
            }
            onConfirm={addCollection}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Button type="primary" style={{ margin: "10px" }}>
              Add Collection
            </Button>
          </Popconfirm>
        )}

        <div align="center" style={{ maxWidth: "75%" }}>
          <br />{" "}
          {isLoadedRecipe === true && isLoadedCollection === true ? (
            displayCollections()
          ) : (
            <Spin />
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
