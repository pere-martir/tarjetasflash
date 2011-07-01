
console.log("hello! This is tarjetaflash.");

$(".hw").each(function() {
    var lang = document.location.pathname.split('/')[1];
    var word = $(this).text();
    console.log("WordReference Entry: " + word);    
    chrome.extension.sendRequest(
      {'url': document.URL, 'lang': lang, 'word': word, 'timestamp': Date.now() },
      function(response) {});
  });
  