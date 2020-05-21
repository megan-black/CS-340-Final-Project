(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['image'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"recipe-image-container\">\r\n  <img src=\""
    + alias4(((helper = (helper = helpers.imageLink || (depth0 != null ? depth0.imageLink : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imageLink","hash":{},"data":data,"loc":{"start":{"line":2,"column":12},"end":{"line":2,"column":25}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":2,"column":32},"end":{"line":2,"column":41}}}) : helper)))
    + "\" height=\"200\">\r\n</div>\r\n";
},"useData":true});
})();