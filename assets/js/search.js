// Based on a script by Kathie Decora : katydecorah.com/code/lunr-and-jekyll/

//Create the lunr index for the search

var index = elasticlunr(function () {
  this.addField('title')
  this.addField('author')
  this.addField('layout')
  this.addField('content')
  this.setRef('id')
});

//Add to this index the proper metadata from the Jekyll content



index.addDoc({
  title: "Articles",
  author: "Allison Busch",
  layout: "page",
  content: "Busch, Allison. “‘Unhitching the Oxcart of Delhi’: a Mughal-Period Hindi Account of Political Insurgency.” JRAS Journal of the Royal Asiatic Society 28, no. 3 (2018): 415–39.\n\n\n\n\n\n———. “The Poetics of History in Padmakar’s Himmatbahādurvirudāvalī,” 2018.\n\n\n\n\n\n———. “The Poetry of History in Early Modern India.” Proceedings of the British Academy 207 (2017): 161–80.\n\n\n\n\n\n———. “Portrait of a Raja in a Badshah’s World: Amrit Rai’s Biography of Man Singh (1585).” J. Econ. Soc. Hist. Orient Journal of the Economic and Social History of the Orient 55, no. 2-3 (2012): 287–328.\n\n\n\n\n\n———. “Hidden in Plain View: Brajbhasha Poets at the Mughal Court.” Modern Asian Studies 44, no. 2 (2010): 267–309.\n\n\n\n\n\n———. “Literary Responses to the Mughal Imperium: The Historical Poems of Keśavdās.” South Asia Research South Asia Research 25, no. 1 (2005): 31–54.\n\n\n\n\n\n———. “The Anxiety of Innovation: The Practice of Literary Science in the Hindi/Riti Tradition.” Comparative Studies of South Asia, Africa and the Middle East 24, no. 2 (2004): 45–59.\n\n\n\n\n\n",
  id: 0
});
index.addDoc({
  title: "Books",
  author: "Allison Busch",
  layout: "page",
  content: "Busch, Allison, and Thomas de Bruijn, eds. Culture and Circulation: Literature in Motion in Early Modern India. Brill’s Indological Library. Leiden ; Boston: Brill, 2014.\n\n\n\n\n\nBusch, Allison. Poetry of Kings: The Classical Hindi Literature of Mughal India. South Asia Research. New York: Oxford University Press, 2011.\n\n\n\n\n\n",
  id: 1
});
index.addDoc({
  title: "Chapters",
  author: "Allison Busch",
  layout: "page",
  content: "Busch, Allison, and Cynthia Borkaw. “Relating the Past: Writing (and Rewriting) History.” In What China and India Once Were the Pasts That May Shape the Global Future, 127–64, 2018.\n\n\n\n\n\nBusch, Allison. “Life and Love in the Couplets of Rahim.” In Celebrating Abdur Rahim Khan-i-Khanan, 174–96. Aga Khan Trust for Culture, 2017.\n\n\n\n\n\n———. “Listening for the Context: Tuning in To the Reception of Riti Poetry.” In Tellings and Texts : Music, Literature and Performance in North India, edited by Katherine Butler Schofield and Francesca Orsini, 249–92. OBP Collection. Cambridge: Open Book Publishers, 2016. http://books.openedition.org/obp/2516.\n\n\n\n\n\n———. “The Rulers of Bundi in Mughal-Period Literary Culture.” In Bundi Fort: a Rajput World, 96–112, 2016.\n\n\n\n\n\n———. “Riti and Register: Lexical Variation in Courtly Braj Bhasha Texts.” In Before the Divide: Hindi and Urdu Literary Culture, edited by Francesca Orsini, 2016.\n\n\n\n\n\nAllison, Busch, Whitney Cox, and Lawrence J McCrea, eds. “Hindi Literary Beginnings.” In South Asian Texts in History: Critical Engagements with Sheldon Pollock, 203–25. Delhi: Primus Books, 2016.\n\n\n\n\n\nBusch, Allison, and Thomas de Bruijn, eds. “Poetry in Motion: Literary Circulation in Mughal India.” In Culture and Circulation: Literature in Motion in Early Modern India, 186–222. Brill’s Indological Library. Leiden ; Boston: Brill, 2014.\n\n\n\n\n\nAllison, Busch, David Dean Shulman, and Gary A Tubb. “The Classical Past in the Mughal Present: the Brajbhasha Rīti Tradition.” In Innovations and Turning Points: Toward a History of Sanskrit Literature, 2014.\n\n\n\n\n\nDalmia, Vasudha, Christopher Shackle, and Shobhna Nijhawan. “An Early Moment in the Development of Hindi Literary History.” In Nationalism in the Vernacular: Hindi, Urdu, and the Literature of Indian Freedom, translated by Allison Busch, 342–29. Ranikhet: Permanent Black, 2010.\n\n\n\n\n\n———. “The World’s Most Valuable Object.” In Nationalism in the Vernacular: Hindi, Urdu, and the Literature of Indian Freedom, translated by Allison Busch, 128–38. Ranikhet: Permanent Black, 2010.\n\n\n\n\n\nBusch, Allison. “Braj Beyond Braj: The Classical Hindi in the Mughal World.” In IIC Occasional Publications. New Delhi: India International Centre, 2009.\n\n\n\n\n\n———. “Questioning the Tropes about ‘Bhakti’ and ‘Rīti’ in Hindi Literary Historiography.” In Bhakti in Current Research, edited by Monika Horstmann, 33–47. Manohar Publishers &amp; Distributors, 2006.\n\n\n\n\n\nPike, David L, and David Damrosch. “The Birthplace of God Cannot Be Moved!” In The Anthology of World Literature: Vol. A, translated by Allison Busch, 917–22. New York: Pearson Longman, 2004.\n\n\n\n\n\n",
  id: 2
});
console.log( jQuery.type(index) );

// Builds reference data (maybe not necessary for us, to check)


var store = [{
  "title": "Articles",
  "author": "Allison Busch",
  "layout": "page",
  "link": "/texts/articles/",
}
,{
  "title": "Books",
  "author": "Allison Busch",
  "layout": "page",
  "link": "/texts/books/",
}
,{
  "title": "Chapters",
  "author": "Allison Busch",
  "layout": "page",
  "link": "/texts/chapters/",
}
]

//Query

var qd = {}; //Gets values from the URL
location.search.substr(1).split("&").forEach(function(item) {
    var s = item.split("="),
        k = s[0],
        v = s[1] && decodeURIComponent(s[1]);
    (k in qd) ? qd[k].push(v) : qd[k] = [v]
});

function doSearch() {
  var resultdiv = $('#results');
  var query = $('input#search').val();

  //The search is then launched on the index built with Lunr
  var result = index.search(query);
  resultdiv.empty();
  if (result.length == 0) {
    resultdiv.append('<p class="">No results found.</p>');
  } else if (result.length == 1) {
    resultdiv.append('<p class="">Found '+result.length+' result</p>');
  } else {
    resultdiv.append('<p class="">Found '+result.length+' results</p>');
  }
  //Loop through, match, and add results
  for (var item in result) {
    var ref = result[item].ref;
    var searchitem = '<div class="result"><p><a href="'+store[ref].link+'?q='+query+'">'+store[ref].title+'</a></p></div>';
    resultdiv.append(searchitem);
  }
}

$(document).ready(function() {
  if (qd.q) {
    $('input#search').val(qd.q[0]);
    doSearch();
  }
  $('input#search').on('keyup', doSearch);
});
