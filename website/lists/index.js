function(head, req) {
  var ddoc = this;
  // This code only works with a modified version of mustache from Sofa.  
  var Mustache = require("lib/mustache");
  var List = require("vendor/couchapp/lib/list");
  var path = require("vendor/couchapp/lib/path").init(req);
  var lang = req.query['startkey'][0];
  var sort = req.query['descending'] ? 'desc' : 'asc';
  var desc = false;
  if (typeof req.query['descending'] == 'boolean')
    desc = req.query['descending'];

  provides("html", function() {  

    var lang_it_req = {'startkey': ['it'], 'endkey':['it', {}], 
                       descending: desc};
                       
    var lang_es_req = {'startkey': ['es'], 'endkey':['es', {}], 
                       descending: desc};           
                      
    var sort_desc = {descending: true,  'startkey': [lang, {}], 'endkey': [lang]};
    var sort_asc =  {descending: false, 'startkey': [lang], 'endkey': [lang,{}]};
    
    var stash = {
      curr_lang: lang,
      curr_sort: sort,
      link_lang_it:   path.list('index', 'tabla', lang_it_req),
      link_lang_es:   path.list('index', 'tabla', lang_es_req),      
      link_sort_desc: path.list('index', 'tabla', sort_desc),
      link_sort_asc: path.list('index', 'tabla', sort_asc),
      entries : List.withRows(function(row) {
        var e = row.value;
        return {
          word: e.word,
          word_class: e.timestamp.length == 1 ? 'normal_word' : 'frequent_word',
          //occurrences: e.timestamp.length,
          //lastOccurrences: e.timestamp[row.value.timestamp.length - 1]
        }
      })
    };
    return Mustache.to_html(ddoc.templates.index, stash, null, List.send);
  });

}
