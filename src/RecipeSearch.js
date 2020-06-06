import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, BackTop, Spin, Empty } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const RecipeSearch = ({ query }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [recipes, setRecipeRes] = useState();

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

  const renderCards = () => {
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
                <PlusCircleOutlined
                  id={index.recipe_id + 1}
                  key="add"
                  // onClick={test}
                />,
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

  useEffect(() => {
    fetchData();
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
