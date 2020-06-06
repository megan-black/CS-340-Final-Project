import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";
import {
  Layout,
  PageHeader,
  Input,
  Button,
  Card,
  BackTop,
  Popconfirm,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import RecipeSearch from "./RecipeSearch";
const { Option } = Select;

const Recipe = () => {
  const [collections, setCollection] = useState();
  const [runSearch, setSearch] = useState(false);
  const [recipes, setRecipes] = useState();
  const [hasEdit, setEdit] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCollection, setSelectedCollection] = useState();

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

  async function addRecipe() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/new_recipe`;
      const res = await axios.post(requestUrl, {
        cook_time: document.getElementById("cook_time").value,
        category: selectedCategory,
        user_id: sessionStorage.getItem("id"),
        name: document.getElementById("name").value,
      });
      console.log(res);
      const addUrl = `http://flip2.engr.oregonstate.edu:56334/add_recipe_ingredients`;
      await axios.post(addUrl, {
        ingredients: document.getElementById("ingredients").value,
      });
    } catch (err) {
      console.log(err);
      alert("An error occured!");
    }
  }

  async function fetchRecipes() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/recipes`;
      const res = await axios.get(requestUrl);
      console.log(res);
      setRecipes(res.data);
    } catch (err) {
      console.log(err);
      alert("An error occured!");
    }
  }

  async function updateRecipe(r_id, ing) {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/update_recipe`;
      const res = await axios.post(requestUrl, {
        recipe_id: r_id,
        ingredients: ing,
      });
      console.log(res);
      setRecipes(res.data);
    } catch (err) {
      console.log(err);
      alert("An error occured!");
    }
  }

  async function addRecipeToCollection(r_id) {
    try {
      console.log(r_id, selectedCollection);
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/add_contains`;
      const res = await axios.post(requestUrl, {
        recipe_id: r_id,
        collection_id: selectedCollection,
      });
      console.log(res);
      alert("Successfully added!");
    } catch (err) {
      console.log(err);
      alert("An error occured!");
    }
  }

  async function deleteRecipe(r_id) {
    try {
      const request = `http://flip2.engr.oregonstate.edu:56334/delete_ingredients`;
      await axios.post(request, {
        recipe_id: r_id,
      });
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/delete_recipe`;
      await axios.post(requestUrl, {
        recipe_id: r_id,
      });
      alert("Recipe deleted!");
    } catch (err) {
      console.log(err);
      alert("An error occured!");
    }
  }

  const handleKeyUpdate = (e, r_id, ing) => {
    if (e.which === 13) {
      updateRecipe(r_id, ing);
    }
  };

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      setSearch(true);
    }
  };

  const startSearch = () => {
    setSearch(true);
  };

  const renderSelectCollection = () => {
    const children = [];

    if (collections && collections.length > 0) {
      for (let i = 0; i < collections.length; i++) {
        children.push(
          <Option
            value={collections[i].collection_id}
            key={collections[i].collection_id}
          >
            {collections[i].c_name}
          </Option>
        );
      }
    } else {
      children.push(
        <Option key="n/a" value="No collections available" disabled>
          No collections available
        </Option>
      );
    }

    return (
      <Select style={{ width: "250px" }} placeholder="Select a collection">
        {children}
      </Select>
    );
  };

  useEffect(() => {
    fetchRecipes();
    getCollection();
  }, []);

  const createAllRecipes = () => {
    var recipeNo = 0;
    if (recipes && recipes.length > 0) {
      return recipes.map(
        (recipes,
        (index) => {
          if (index.ingredients === null)
            index.ingredients = " Not filled in by user.";
          recipeNo += 1;
          var placeholder = index.ingredients;
          return (
            <Card
              key={index.name}
              id={recipeNo}
              title={"Recipe #" + recipeNo + " | " + index.name}
              bordered={true}
              style={{ marginTop: "15px", maxWidth: "35%" }}
              actions={[
                <EditOutlined
                  id={index.recipe_id}
                  key="edit"
                  onClick={(e) => setEdit(true)}
                />,
                <DeleteOutlined
                  id={index.recipe_id - 1}
                  key="delete"
                  onClick={(e) => deleteRecipe(e.currentTarget.id)}
                />,
                <Popconfirm
                  placement="bottom"
                  title={
                    <div>
                      Which collection(s) would you like to add to?
                      <br />
                      {renderSelectCollection()}
                    </div>
                  }
                  onChange={(value) => {
                    setSelectedCollection(`${value}`);
                  }}
                  onConfirm={(e) => addRecipeToCollection(e.currentTarget.id)}
                  okText="Confirm"
                  cancelText="Cancel"
                >
                  <PlusCircleOutlined id={index.recipe_id + 1} key="add" />
                </Popconfirm>,
              ]}
            >
              Category: {index.category}
              <br />
              Ingredients:
              {hasEdit ? (
                <input
                  type="text"
                  placeholder={placeholder}
                  onChange={(e) => {
                    index.ingredients = e.target.value;
                  }}
                  onKeyPress={(e) =>
                    handleKeyUpdate(e, index.recipe_id, index.ingredients)
                  }
                />
              ) : (
                index.ingredients
              )}
            </Card>
          );
        })
      );
    }
  };

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
              id="search"
              placeholder="Enter your search..."
              style={{ maxWidth: "50%" }}
              onChange={() => setSearch(false)}
              onKeyPress={handleKeyPress}
            />
            <Button type="primary" onClick={startSearch}>
              Search
            </Button>
            <Popconfirm
              placement="bottom"
              title={
                <div>
                  Recipe name?
                  <br />
                  <input id="name" type="text" />
                  <br />
                  Cook time?
                  <br />
                  <input id="cook_time" type="number" />
                  <br />
                  Category?
                  <br />
                  <Select
                    id="category"
                    defaultValue="Breakfast"
                    style={{ width: 120 }}
                    onChange={(value) => {
                      setSelectedCategory(`${value}`);
                    }}
                  >
                    <Option value="Breakfast">Breakfast</Option>
                    <Option value="Lunch">Lunch</Option>
                    <Option value="Dinner">Dinner</Option>
                    <Option value="Snack">Snack</Option>
                    <Option value="Dessert">Dessert</Option>
                  </Select>
                  <br />
                  Ingredients?
                  <br />
                  <input id="ingredients" type="text" />
                </div>
              }
              onConfirm={addRecipe}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Button type="primary" style={{ marginLeft: "15px" }}>
                Add Recipe
              </Button>
            </Popconfirm>
          </div>
        </Layout>
        {runSearch === true ? (
          <RecipeSearch query={document.getElementById("search").value} />
        ) : (
          createAllRecipes()
        )}
        <br />
      </div>
    </div>
  );
};

export default Recipe;
