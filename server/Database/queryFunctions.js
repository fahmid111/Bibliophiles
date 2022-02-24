import { queryExecute } from './database.js';

function baseQuery(tableName){
    return "Select * From " + tableName;
}

function runProcedure(procedure){
    return "Begin\n" + procedure + "\;\nEnd\;";
}

export async function createBookshelfDB(bookshelf) {
    const bookshelfDB = Object.assign({}, bookshelf);
    let query = "insert into BOOKSHELF (PERSON_ID, BOOKSHELF_NAME)\nvalues (:PERSON_ID, :BOOKSHELF_NAME)";

    const result = await queryExecute(query, bookshelfDB);

    return bookshelfDB;
  }

  export async function renameBookshelfDB(bookshelf) {
    const bookshelfDB = Object.assign({}, bookshelf);
    let query = "UPDATE BOOKSHELF SET BOOKSHELF_NAME = :BOOKSHELF_NAME";
    query += "\nWHERE PERSON_ID = :PERSON_ID AND BOOKSHELF_ID = :BOOKSHELF_ID";

    const result = await queryExecute(query, bookshelfDB);

    return bookshelfDB;
  }

  export async function addBookToBookshelfDB(bookshelf) {
    const bookshelfDB = Object.assign({}, bookshelf);
    let query = "INSERT INTO BOOKSHELF_CONTENT(BOOKSHELF_ID, ISBN) VALUES (:BOOKSHELF_ID, :ISBN)";

    const result = await queryExecute(query, bookshelfDB);

    return bookshelfDB;
  }

  export async function rateBookDB(rate) {
    const rateDB = Object.assign({}, rate);
    let query = runProcedure("RATE(:PERSON_ID, :ISBN, :VALUE)");

    const result = await queryExecute(query, rateDB);

    return rateDB;
  }
  

  export async function getAvgRatingDB(context){
    let query = "SELECT NVL(Round(AVG(R.VALUE),2), 0) as AVERAGE_RATING FROM BOOK B LEFT JOIN RATING R ON (B.ISBN = R.ISBN)";
    const binds = {};

    if(context.ISBN){
        binds.ISBN = context.ISBN;
        query += "\nWhere B.ISBN = :ISBN";

    }

    const result = await queryExecute(query, binds);
    return result.rows;
}


export async function getAllGenreDB(){
    let query = baseQuery("GENRE");
    query+="\nORDER BY GENRE_NAME ASC";

    const result = await queryExecute(query);
    return result.rows;
}

export async function getUserRatedBooksDB(context){
    let query = baseQuery("BOOK B JOIN RATING R ON(B.ISBN=R.ISBN)");
    query+="\nWHERE R.PERSON_ID = :PERSON_ID";

    const result = await queryExecute(query, context);
    return result.rows;
}
export async function getUserReviewedBooksDB(context){
    let query = baseQuery("BOOK B JOIN REVIEW R ON(B.ISBN=R.ISBN)");
    query+="\nWHERE R.PERSON_ID = :PERSON_ID";

    const result = await queryExecute(query, context);
    return result.rows;
}

export async function getAllAuthorsDB(){
    let query = "Select (P.FIRST_NAME||' '||P.LAST_NAME) AS AUTHOR_NAME, A.PERSON_ID, (P.FIRST_NAME || ' ' || P.LAST_NAME || ' (' || P.EMAIL || ')' ) AS AUTHOR_NAME_EMAIL FROM AUTHOR A Join PERSON P On (A.PERSON_ID = P.PERSON_ID)";
    query+="\nORDER BY AUTHOR_NAME ASC";

    const result = await queryExecute(query);
    return result.rows;
}

// export async function getAllAuthorsDB(){
//     let query = "Select (P.FIRST_NAME||' '||P.LAST_NAME) AS AUTHOR_NAME, A.PERSON_ID FROM AUTHOR A Join PERSON P On (A.PERSON_ID = P.PERSON_ID)";
//     query+="\nORDER BY AUTHOR_NAME ASC";

//     const result = await queryExecute(query);
//     return result.rows;
// }

// export async function getAllPublishersDB(){
//     let query = "Select PUBLISHER_ID, NAME FROM PUBLISHER";
//     query+="\nORDER BY NAME ASC";

//     const result = await queryExecute(query);
//     return result.rows;
// }

export async function getAllPublishersDB(){
    let query = "Select PUBLISHER_ID, NAME, (NAME || ' (' || EMAIL_ID || ')') AS PUBLISHER_NAME_EMAIL FROM PUBLISHER";
    query+="\nORDER BY NAME ASC";

    const result = await queryExecute(query);
    return result.rows;
}

export async function getAllLanguagesDB(){
    let query = "SELECT LANGUAGE FROM BOOK GROUP BY LANGUAGE";
    query+="\nORDER BY LANGUAGE ASC";

    const result = await queryExecute(query);
    return result.rows;
}

