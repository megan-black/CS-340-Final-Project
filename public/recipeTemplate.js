(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['recipe'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.ingredient,depth0,{"name":"ingredient","data":data,"indent":"          ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.instruction,depth0,{"name":"instruction","data":data,"indent":"          ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.image,depth0,{"name":"image","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\r\n<!-- This isn't complete and we need to add data typing for the sorting-->\r\n<!-- Takes in the following:\r\n  time - string\r\n  rating - string\r\n  title - string\r\n  type - string\r\n  ingredients - array of objects with items and amounts\r\n  instructions - ordered array of strings\r\n  images - ordered array of image urls (May be broken, will have to see)\r\n-->\r\n\r\n<div class=\"recipe\" data-cooktime=\""
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":13,"column":35},"end":{"line":13,"column":43}}}) : helper)))
    + "\" data-rating=\""
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data,"loc":{"start":{"line":13,"column":58},"end":{"line":13,"column":68}}}) : helper)))
    + "\" data-title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":13,"column":82},"end":{"line":13,"column":91}}}) : helper)))
    + "\" data-type=\""
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":13,"column":104},"end":{"line":13,"column":112}}}) : helper)))
    + "\">\r\n  <div class=\"recipeTitle\">\r\n    <a class=\"recipe-title\" data-name=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":15,"column":39},"end":{"line":15,"column":48}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":15,"column":50},"end":{"line":15,"column":59}}}) : helper)))
    + "</a>\r\n  </div>\r\n  <div class=\"recipe-contents\">\r\n    <div class=\"recipe-info-container\">\r\n      <span class=\"recipe-cooktime\">Cook Time: "
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":19,"column":47},"end":{"line":19,"column":55}}}) : helper)))
    + " minutes</span> <span class=\"recipe-rating\">Rating: "
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data,"loc":{"start":{"line":19,"column":107},"end":{"line":19,"column":117}}}) : helper)))
    + "</span>\r\n    </div>\r\n    <div class=\"recipe-ingredients\">\r\n      <ul style=\"list-style-type:square;\">\r\n        <!--Ingredients is an array of objects containing items and amounts-->\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.ingredients : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":8},"end":{"line":26,"column":17}}})) != null ? stack1 : "")
    + "      </ul>\r\n    </div>\r\n    <div class=\"recipe-instructions\">\r\n      <ol>\r\n        <!-- Instructions is an array of strings-->\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.instructions : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":8},"end":{"line":34,"column":17}}})) != null ? stack1 : "")
    + "      </ol>\r\n    </div>\r\n  </div>\r\n  <div class=\"images\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.images : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":4},"end":{"line":41,"column":13}}})) != null ? stack1 : "")
    + "  </div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});
})();