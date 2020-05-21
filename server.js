
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

var recipeData = require('./recipeData.json');

app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/',function(req,res){

  res.status(200).render('recipeMain',{

        recipes: recipeData,
        filternames: recipeData //Not sure how taking it objects works. We just need the titles here
  });

});

app.post('/newPost',function(req,res){

  console.log("Entered post handler");
  if(req.body){// && req.body.time && req.body.rating && req.body.title && req.body.type && req.body.ingredients && req.body.instructions && req.body.images){

    console.log("req body found");
    recipeData.push(req.body);

    var newFile = JSON.stringify(recipeData);

    fs.writeFile('./recipeData.json',newFile,function(err){

      if(!err){
        res.status(200).send();
        console.log("Sent Back");
      }else{
        res.status(500).send();
        console.log("Server error");
      }

    });

  }else{

    res.status(400).send();
    console.log("Server error 400");
  }

});

app.listen(7321, function(){
  console.log("=== Server is running on port", port);
});