export async function getAllBindsDB(){
    let query = "SELECT BINDING FROM BOOK GROUP BY BINDING";
    query+="\nORDER BY BINDING ASC";

    const result = await queryExecute(query);
    return result.rows;
}

export async function getAuthorBooksDB(context){
    let query = "SELECT B.ISBN, B.COVER_IMAGE, B.TITLE ";
    query+="\nFROM BOOK B JOIN WRITTEN_BY WB ON(B.ISBN=WB.ISBN)";
    query+="\nWHERE WB.PERSON_ID = :PERSON_ID";

    const result = await queryExecute(query, context);
    return result.rows;
}

export async function getPublisherBooksDB(context){
    let query = "SELECT ISBN, COVER_IMAGE, TITLE ";
    query+="\nFROM BOOK";
    query+="\nWHERE PUBLISHER_ID = :PUBLISHER_ID";

    console.log(context);

    const result = await queryExecute(query, context);
    return result.rows;
}

export async function getAllAwardsDB(){
    let query = "SELECT AWARDS FROM BOOK_AWARD GROUP BY AWARDS";
    query+="\nORDER BY AWARDS ASC";

    const result = await queryExecute(query);
    return result.rows;
}


  export async function reviewBookDB(review) {
    const reviewDB = Object.assign({}, review);
    let query = runProcedure("REVIEW_POST(:PERSON_ID, :ISBN, :REVIEW_CONTENT)");

    const result = await queryExecute(query, reviewDB);

    return reviewDB;
  }

  export async function getBookshelvesDB(bookshelves) {
    var bookshelvesDB = {};
    bookshelvesDB.PERSON_ID = bookshelves.PERSON_ID;
    let query = baseQuery("BOOKSHELF");
    query += "\nWhere PERSON_ID = :PERSON_ID";

    if(bookshelves.BOOKSHELF_ID){
        bookshelvesDB.BOOKSHELF_ID = bookshelves.BOOKSHELF_ID;
        query += " AND BOOKSHELF_ID = :BOOKSHELF_ID";
    }

    const result = await queryExecute(query, bookshelvesDB);
    return result.rows;
  }

  export async function getRatingDB(rate) {
    const rateDB = Object.assign({}, rate);
    let query = "SELECT VALUE FROM RATING";
    query += "\nWhere PERSON_ID = :PERSON_ID AND ISBN = :ISBN";
    console.log(query);
    const result = await queryExecute(query, rateDB);
    return result.rows;
  }

  export async function getOwnReviewDB(review) {
    const reviewDB = Object.assign({}, review);
    let query = "SELECT REVIEW_CONTENT FROM REVIEW";
    query += "\nWhere PERSON_ID = :PERSON_ID AND ISBN = :ISBN";
    console.log(query);
    const result = await queryExecute(query, reviewDB);
    return result.rows;
  }
  
  export async function getBookFromBookshelfDB(book) {
    const bookDB = Object.assign({}, book);
    let query = "Select B.ISBN, B.TITLE, B.COVER_IMAGE FROM BOOKSHELF BS join BOOKSHELF_CONTENT BC ON(BS.BOOKSHELF_ID = BC.BOOKSHELF_ID) JOIN BOOK B ON(BC.ISBN = B.ISBN)";
    query += "\nWhere BS.PERSON_ID = :PERSON_ID AND BS.BOOKSHELF_ID = :BOOKSHELF_ID";
    query += "\nORDER BY B.TITLE";

    const result = await queryExecute(query, bookDB);
    return result.rows;
  }

export async function findPersonDB(P_ID){
    let query = baseQuery('\"PERSON\"');
    const binds = {};
    binds.PERSON_ID = P_ID;

    query += "\nWhere PERSON_ID = :PERSON_ID";
    const result = await queryExecute(query, binds);
    return result.rows;
}

export async function postUserDB(user){
    console.log('hey')
    const procedure = "INSERT_USER(:FIRST_NAME, :LAST_NAME, :ADDRESS, :EMAIL, :PHONE_NUMBER, :DETAILS, :USER_NAME, :PASSWORD)";
    let query = runProcedure(procedure);
    const result = await queryExecute(query, user);
    return user;
}

export async function findUserDB(user){
    let query = baseQuery('\"USER\"');
    const binds = {};
    binds.USER_NAME = user.USER_NAME;

    query += "\nWhere USER_NAME = :USER_NAME";
    const result = await queryExecute(query, binds);
    return result.rows;
}

export async function postAdminDB(admin){
    const procedure = "INSERT_ADMIN(:FIRST_NAME, :LAST_NAME, :ADDRESS, :EMAIL, :PHONE_NUMBER, :DETAILS, :ADMIN_NAME, :PASSWORD)";
    let query = runProcedure(procedure);
    const result = await queryExecute(query, admin);
    return admin;
}

