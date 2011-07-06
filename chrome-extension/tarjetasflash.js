
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
 

 