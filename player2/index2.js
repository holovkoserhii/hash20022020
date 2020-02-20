

const startAnalysis = a => {
  let { books, daysToScan, libraries } = a;
  libraries.splice(0,1);
  let result = 0;
  let signUpContainer = 0;

  libraries.forEach( lib => {
    signUpContainer += lib.signUpDays;
    let time = daysToScan - signUpContainer;
    
    if ( time > 0 ) {
      booksToScan = lib.bookIds.slice(0, time*lib.shipBooksPerDay-1 );
      booksToScan.forEach( scan => {
        result += books.find( book => book.id+'' === scan ).score;
      } )
    }
  } );

  return console.log(result);
};