export async function findAdminDB(admin){
    let query = baseQuery('\"ADMIN\"');
    const binds = {};
    binds.ADMIN_NAME = admin.ADMIN_NAME;

    query += "\nWhere ADMIN_NAME = :ADMIN_NAME";
    const result = await queryExecute(query, binds);
    return result.rows;
}

export async function getBookDB(context){
    let query = "SELECT ISBN, TITLE, NUMBER_OF_PAGES, ORIGINAL_PUBLICATION_YEAR, COVER_IMAGE, LANGUAGE, TO_CHAR(PUBLICATION_DATE,'DD-MON-YYYY') AS PUBLICATION_DATE, BINDING, DESCRIPTION, SUMMARY";
    query += "\nFROM BOOK";
    const binds = {};

    if(context.ISBN){
        binds.ISBN = context.ISBN;
        query += "\nWhere ISBN = :ISBN";

    }else  if(context.Title){
        binds.Title = context.Title.toUpperCase();
        query += "\nWhere UPPER(TITLE) = :Title";
    }

    const result = await queryExecute(query, binds);
    return result.rows;
}

export async function getTopBookDB(context){
    let query01 = "SELECT TITLE, ISBN, COVER_IMAGE, AVERAGE_RATING, RANK() over(order by AVERAGE_RATING desc nulls last) as book_rank";
    query01 += "\nFROM (SELECT B.TITLE AS TITLE, B.ISBN AS ISBN, B.COVER_IMAGE AS COVER_IMAGE,  NVL(Round(AVG(R.VALUE),2), 0) as AVERAGE_RATING";
    query01 += "\nFROM BOOK B LEFT JOIN RATING R ON (B.ISBN = R.ISBN)";
    query01 += "\nGROUP BY B.ISBN, B.TITLE, B.COVER_IMAGE"
    query01 += "\nORDER BY AVERAGE_RATING DESC)"
    let query = baseQuery("(" + query01 + ")");
    query += "\nWHERE book_rank <= :COUNT";
    query += "\nORDER BY book_rank, TITLE";

    console.log(query);
    
    const result = await queryExecute(query, context);
    return result.rows;
}

export async function getRecentBookDB(context){
    let query = baseQuery("(SELECT ISBN, TITLE, COVER_IMAGE, PUBLICATION_DATE FROM BOOK ORDER BY PUBLICATION_DATE DESC)");
    
    query += "\nWHERE ROWNUM <= :COUNT";

    console.log(query);
    
    const result = await queryExecute(query, context);
    return result.rows;
}



export async function getCompleteBookDB(context){
    let query = "SELECT * FROM BOOK B JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID)";    
    const binds = {};

    if(context.ISBN){
        binds.ISBN = context.ISBN;
        query += "\nWhere B.ISBN = :ISBN";
    }

    let books = await queryExecute(query, binds);
    books = books.rows;
    console.log(books);
    return await getAuthorGenreIntoBook(books);
}

