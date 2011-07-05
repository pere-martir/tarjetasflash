
console.log("Hello! This is tarjetaflash.");

// Remove 'WordReference.com' top banner (not ad)
$('td.namecell').parent('tr').remove();

// Remove top advertisement
$('div#adleaderboard').parent("td.bannertop").parent('tr').remove();

// Remove right advertisement
$('div#adright').parent('td.rightcolumn').remove();

// Remove 'Links'
$('div.actionsH').remove();
$('div.actions').remove();

// Remove 'Subscribe to the Oxford..' because it's too wide
$('p.OxAd').remove();

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
var elements = [];

var words = $(".hw,.forma").map(function(index, element) {
    // Trim leading and tailing non-alphabet characters
    // For example: "1. colle" and "2. colle"     
    $(element).css('border', '2px solid yellowgreen');
    var w = $(element).text().replace(/^[\s0-9.]+|[\s0-9.]+$/g, '');
    elements.push({'domObject': $(element), 'word': w});
    return w;
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
    
    console.log("TarjetaFlash word: '" + word + "' language: '" + lang + "'");    
    chrome.extension.sendRequest(
      {'lang': lang, 'word': word, 'timestamp': Date.now() },
      function(response) {
         if ('' != response.word) {            
           var existed = $.grep(elements, function(v) { return v.word == response.word; });
           var color;
           if (response.existed)
             color = 'yellow';
           else             
             color = 'yellowgreen';
           $.each(existed, function(i, v) { v.domObject.css('background-color', color); });
         }
      });      
  }
);
 

 