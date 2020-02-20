

const startAnalysis = a => {
  let { books, daysToScan, libraries } = a;
  libraries.splice(0,1);
  let totalScore = 0;
  let signUpContainer = 0;
  let output = [];

  libraries.forEach( lib => {
    signUpContainer += lib.signUpDays;
    let time = daysToScan - signUpContainer;
    let booksToScan = [];
    
    if ( time > 0 ) {
      booksToScan = lib.bookIds.slice(0, time*lib.shipBooksPerDay-1 );
      booksToScan = sortArr(books, booksToScan);
      booksToScan.forEach( scan => {
        totalScore += books.find( book => book.id+'' === scan ).score;
      } );
      output.push({
        libIdSelected: lib.libId,
        bookIdsSelected: booksToScan
      })
    }

  } );
  console.log(totalScore)
  return output;
};

function sortArr(books, bookIds) {
  let coincidence = 0;
  while (coincidence > 0) {
    coincidence=0;
    for (let i=0; i<bookIds.length; i++) {
      bookIds[i]
      if (bookIds[i+1]) {
        if (books.find( book => book.id === +bookIds[i] ) < books.find( book => book.id === +bookIds[i+1] )) {
          coincidence++;
          let temp = bookIds[i];
          bookIds[i] = bookIds[i+1];
          bookIds[i+1] = temp;
        }
      }
    }
  }
  
  return bookIds;
}