export async function getAdvancedSearchedBookDB(context){ 
    let query01 = "SELECT B.COVER_IMAGE, B.ISBN, B.TITLE, B.DESCRIPTION, B.LANGUAGE, B.NUMBER_OF_PAGES, B.ORIGINAL_PUBLICATION_YEAR, P.NAME FROM ";
    
    let queryAuthor = "SELECT WB.ISBN FROM PERSON PR JOIN AUTHOR A ON (PR.PERSON_ID = A.PERSON_ID) JOIN WRITTEN_BY WB ON (A.PERSON_ID = WB.PERSON_ID)";
    queryAuthor += "\nWHERE UPPER(PR.FIRST_NAME||' '||PR.LAST_NAME) LIKE :AUTHOR";
    
    let queryGenre = "SELECT ISBN FROM BOOK_GENRE";
    queryGenre += "\nWHERE GENRE_ID = :GENRE_ID";
    
    let queryAward = "SELECT ISBN FROM BOOK_AWARD";
    queryAward += "\nWhere AWARDS = :AWARD";

    let queryRating = "SELECT B.ISBN FROM BOOK B LEFT JOIN RATING R ON (B.ISBN = R.ISBN)";
    queryRating += "\nGROUP BY B.ISBN";
    queryRating += "\nHAVING NVL(Round(AVG(R.VALUE),2), 0) BETWEEN :RATING_START AND :RATING_END";

    const binds = {};

    query01 += "BOOK B JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID)";
    query01 += "\nWhere ";
    if(context.TITLE){
        query01 += "UPPER(B.TITLE) LIKE :TITLE AND ";
        binds.TITLE = context.TITLE;
    }
    if(context.YEAR_START){
        query01 += "B.ORIGINAL_PUBLICATION_YEAR BETWEEN :YEAR_START AND :YEAR_END AND ";
        binds.YEAR_START = Number(context.YEAR_START);
        binds.YEAR_END = Number(context.YEAR_END);
    }
    if(context.PAGE_START){
        query01 += "B.NUMBER_OF_PAGES BETWEEN :PAGE_START AND :PAGE_END AND ";
        binds.PAGE_START = Number(context.PAGE_START);
        binds.PAGE_END = Number(context.PAGE_END);
    }
    if(context.LANGUAGE){
        query01 += "B.LANGUAGE = :LANGUAGE AND ";
        binds.LANGUAGE = context.LANGUAGE;
    }
    if(context.BINDING){
        query01 += "B.BINDING = :BINDING AND ";
        binds.BINDING = context.BINDING;
    }
    if(context.PUBLISHER){
        query01 += "UPPER(P.NAME) LIKE :PUBLISHER AND ";
        binds.PUBLISHER = context.PUBLISHER;
    }
    if(context.AUTHOR){
        query01 += "B.ISBN IN (" + queryAuthor +") AND ";
        binds.AUTHOR = context.AUTHOR;
    }
    if(context.GENRE_ID){
        query01 += "B.ISBN IN (" + queryGenre +") AND ";
        binds.GENRE_ID = context.GENRE_ID;
    }
    if(context.AWARD){
        query01 += "B.ISBN IN (" + queryAward +") AND ";
        binds.AWARD = context.AWARD;
    }
    if(context.RATING_START){
        query01 += "B.ISBN IN (" + queryRating +") AND ";
        binds.RATING_START = Number(context.RATING_START);
        binds.RATING_END = Number(context.RATING_END);
    }

    query01 = query01.slice(0, -4);

    if(context.SORT){
        if(context.SORT === 'title'){
            if(context.SORT_TYPE){
                if(context.SORT_TYPE==='desc'){
                    query01 += "\nORDER BY B.TITLE DESC";
                }else{
                    query01 += "\nORDER BY B.TITLE  ASC";
                }
            }else{
                query01 += "\nORDER BY B.TITLE ASC";
            }

        }else if(context.SORT === 'avg'){
            let queryAvg = "SELECT T.COVER_IMAGE, T.ISBN, T.TITLE, T.DESCRIPTION, T.LANGUAGE, T.NUMBER_OF_PAGES, T.ORIGINAL_PUBLICATION_YEAR, T.NAME";
            query01 = queryAvg + "\nFROM (" + query01 + ") T LEFT JOIN RATING R ON (T.ISBN = R.ISBN)";
            query01 += "\nGROUP BY T.COVER_IMAGE, T.ISBN, T.TITLE, T.DESCRIPTION, T.LANGUAGE, T.NUMBER_OF_PAGES, T.ORIGINAL_PUBLICATION_YEAR, T.NAME";
            if(context.SORT_TYPE){
                if(context.SORT_TYPE==='desc'){
                    query01 += "\nORDER BY NVL(Round(AVG(R.VALUE),2), 0) DESC";
                }else{
                    query01 += "\nORDER BY NVL(Round(AVG(R.VALUE),2), 0)  ASC";
                }
            }else{
                query01 += "\nORDER BY NVL(Round(AVG(R.VALUE),2), 0)  DESC";
            }

        }else if(context.SORT === 'year'){
            if(context.SORT_TYPE){
                if(context.SORT_TYPE==='desc'){
                    query01 += "\nORDER BY B.ORIGINAL_PUBLICATION_YEAR DESC";
                }else{
                    query01 += "\nORDER BY B.ORIGINAL_PUBLICATION_YEAR  ASC";
                }
            }else{
                query01 += "\nORDER BY B.ORIGINAL_PUBLICATION_YEAR  ASC";
            }
        }else if(context.SORT === 'pages'){
            if(context.SORT_TYPE){
                if(context.SORT_TYPE==='desc'){
                    query01 += "\nORDER BY B.NUMBER_OF_PAGES DESC";
                }else{
                    query01 += "\nORDER BY B.NUMBER_OF_PAGES  ASC";
                }
            }else{
                query01 += "\nORDER BY B.NUMBER_OF_PAGES ASC";
            }
        }
    }else{
        query01 += "\nORDER BY B.TITLE ASC";
    }

    console.log(query01);
    console.log(binds);

    let books = await queryExecute(query01, binds);
    books = books.rows;
    
    for (var i = 0; i < books.length; i++){  
        const binds02 = {
            ISBN: books[i].ISBN
        };
        let rating = await getAvgRatingDB(binds02);
        books[i].AVG_RATING = rating[0].AVERAGE_RATING;
    }

    return await getAuthorGenreIntoBook(books);
}

