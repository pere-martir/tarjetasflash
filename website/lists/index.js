function(head, req) {
  var ddoc = this;
  // This code only works with a modified version of mustache from Sofa.  
  var Mustache = require("lib/mustache");
  var List = require("vendor/couchapp/lib/list");
  var path = require("vendor/couchapp/lib/path").init(req);
  
  var indexPath = path.list('index', 'find', {});
  
  provides("html", function() {
    var total_entries = 0;
    var stash = {
      entries : List.withRows(function(row) {
        var e = row.value;
        return {
          word: e.word,
          lang: e.lang,            
          occurrences: e.timestamp.length,
          lastOccurrences: e.timestamp[row.value.timestamp.length - 1]
        }
      })
    };
    return Mustache.to_html(ddoc.templates.index, stash, null, List.send);
  });

}