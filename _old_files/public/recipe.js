/* This is the JavaScript file for the recipe website, its purpose will be to access recipes stores on the site and prehaps add recipes of the user*/

/* Hiding and displaying the recipes Start*/
var recipeArray = document.getElementsByClassName('recipe');
var recipeNameArray = document.getElementsByClassName('filter-recipe-name');
for (var i = 0; i < recipeNameArray.length; i++) {
  recipeNameArray[i].addEventListener('click', toggleVisability);
}

// function insertNewRecipe(time, rating, title, type, ingredients, instructions, imageLink) {
//
//   var postDataHTML = Handlebars.templates.post({
//     time: time,
//     rating: rating,
//     title: title,
//     type: type,
//     // ingredients: {ingredient: ingredient1, ingredient: ingredient2, ingredient: ingredient3, ingredient: ingredient4, ingredient: ingredient5},
//     // instructions: {instruction: instruction1, instruction: instruction2, instruction: instruction3, instruction: instruction4, instruction, instruction5},
//     imageLink: imageLink,
//   });
//   return postDataHTML;
// }

function toggleVisability(event){
  console.log("WE GOT CLICKED");
  var choosenRecipe = event.currentTarget.dataset.title;
  choosenRecipe = choosenRecipe;
  console.log(choosenRecipe);

  for (var i = 0; i < recipeArray.length; i++) {
    console.log(recipeArray[i].dataset.title);

    if(recipeArray[i].dataset.title == choosenRecipe){
      recipeArray[i].classList.add('visable');
      console.log(recipeArray[i]);
    }
    else{
      recipeArray[i].classList.remove('visable');
    }
  }
}
/* End Hiding and displaying the recipes */

/* Filter Box Functionality Start */
function none(event){
}

var filterText = document.getElementById('filter-search');
filterText.addEventListener('change', none);

var filterCT = document.getElementById('filter-cook-time');
filterCT.addEventListener('change', none);

var filterRate = document.getElementById('filter-rating');
filterRate.addEventListener('change', none);

var mealType = 'all';

var allB = document.getElementById('filter-all-button');
allB.addEventListener('click', function (event) {
  mealType = 'all';
});

var breakfastB = document.getElementById('filter-breakfast-button');
breakfastB.addEventListener('click', function (event) {
  mealType = 'breakfast';
});

var lunchB = document.getElementById('filter-lunch-button');
lunchB.addEventListener('click', function (event){
  mealType = 'lunch';
});

var dinnerB = document.getElementById('filter-dinner-button');
dinnerB.addEventListener('click', function (event){
  mealType = 'dinner';
});

var dessertB = document.getElementById('filter-dessert-button');
dessertB.addEventListener('click', function (event){
  mealType = 'dessert';
});

var snackB = document.getElementById('filter-snack-button');
snackB.addEventListener('click', function (event){
  mealType = 'snack';
});

function filterByMeal(idx) {
  if(mealType != 'all'){
    if(recipeArray[idx].dataset.type != mealType){
      removeFromList(recipeArray[idx].dataset.title);
    }
  }
}

function removeFromList(name){
  for(var i = recipeNameArray.length-1; i >= 0; i--){
    var filterListName = recipeNameArray[i].dataset.title;
    name = name.replace(/[!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~]/g, '').toLowerCase();
    filterListName = filterListName.replace(/[!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~]/g, '').toLowerCase();
    if(filterListName == name){
      recipeNameArray[i].remove();
    }
  }
}

function isInt(value){
  for(var i = 0; i < value.length; i++){
    if(!(value <= '9' && value >= '0')){
      window.alert("Only numbers can be put in the Cook Time feild.");
      filterCT.value = "";
      break;
    }
    else{
      goodInt = value;
      return goodInt;
    }
  }
  return 0;
}

function isRating(value){
  for(var i = 0; i < value.length; i++){
    if(!(value <= '5' && value >= '1')){
      window.alert("Only ratings 1-5 can be put in the Rating feild.");
      filterRating.value = "";
      break;
    }
    else{
      return value;
    }
  }
  return 0;
}
/* Search Button */
var search = document.getElementById('filter-search-button');
search.addEventListener('click', function (event) {

  if(filterText.value == "" && filterCT.value == "" && filterRate.value == ""){
    for(var i = recipeArray.length-1; i >= 0; i--){
      filterByMeal(i);
    }
  }
  if(filterText.value != ""){
    for(var i = recipeArray.length -1; i >= 0; i--){
      var name = recipeArray[i].dataset.title;

      name = name.replace(/[!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~]/g, '').toLowerCase();

      filterByMeal(i);

      var userInp = filterText.value;
      userInp = userInp.replace(/[!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~]/g, '').toLowerCase();

      if(name.includes(userInp) == false){
        removeFromList(name);
      }
    }
  }
  if(filterCT.value != ""){
    for(var i = recipeArray.length-1; i >=0; i--){
      var cookTime = recipeArray[i].dataset.cooktime;
      if(isInt(filterCT.value) == 0){
      }
      else{
        if(+cookTime >= +filterCT.value){
          removeFromList(recipeArray[i].dataset.title);
        }
      }
      filterByMeal(i);
    }
  }
  if(filterRate.value !=""){
    for(var i = recipeArray.length-1; i >=0; i--){
      var rateTime = recipeArray[i].dataset.rating;

      if(isRating(filterRate.value) == 0){
      }
      else{
        if(+rateTime < +filterRate.value){
          removeFromList(recipeArray[i].dataset.title);
        }
      }
      filterByMeal(i);
    }
  }
});