export async function getSearchedBookDB(context){
    // let query = "SELECT B.ISBN, B.TITLE, B.COVER_IMAGE, B.NUMBER_OF_PAGES, B.LANGUAGE, B.ORIGINAL_PUBLICATION_YEAR, B.DESCRIPTION, P.NAME, (PR.FIRST_NAME|| ' ' ||PR.LAST_NAME) AS AUTHOR_NAME from BOOK B join PUBLISHER P ON(B.PUBLISHER_ID = P.PUBLISHER_ID) JOIN WRITTEN_BY WB ON (B.ISBN = WB.ISBN) JOIN AUTHOR A ON (WB.PERSON_ID = A.PERSON_ID) JOIN PERSON PR ON (A.PERSON_ID = PR.PERSON_ID) JOIN BOOK_GENRE BG ON (B.ISBN = BG.ISBN) JOIN GENRE G ON (BG.GENRE_ID = G.GENRE_ID)";
    // let groupByString = " GROUP BY B.ISBN, B.TITLE, B.COVER_IMAGE, B.NUMBER_OF_PAGES, B.LANGUAGE, B.ORIGINAL_PUBLICATION_YEAR, B.DESCRIPTION, P.NAME, (PR.FIRST_NAME|| ' ' ||PR.LAST_NAME)";
    
    let query01 = "SELECT B.COVER_IMAGE, B.ISBN, B.TITLE, B.DESCRIPTION, B.LANGUAGE, B.NUMBER_OF_PAGES, B.ORIGINAL_PUBLICATION_YEAR, P.NAME FROM ";

    const binds = {
        SEARCH_TEXT: context.SEARCH_TEXT
    };

    if(context.CONSTRAINT === 'Title'){
        query01 += "BOOK B JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID)";
        query01 += "\nWhere UPPER(B.TITLE) LIKE :SEARCH_TEXT";
        query01 += "\nOrder by B.TITLE ASC";

    }else if(context.CONSTRAINT === 'Author'){
        query01 += "PERSON PR JOIN AUTHOR A ON (PR.PERSON_ID = A.PERSON_ID) JOIN WRITTEN_BY WB ON (A.PERSON_ID = WB.PERSON_ID) JOIN BOOK B ON (B.ISBN = WB.ISBN) JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID)";
        query01 += "\nWhere UPPER(PR.FIRST_NAME||' '||PR.LAST_NAME) LIKE :SEARCH_TEXT";
        query01 += "\nOrder by B.TITLE ASC";

    }else if(context.CONSTRAINT === 'Genre'){
        query01 += "BOOK B JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID) JOIN BOOK_GENRE BG ON(B.ISBN = BG.ISBN) JOIN GENRE G ON (BG.GENRE_ID = G.GENRE_ID)"
        query01 += "\nWhere UPPER(G.GENRE_NAME) LIKE :SEARCH_TEXT";
        query01 += "\nOrder by B.TITLE ASC";
    }else if(context.CONSTRAINT === 'Publisher'){
        query01 += "BOOK B JOIN PUBLISHER P ON (B.PUBLISHER_ID = P.PUBLISHER_ID)"
        query01 += "\nWhere UPPER(P.NAME) LIKE :SEARCH_TEXT";
        query01 += "\nOrder by B.TITLE ASC";
    }

    let books = await queryExecute(query01, binds);
    books = books.rows;
    
    for (var i = 0; i < books.length; i++){  
        const binds02 = {
            ISBN: books[i].ISBN
        };
        let rating = await getAvgRatingDB(binds02);
        books[i].AVG_RATING = rating[0].AVERAGE_RATING;
    }

    return await getAuthorGenreIntoBook(books);
}

async function getAuthorGenreIntoBook(books){

    let query02 = "SELECT PR.FIRST_NAME||' '||PR.LAST_NAME AS AUTHOR_NAME, PR.PERSON_ID AS AUTHOR_ID ";
    query02 += "FROM WRITTEN_BY WB JOIN AUTHOR A ON(WB.PERSON_ID = A.PERSON_ID) JOIN PERSON PR ON(A.PERSON_ID = PR.PERSON_ID)";
    let query03 = "SELECT G.GENRE_NAME FROM GENRE G JOIN BOOK_GENRE BG ON(G.GENRE_ID = BG.GENRE_ID)";

    for (var i = 0; i < books.length; i++){  
        let queryAuthor = query02 + "\nWHERE WB.ISBN = :ISBN";
        let queryGenre = query03 + "\nWHERE BG.ISBN = :ISBN";
        const binds02 = {
            ISBN: books[i].ISBN
        };
        let authors = await queryExecute(queryAuthor, binds02);
        let genres = await queryExecute(queryGenre, binds02);
        books[i].AUTHORS = authors.rows;
        books[i].GENRES = genres.rows;
    }
    return books;

}


