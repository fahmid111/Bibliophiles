import jwt from 'jsonwebtoken';
import { secret } from '../Database/databaseConfiguration.js';
import { getAllAuthorsDB, getAllAwardsDB, getAllBindsDB, getAllGenreDB, getAllLanguagesDB, getAllPublishersDB, getAllReviewsOfBookDB, getAuthorBooksDB, getAuthorDB, getAvgRatingDB, getBookDB, getBookFromBookshelfDB, getBookshelvesDB, getCompleteBookDB, getGenreBookDB, getGenreDB, getOwnReviewDB, getPublisherBooksDB, getPublisherDB, getRatingDB, getRecentBookDB, getTopBookDB, getUserRatedBooksDB, getUserReviewedBooksDB } from '../Database/queryFunctions.js';

export async function getBook(req, res, next){
  try {
      const context = {};

      context.ISBN = req.query.ISBN;
      context.Title = req.query.Title;
  
      const rows = await getBookDB(context);
  
      if (req.query.ISBN || req.query.Title) {
        if (rows.length === 1) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).end();
        }
      } else {
        res.status(200).json(rows);
      }
    } catch (err) {
      next(err);
    }
}

export async function getTopBook(req, res, next){
  try {
      const context = {};

      context.COUNT = req.query.COUNT;
  
      const rows = await getTopBookDB(context);
  
      if (req.query.ISBN || req.query.Title) {
        if (rows.length === 1) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).end();
        }
      } else {
        res.status(200).json(rows);
      }
    } catch (err) {
      next(err);
    }
}

export async function getRecentBook(req, res, next){
  try {
      const context = {};

      context.COUNT = req.query.COUNT;
  
      const rows = await getRecentBookDB(context);
  
      if (req.query.ISBN || req.query.Title) {
        if (rows.length === 1) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).end();
        }
      } else {
        res.status(200).json(rows);
      }
    } catch (err) {
      next(err);
    }
}

export async function getBookshelves(req, res, next){
  try {
    var token = req.headers['x-access-token'];
    jwt.verify(token, secret, async function(err, decoded) {
      let bookshelves = {
        PERSON_ID: decoded.PERSON_ID           
      };
      if(req.query.BOOKSHELF_ID){
        bookshelves.BOOKSHELF_ID = req.query.BOOKSHELF_ID;
      }
      try {
        bookshelves = await getBookshelvesDB(bookshelves);
        if (bookshelves.length > 0) {
          res.status(201).json(bookshelves);
        } else {
          res.status(404).end();
        }
      } catch (error) {
        res.status(501).json(error);  
      }
      
    });

    } catch (err) {
      next(err);
    }
}

export async function getCompleteBook(req, res, next){
  try {
      const context = {};

      context.ISBN = req.query.ISBN;
      context.Title = req.query.Title;
  
      const rows = await getCompleteBookDB(context);
  
      if (rows.length >= 1) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
}

export async function getBooksFromBookshelf(req, res, next){
  try {
    var token = req.headers['x-access-token'];
    jwt.verify(token, secret, async function(err, decoded) {
      let book = {
        PERSON_ID: decoded.PERSON_ID,
        BOOKSHELF_ID: req.query.BOOKSHELF_ID           
      };

      try {
        book = await getBookFromBookshelfDB(book);
        if (book.length > 0) {
          res.status(201).json(book);
        } else {
          res.status(404).end();
        }
      } catch (error) {
        res.status(501).json(error);  
      }
  
      
    });

    } catch (err) {
      next(err);
    }
}

export async function getRating(req, res, next){
  try {
    var token = req.headers['x-access-token'];
    jwt.verify(token, secret, async function(err, decoded) {
      let rate = {
        PERSON_ID: decoded.PERSON_ID,
        ISBN: req.query.ISBN           
      };

      try {
        rate = await getRatingDB(rate);
        if (rate.length > 0) {
          res.status(201).json(rate);
        } else {
          res.status(404).end();
        }
      } catch (error) {
        res.status(501).json(error);  
      }
  
      
    });

    } catch (err) {
      next(err);
    }
}

export async function getAvgRating(req, res, next){
  try {
      const context = {};

      context.ISBN = req.query.ISBN;
  
      const rows = await getAvgRatingDB(context);
  
      if (rows.length >= 1) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
}


export async function getOwnReview(req, res, next){
  try {
    var token = req.headers['x-access-token'];
    jwt.verify(token, secret, async function(err, decoded) {
      let review = {
        PERSON_ID: decoded.PERSON_ID,
        ISBN: req.query.ISBN           
      };

      try {
        review = await getOwnReviewDB(review);
        if (review.length > 0) {
          res.status(201).json(review);
        } else {
          res.status(404).end();
        }
      } catch (error) {
        res.status(501).json(error);  
      }
  
      
    });

    } catch (err) {
      next(err);
    }
}

export async function getUserRatedBooks(req, res, next){
  try {
    var token = req.headers['x-access-token'];
    jwt.verify(token, secret, async function(err, decoded) {
      let context = {
        PERSON_ID: decoded.PERSON_ID,
      };

      try {
    
        const rows = await getUserRatedBooksDB(context);
  
        if (rows.length > 0) {
          res.status(200).json(rows);
        } else {
          res.status(404).end();
        }
  
      } catch (err) {
        next(err);
      }
  
      
    });

    } catch (err) {
      next(err);
    }
}

export async function getUserReviewedBooks(req, res, next){
  try {
    var token = req.headers['x-access-token'];
    jwt.verify(token, secret, async function(err, decoded) {
      let context = {
        PERSON_ID: decoded.PERSON_ID,
      };

      try {
    
        const rows = await getUserReviewedBooksDB(context);
  
        if (rows.length > 0) {
          res.status(200).json(rows);
        } else {
          res.status(404).end();
        }
  
      } catch (err) {
        next(err);
      }
  
      
    });

    } catch (err) {
      next(err);
    }
}



export async function getAllReviewsOfBook(req, res, next){
  try {
      const context = {};

      context.ISBN = req.query.ISBN;
  
      const rows = await getAllReviewsOfBookDB(context);

      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }

    } catch (err) {
      next(err);
    }
}

export async function getAllAuthors(req, res, next){
  try {
      const rows = await getAllAuthorsDB();

      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }

    } catch (err) {
      next(err);
    }
}

