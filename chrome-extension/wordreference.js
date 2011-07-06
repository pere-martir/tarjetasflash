
console.log("Hello! This is tarjetaflash - wordreference.js");

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

// WordReference
var words = $(".hw,.forma").map(function(index, element) {
    // Trim leading and tailing non-alphabet characters
    // For example: "1. colle" and "2. colle"         
    var w = $(element).text().replace(/^[\s0-9.]+|[\s0-9.]+$/g, '');
    elements.push({'domObject': $(element), 'word': w});
    $(element).css('border', '2px solid yellowgreen');
    return w;
  }).get().unique(); 


 

 