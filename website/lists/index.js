function(head, req) {
  var ddoc = this;
  var Mustache = require("vendor/couchapp/lib/mustache");
  var List = require("vendor/couchapp/lib/list");
  var path = require("vendor/couchapp/lib/path").init(req);
  
  var indexPath = path.list('index', 'find', {});
  
  provides("html", function() {
    var stash = {
      words : List.withRows(function(row) {
        return {
            word: row.value.word,
            lang: row.value.lang,
            lastOccurrences: row.value.timestamps[row.value.timestamps.length - 1],
            occurrences: row.value.timestamps.length };
      })
    };
    return Mustache.to_html(ddoc.templates.index, stash, ddoc.templates.partials, List.send);
  });

}