// export async function getSearchedBookDB(context){
//     let query = "SELECT B.ISBN, B.TITLE, B.COVER_IMAGE, B.NUMBER_OF_PAGES, B.LANGUAGE, B.ORIGINAL_PUBLICATION_YEAR, B.DESCRIPTION, P.NAME, (PR.FIRST_NAME|| ' ' ||PR.LAST_NAME) AS AUTHOR_NAME from BOOK B join PUBLISHER P ON(B.PUBLISHER_ID = P.PUBLISHER_ID) JOIN WRITTEN_BY WB ON (B.ISBN = WB.ISBN) JOIN AUTHOR A ON (WB.PERSON_ID = A.PERSON_ID) JOIN PERSON PR ON (A.PERSON_ID = PR.PERSON_ID) JOIN BOOK_GENRE BG ON (B.ISBN = BG.ISBN) JOIN GENRE G ON (BG.GENRE_ID = G.GENRE_ID)";
//     let groupByString = " GROUP BY B.ISBN, B.TITLE, B.COVER_IMAGE, B.NUMBER_OF_PAGES, B.LANGUAGE, B.ORIGINAL_PUBLICATION_YEAR, B.DESCRIPTION, P.NAME, (PR.FIRST_NAME|| ' ' ||PR.LAST_NAME)";
    
//     const binds = {
//         SEARCH_TEXT: context.SEARCH_TEXT
//     };

//     if(context.CONSTRAINT === 'Title'){
//         console.log('at title');
//         query += "\nWhere UPPER(B.TITLE) LIKE :SEARCH_TEXT";

//     }else if(context.CONSTRAINT === 'Author'){
//         console.log('at author');
//         query += "\nWhere UPPER(PR.FIRST_NAME||' '||PR.LAST_NAME) LIKE :SEARCH_TEXT";

//     }else if(context.CONSTRAINT === 'Genre'){
//         console.log('at genre');
//         query += "\nWhere UPPER(G.GENRE_NAME) LIKE :SEARCH_TEXT";

//     }else if(context.CONSTRAINT === 'Publisher'){
//         console.log('at publisher');
//         query += "\nWhere UPPER(P.NAME) LIKE :SEARCH_TEXT";

//     }
//     query += groupByString;
//     const result = await queryExecute(query, binds);
//     return result.rows;
// }

export async function getGenreBookDB(context){
    let query = baseQuery("BOOK B join BOOK_GENRE BG ON(B.ISBN = BG.ISBN) join GENRE G ON(BG.GENRE_ID = G.GENRE_ID)");
    const binds = {};

    if(context.ID){
        binds.ID = context.ID;
        query += "\nWhere G.GENRE_ID = :ID";

    }else  if(context.name){
        binds.name = context.name.toUpperCase();
        query += "\nWhere UPPER(GENRE_NAME) = :name";
    }

    const result = await queryExecute(query, binds);
    return result.rows;
}

export async function getAllReviewsOfBookDB(context){
    let query = "SELECT P.PERSON_ID, (P.FIRST_NAME||' '||P.LAST_NAME) AS NAME, U.USER_NAME, R.REVIEW_CONTENT from PERSON P JOIN REVIEW R ON(P.PERSON_ID = R.PERSON_ID) JOIN \"USER\" U ON(P.PERSON_ID = U.PERSON_ID)";
    query += "\nWHERE R.ISBN = :ISBN";
    query += "\nORDER BY NAME";
    const binds = {};

    binds.ISBN = context.ISBN;

    const result = await queryExecute(query, binds);

    for (var i = 0; i < result.rows.length; i++){  
        const binds02 = {
            ISBN: context.ISBN,
            PERSON_ID: result.rows[i].PERSON_ID
        };
        let rating = await getRatingDB(binds02);
        if(rating.length>0){
            result.rows[i].RATING = rating[0].VALUE;
        }else{
            result.rows[i].RATING = null;
        }
    }

    return result.rows;
}

export async function createBookDB(book) {
    const bookDB = Object.assign({}, book);
    let query = "insert into BOOK (ISBN, TITLE, COVER_IMAGE, BINDING, NUMBER_OF_PAGES, ORIGINAL_PUBLICATION_YEAR, LANGUAGE, DESCRIPTION, SUMMARY, PUBLISHER_ID, PUBLICATION_DATE)\nvalues (:ISBN, :TITLE, :COVER_IMAGE, :BINDING, :NUMBER_OF_PAGES, :ORIGINAL_PUBLICATION_YEAR, :LANGUAGE, :DESCRIPTION, :SUMMARY, :PUBLISHER_ID, :PUBLICATION_DATE)";

    const result = await queryExecute(query, bookDB);

    return bookDB;
  }

