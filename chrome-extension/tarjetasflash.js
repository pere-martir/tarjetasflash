
console.log("Hello! This is tarjetaflash.");

Array.prototype.unique = function() {
  var a = [];
  var l = this.length;
  for(var i=0; i<l; i++) {
    for(var j=i+1; j<l; j++) {
      // If this[i] is found later in the array
      if (this[i] === this[j])
        j = ++i;
    }
    a.push(this[i]);
  }
  return a;
};

/*
  <span class="clickable" onclick="redirectWR(event,&quot;OXiten&quot;)">
    <span class="forma"> strada</span> /<span class="fonetica"> 'strada</span>
*/
var words = $(".hw,.forma").map(function(index, element) {
    // Trim leading and tailing non-alphabet characters
    // For example: "1. colle" and "2. colle" 
    return $(element).text().replace(/^[\s0-9.]+|[\s0-9.]+$/g, '');
  }).get().unique(); 

$.each(words, function remember_word(_, word) {
    var lang = '';
    var splits = document.location.pathname.split('/');
    
    // Spanish
    if ('es' == splits[1]) {
        if ('en' == splits[2]) lang = 'es'; else return;
    }
    
    // Italian
    if ('iten' == splits[1]) lang = 'it';
    else if ('enit' == splits[1]) return;
    
    word =  jQuery.trim(word);        
    console.log("TarjetaFlash word: '" + word + "' language: '" + lang + "'");    
    chrome.extension.sendRequest(
      {'lang': lang, 'word': word, 'timestamp': Date.now() },
      function(response) {});      
  }
);
 

 