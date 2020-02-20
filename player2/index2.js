

const startAnalysis = a => {
  let { books, daysToScan, libraries } = a;
  let totalScore = 0;
  let signUpContainer = 0;
  let output = [];

  libraries.forEach( lib => {
    signUpContainer += lib.signUpDays;
    let time = daysToScan - signUpContainer;
    let booksToScan = [];
    
    if ( time > 0 ) {
      booksToScan = lib.bookIds.slice(0, time*lib.shipBooksPerDay-1 );
      booksToScan.forEach( scan => {
        totalScore += books.find( book => book.id+'' === scan ).score;
      } );
      output.push({
        libIdSelected: lib.libId,
        bookIdsSelected: booksToScan
      })
    }

  } );
  console.log(totalScore);
  return output;
};