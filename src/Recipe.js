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
  MinusCircleOutlined,
} from "@ant-design/icons";
import RecipeSearch from "./RecipeSearch";
const { Option } = Select;

const Recipe = () => {
  const [runSearch, setSearch] = useState(false);
  const [recipes, setRecipes] = useState();
  const [hasEdit, setEdit] = useState();

  async function addRecipe() {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/new_recipe`;
      const res = await axios.post(requestUrl, {
        cook_time: document.getElementById("cook_time").value,
        category: document.getElementById("category").value,
        user_id: sessionStorage.getItem("id"),
        name: document.getElementById("name").value,
      });
      console.log(res);
      const addUrl = `http://flip2.engr.oregonstate.edu:56334/add_recipe_ingredients`;
      const res2 = await axios.post(addUrl, {
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

  async function addRecipeToCollection(r_id, ing) {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/add_contains`;
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

  async function removeRecipeFromCollection(r_id, c_id) {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/remove_contains`;
      const res = await axios.post(requestUrl, {
        recipe_id: r_id,
        collection_id: c_id,
      });
      console.log(res);
      setRecipes(res.data);
    } catch (err) {
      console.log(err);
      alert("An error occured!");
    }
  }

  async function deleteRecipe(r_id) {
    try {
      const requestUrl = `http://flip2.engr.oregonstate.edu:56334/delete_recipe`;
      await axios.get(requestUrl, {
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

  const addToCollection = (e) => {
    const recipe_id = e.currentTarget.id;
  };

  useEffect(() => {
    fetchRecipes();
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
                <PlusCircleOutlined
                  id={index.recipe_id + 1}
                  key="add"
                  // onClick={test}
                />,
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
                  <input id="recipe_name" type="text" />
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
                  >
                    <Option value="breakfast">Breakfast</Option>
                    <Option value="lunch">Lunch</Option>
                    <Option value="dinner">Dinner</Option>
                    <Option value="snack">Snack</Option>
                    <Option value="dessert">Dessert</Option>
                  </Select>
                  <br />
                  Ingredients?
                  <br />
                  <input id="ingredient" type="text" />
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