// export async function getAuthorDB(context){
//     let queryPerson = baseQuery("Person");
//     let queryAuthor = baseQuery("Author");
//     const binds = {};

//     if(context.ID){
//         binds.ID = context.ID;
//         queryPerson += "\nWhere Person_ID = :ID\nAnd Exists(" + queryAuthor + "\nWhere Person_ID = :ID)";

//     }

//     const result = await queryExecute(queryPerson, binds);
//     return result.rows;
// }

export async function deleteBookOfBookshelfDB(context){
    let query = "delete from BOOKSHELF_CONTENT";
    console.log(context);
    query += "\nwhere ISBN = :ISBN AND BOOKSHELF_ID = :BOOKSHELF_ID"

    const result = await queryExecute(query, context);
    return result;
}

export async function deleteAllBooksBookshelfDB(context){
    let query = "delete from BOOKSHELF_CONTENT";
    console.log(context);
    query += "\nwhere BOOKSHELF_ID = :BOOKSHELF_ID"

    const result = await queryExecute(query, context);
    return result;
}
export async function deleteBookshelfDB(context){
    let query = "delete from BOOKSHELF";
    console.log(context);
    query += "\nwhere BOOKSHELF_ID = :BOOKSHELF_ID"

    const result = await queryExecute(query, context);
    return result;
}

export async function addBookDB(book) {
    const procedure = "INSERT_BOOK(:ISBN, :TITLE, :COVER_IMAGE, :BINDING, :NUMBER_OF_PAGES, :ORIGINAL_PUBLICATION_YEAR, :LANGUAGE, :DESCRIPTION, :SUMMARY, :PUBLISHER_ID, :PUBLICATION_DATE)";
    let query = runProcedure(procedure);
    const result = await queryExecute(query, book);
    return book;
}

export async function addBookAwardDB(bookAward) {
    const procedure = "INSERT_BOOK_AWARD(:ISBN, :AWARDS)";
    let query = runProcedure(procedure);
    const result = await queryExecute(query, bookAward);
    return bookAward;
}

export async function addWrittenByDB(bookAuthor) {
    const procedure = "INSERT_WRITTEN_BY(:ISBN, :AUTHOR_ID)";
    let query = runProcedure(procedure);
    const result = await queryExecute(query, bookAuthor);
    return bookAuthor;
}

export async function addBookGenreDB(bookGenre) {
    const procedure = "INSERT_BOOK_GENRE(:ISBN, :GENRE_ID)";
    let query = runProcedure(procedure);
    const result = await queryExecute(query, bookGenre);
    return bookGenre;
}

export async function updateBookDB(context){
    let query = runProcedure("UPDATE_BOOK(:ISBN, :TITLE, :COVER_IMAGE, :BINDING, :NUMBER_OF_PAGES, :ORIGINAL_PUBLICATION_YEAR, :LANGUAGE, :DESCRIPTION, :SUMMARY, :PUBLICATION_DATE)");

    const result = await queryExecute(query, context);
    return result;
}

export async function deleteBookDB(context){
    let query = runProcedure("DELETE_BOOK(:ISBN)");

    const result = await queryExecute(query, context);
    return result;
}

// export async function getAuthorDB(context){
//     /* let queryPerson = baseQuery("Person");
//     let queryAuthor = baseQuery("Author");
//     const binds = {};

//     if(context.ID){
//         binds.ID = context.ID;
//         queryPerson += "\nWhere Person_ID = :ID\nAnd Exists(" + queryAuthor + "\nWhere Person_ID = :ID)";

//     } */

//     let query = "";
//     const binds = {};
//     if(context.PERSON_ID) {
//         binds.PERSON_ID = context.PERSON_ID;
//         query += "SELECT * FROM PERSON P JOIN AUTHOR A ON (P.PERSON_ID = A.PERSON_ID) WHERE (P.PERSON_ID = :PERSON_ID AND EXISTS (SELECT * FROM AUTHOR AB WHERE AB.PERSON_ID = :PERSON_ID))";
//     }

//     const result = await queryExecute(query, binds);
//     return result.rows;
// }


export async function getAuthorDB(context){
    /* let queryPerson = baseQuery("Person");
    let queryAuthor = baseQuery("Author");
    const binds = {};

    if(context.ID){
        binds.ID = context.ID;
        queryPerson += "\nWhere Person_ID = :ID\nAnd Exists(" + queryAuthor + "\nWhere Person_ID = :ID)";

    } */

    let query = "";
    const binds = {};
    if(context.PERSON_ID) {
        binds.PERSON_ID = context.PERSON_ID;
        query += "SELECT P.PERSON_ID, P.FIRST_NAME, P.LAST_NAME, (P.FIRST_NAME || ' ' || P.LAST_NAME || ' (' || P.EMAIL || ')' ) AS AUTHOR_NAME_EMAIL, P.ADDRESS, P.EMAIL, P.PHONE_NUMBER, P.DETAILS, A.WEB_ADDRESS FROM PERSON P JOIN AUTHOR A ON (P.PERSON_ID = A.PERSON_ID) WHERE (P.PERSON_ID = :PERSON_ID AND EXISTS (SELECT * FROM AUTHOR AB WHERE AB.PERSON_ID = :PERSON_ID))";
    }

    const result = await queryExecute(query, binds);
    return result.rows;
}




