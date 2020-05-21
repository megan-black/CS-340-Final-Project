(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['instruction'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li>"
    + container.escapeExpression(((helper = (helper = helpers.instruction || (depth0 != null ? depth0.instruction : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"instruction","hash":{},"data":data,"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":19}}}) : helper)))
    + "</li>\r\n";
},"useData":true});
})();