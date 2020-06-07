import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, BackTop, Spin, Empty, Popconfirm, Select } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
const { Option } = Select;

const RecipeSearch = ({ query }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [recipes, setRecipeRes] = useState();
  const [collections, setCollection] = useState();
  const [selectedCollection, setSelectedCollection] = useState();
  const [selectedRecipe, setSelectedRecipe] = useState();

  async function fetchData() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/recipe_search?search=${query}`;
      const res = await axios.get(requestUrl);
      console.log(res.data);
      setRecipeRes(res.data);
      setLoaded(true);
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  }

  async function getCollection() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/collections`;
      const res = await axios.post(requestUrl, {
        id: sessionStorage.getItem("id"),
      });
      console.log(res.data);
      setCollection(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function addRecipeToCollection() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/add_contains`;
      const res = await axios.post(requestUrl, {
        recipe_id: selectedRecipe,
        collection_id: selectedCollection,
      });
      console.log(res);
      alert("Successfully added!");
    } catch (err) {
      console.log(err);
      alert("An error occured!");
    }
  }

  const renderCards = () => {
    var recipeNo = 0;
    if (recipes && recipes.length > 0) {
      return recipes.map(
        (recipes,
        (index) => {
          if (index.ingredients === null)
            index.ingredients = " Not filled in by user.";
          recipeNo += 1;
          return (
            <Card
              key={index.name}
              id={recipeNo}
              title={"Recipe #" + recipeNo + " | " + index.name}
              bordered={true}
              style={{ marginTop: "15px", maxWidth: "35%" }}
              actions={[
                <Popconfirm
                  placement="bottom"
                  title={
                    <div>
                      Which collection(s) would you like to add to?
                      <br />
                      {renderSelectCollection()}
                    </div>
                  }
                  onConfirm={addRecipeToCollection}
                  okText="Confirm"
                  cancelText="Cancel"
                >
                  <PlusCircleOutlined
                    id={index.recipe_id}
                    key="add"
                    onClick={(e) => {
                      setSelectedRecipe(e.currentTarget.id);
                    }}
                  />
                </Popconfirm>,
              ]}
            >
              Category: {index.category}
              <br />
              Ingredients: {index.ingredients}
            </Card>
          );
        })
      );
    } else {
      return <Empty />;
    }
  };

  const renderSelectCollection = () => {
    const children = [];
    const seenArr = [];
    if (collections && collections.length > 0) {
      console.log(seenArr);
      for (let i = 0; i < collections.length; i++) {
        if (seenArr.includes(collections[i].collection_id)) {
          continue;
        }
        children.push(
          <Option
            value={collections[i].collection_id}
            key={collections[i].collection_id}
          >
            {collections[i].name}
          </Option>
        );
        seenArr.push(collections[i].collection_id);
      }
    } else {
      children.push(
        <Option key="n/a" value="No collections available" disabled>
          No collections available
        </Option>
      );
    }

    return (
      <Select
        style={{ width: "250px" }}
        placeholder="Select a collection"
        onChange={(value) => {
          setSelectedCollection(`${value}`);
        }}
      >
        {children}
      </Select>
    );
  };

  useEffect(() => {
    fetchData();
    getCollection();
  }, [query]);

  return (
    <div>
      {isLoaded === true ? (
        <div id="results-wrapper">
          <BackTop />
          <h2>Your search returns {recipes.length} results.</h2>
          {renderCards()}
        </div>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default RecipeSearch;