export async function updateAuthorDB(context){
    let query = runProcedure("UPDATE_AUTHOR(:PERSON_ID, :FIRST_NAME, :LAST_NAME, :ADDRESS, :EMAIL, :PHONE_NUMBER, :DETAILS, :WEB_ADDRESS)");

    const result = await queryExecute(query, context);
    return result;
}

export async function addAuthorDB(author) {
    console.log(author);

    const procedure = "INSERT_AUTHOR(:FIRST_NAME, :LAST_NAME, :ADDRESS, :EMAIL, :PHONE_NUMBER, :DETAILS, :WEB_ADDRESS)";
    let query = runProcedure(procedure);
    const result = await queryExecute(query, author);
    return author;
}

export async function deleteAuthorDB(context){
    const procedure = "DELETE_AUTHOR(:PERSON_ID)";
    let query = runProcedure(procedure);

    const result = await queryExecute(query, context);
    return result;
}

export async function addPublisherDB(publisher) {
    const procedure = "INSERT_PUBLISHER(:NAME, :ADDRESS, :EMAIL_ID, :WEB_ADDRESS)";
    let query = runProcedure(procedure);
    const result = await queryExecute(query, publisher);
    return publisher;
}

// export async function getPublisherDB(context) {
//     let query = baseQuery("PUBLISHER");
//     const binds = {};

//     if(context.PUBLISHER_ID){
//         binds.PUBLISHER_ID = context.PUBLISHER_ID;
//         query += "\nWhere PUBLISHER_ID = :PUBLISHER_ID";
//     }
//     const result = await queryExecute(query, binds);
//     return result.rows;
// }

export async function getPublisherDB(context) {
    let query = "";
    const binds = {};
    if(context.PUBLISHER_ID){
        binds.PUBLISHER_ID = context.PUBLISHER_ID;
        query += "Select PUBLISHER_ID, NAME, ADDRESS, EMAIL_ID, (NAME || ' (' || EMAIL_ID || ')') AS PUBLISHER_NAME_EMAIL, WEB_ADDRESS FROM PUBLISHER";

        query += "\nWhere PUBLISHER_ID = :PUBLISHER_ID";
    }
    const result = await queryExecute(query, binds);
    return result.rows;
}

export async function updatePublisherDB(context){
    let query = runProcedure("UPDATE_PUBLISHER(:PUBLISHER_ID, :NAME, :ADDRESS, :EMAIL_ID, :WEB_ADDRESS)");

    const result = await queryExecute(query, context);
    return result;
}

export async function deletePublisherDB(context){
    const procedure = "DELETE_PUBLISHER(:PUBLISHER_ID)";
    let query = runProcedure(procedure);

    const result = await queryExecute(query, context);
    return result;
}

export async function addGenreDB(genre) {
    const procedure = "INSERT_GENRE(:GENRE_NAME)";
    let query = runProcedure(procedure);
    const result = await queryExecute(query, genre);
    return genre;
}
export async function updateGenreDB(context){
    let query = runProcedure("UPDATE_GENRE(:GENRE_ID, :GENRE_NAME)");

    const result = await queryExecute(query, context);
    return result;
}

export async function getGenreDB(context) {
    let query = baseQuery("GENRE");
    const binds = {};

    if(context.GENRE_ID){
        binds.GENRE_ID = context.GENRE_ID;
        query += "\nWhere GENRE_ID = :GENRE_ID";
    }
    const result = await queryExecute(query, binds);
    return result.rows;
}

export async function deleteGenreDB(context){
    let query = "delete from GENRE";
    console.log(context);
    query += "\nwhere GENRE_ID = :GENRE_ID"

    const result = await queryExecute(query, context);
    return result;
}

export async function updateUserDB(context){
    let query = runProcedure("UPDATE_USER(:PERSON_ID, :FIRST_NAME, :LAST_NAME, :ADDRESS, :EMAIL, :PHONE_NUMBER, :DETAILS)");

    const result = await queryExecute(query, context);
    return result;
}


export async function updateAdminDB(context){
    let query = runProcedure("UPDATE_ADMIN(:PERSON_ID, :FIRST_NAME, :LAST_NAME, :ADDRESS, :EMAIL, :PHONE_NUMBER, :DETAILS)");

    const result = await queryExecute(query, context);
    return result;
}