/* End of Search Button */

/* End Filter Box Functionality */

/* Start of Modal */

/* Open Modal */
var addButton = document.getElementById('add-recipe-button');
addButton.addEventListener('click', function (event){
  var modal = document.getElementById('create-recipe-modal');
  modal.classList.remove('hidden');
  var blurr = document.getElementById('modal-backdrop');
  blurr.classList.remove('hidden');
});

/* Closes Modal */

var closeC = document.getElementById('modal-cancel');
closeC.addEventListener('click', function (event){
  removeInput();
  removeModal();
});

var closeX = document.getElementById('modal-close');
closeX.addEventListener('click', function (event){
  removeInput();
  removeModal();
});

/* Remove Modal */
function removeModal(event){
  var modal = document.getElementById('create-recipe-modal');
  modal.classList.add('hidden');
  var blurr = document.getElementById('modal-backdrop');
  blurr.classList.add('hidden');
}

/* Removes user input from add */
function removeInput(event){
  var recipeInputElements = [
    document.getElementById('recipe-time-input'),
    document.getElementById('recipe-rating-input'),
    document.getElementById('recipe-title-input'),
    // For the ingredients and instructions
    document.getElementById('ingredients'),
    document.getElementById('instructions'),
    document.getElementById('recipe-photo-input')
  ];

  recipeInputElements.forEach(function (inputElem) {
    inputElem.value = '';
  });
}


// Checks user input into modal before accepting
var closeA = document.getElementById('modal-accept');
closeA.addEventListener('click', function(event) {

  var time = document.getElementById('recipe-time-input').value.trim();
  var rating = document.getElementById('recipe-rating-input').value.trim();
  var title = document.getElementById('recipe-title-input').value.trim();
  var type = document.querySelector('#recipe-type-fieldset input:checked').value;
  //need to add all ingredients
  var ingredients = document.getElementById('ingredients').value.trim();
  var instructions = document.getElementById('instructions').value.trim();
  var imageURL = document.getElementById('recipe-photo-input').value.trim();
  //need to include the ingredients and instructions array


  if (!time || !rating || !title || !type || !imageURL || !ingredients || !instructions) {
    alert("You must fill in all of the fields!");
  } else {

      var postRequest =  new XMLHttpRequest();
      var requestURL = '/newPost';
      postRequest.open('POST', requestURL);

      var processedIngredients = ingredients.split(',');
      var processedInstructions = instructions.split(',');

      for(i = 0;i < processedIngredients.length;i++){
        processedIngredients[i] = {
          item: processedIngredients[i],
          amount: "The amount is broken"
        };
      }

      for(i = 0; i < processedInstructions.length;i++){
        processedInstructions[i] = {
          instruction: processedInstructions[i]
        };
      }

      var reqestBody = JSON.stringify({
        time: time,
        rating: rating,
        title: title,
        type:type,
        ingredients: processedIngredients,
        instructions: processedInstructions,
        images: [{
          imageLink: imageURL,
          title: title
        }]
      });
      postRequest.setRequestHeader('Content-Type', 'application/json');
      postRequest.addEventListener('load', function(event){

	console.log("status", event.target.status);

        if (event.target.status !== 200) {
          var responseBody = event.target.response;
        }
        else{

	   console.log("made it into a post reqest");

          // var recipeTemplate = Handlebars.templates.recipe;
          var newRecipeHTML = Handlebars.templates.recipe({
          // var newRecipeHTML = recipeTemplate({
            time: time,
            rating: rating,
            title: title,
            type:type,
            ingredients: processedIngredients,
            instructions: processedInstructions,
            images: [{
              imageLink: imageURL,
              title: title
            }]
          });
          var newRecipeContainer = document.querySelector('recipe');
          newRecipeContainer.insertAdjacentHTML('beforeend', newRecipeHTML);

        }

      });

    postRequest.send(reqestBody);
    console.log("WE ACCTPED");
    removeInput();
    removeModal();

     }
 });
    // var singleRecipe = {
    //   time: time,
    //   rating: rating,
    //   title: title,
    //   type: type,
    //   // ingredients: {ingredient: ingredient1, ingredient: ingredient2, ingredient: ingredient3, ingredient: ingredient4, ingredient: ingredient5},
    //   // instructions: {instruction: instruction1, instruction: instruction2, instruction: instruction3, instruction: instruction4, instruction, instruction5},
    //   imageLink: imageLink

    // recipeArray.recipeArray.length.push();


// });
/* End of Modal */
