(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['ingredient'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li>"
    + alias4(((helper = (helper = helpers.item || (depth0 != null ? depth0.item : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"item","hash":{},"data":data,"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":12}}}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"amount","hash":{},"data":data,"loc":{"start":{"line":1,"column":14},"end":{"line":1,"column":24}}}) : helper)))
    + ")</li>\r\n";
},"useData":true});
})();