export async function getAllPublishers(req, res, next){
  try {
      const rows = await getAllPublishersDB();

      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }

    } catch (err) {
      next(err);
    }
}


export async function getAllGenre(req, res, next){
  try {
      const rows = await getAllGenreDB();

      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }

    } catch (err) {
      next(err);
    }
}

export async function getAllAwards(req, res, next){
  try {
      const rows = await getAllAwardsDB();

      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }

    } catch (err) {
      next(err);
    }
}

export async function getAllLanguages(req, res, next){
  try {
      const rows = await getAllLanguagesDB();

      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }

    } catch (err) {
      next(err);
    }
}

export async function getAllBinds(req, res, next){
  try {
      const rows = await getAllBindsDB();

      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }

    } catch (err) {
      next(err);
    }
}

export async function getGenreBook(req, res, next){
  try {
      const context = {};

      context.ID = req.query.ID;
      context.name = req.query.name;
  
      const rows = await getGenreBookDB(context);

      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }

    } catch (err) {
      next(err);
    }
}

// export async function getAuthor(req, res, next){
//     try {
//         const context = {};
//         context.ID = Number(req.query.ID);
    
//         const rows = await getAuthorDB(context);
    
//         if (req.query.ID) {
//           if (rows.length === 1) {
//             res.status(200).json(rows[0]);
//           } else {
//             res.status(404).end();
//           }
//         } else {
//           res.status(200).json(rows);
//         }
//       } catch (err) {
//         next(err);
//       }
// }


export async function getAuthor(req, res, next){
  try {
      const context = {};
      //context.ID = Number(req.query.ID);
      context.PERSON_ID = req.query.PERSON_ID;
      console.log('Hello')
      //console.log(context.ID);
  
      const rows = await getAuthorDB(context);
  
      if (req.query.ID) {
        if (rows.length === 1) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).end();
        }
      } else {
        res.status(200).json(rows);
      }
    } catch (err) {
      next(err);
    }
}

export async function getPublisher(req, res, next){
  try {
      const context = {};

      context.PUBLISHER_ID = req.query.PUBLISHER_ID;
  
      const rows = await getPublisherDB(context);
  
      if (rows.length >= 1) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
}

export async function getGenre(req, res, next){
  try {
      const context = {};

      context.GENRE_ID = req.query.GENRE_ID;
  
      const rows = await getGenreDB(context);
  
      if (rows.length >= 1) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
}

export async function getAuthorBooks(req, res, next){
  try {
      const context = {};

      context.PERSON_ID = req.query.PERSON_ID;
  
      const rows = await getAuthorBooksDB(context);

      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }

    } catch (err) {
      next(err);
    }
}

export async function getPublisherBooks(req, res, next){
  try {
      const context = {};
      console.log(req.query);

      context.PUBLISHER_ID = req.query.PUBLISHER_ID;
  
      const rows = await getPublisherBooksDB(context);

      if (rows.length > 0) {
        res.status(200).json(rows);
      } else {
        res.status(404).end();
      }

    } catch (err) {
      next(err);
    }
}