function (doc) { 
  if (doc.word && doc.lang && doc.timestamp) { 
    emit(doc.lang + '_' + doc.word, doc); 
  } 
};