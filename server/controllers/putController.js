import jwt from 'jsonwebtoken';
import { secret } from '../Database/databaseConfiguration.js';
import { renameBookshelfDB, updateAdminDB, updateAuthorDB, updateBookDB, updateGenreDB, updatePublisherDB, updateUserDB } from '../Database/queryFunctions.js';
export async function renameBookshelf(req, res, next) {
    try {
      var token = req.headers['x-access-token'];
      jwt.verify(token, secret, async function(err, decoded) {
      console.log(req.body);
      let bookshelf = {
        BOOKSHELF_ID: req.body.BOOKSHELF_ID,
        BOOKSHELF_NAME: req.body.BOOKSHELF_NAME,                      
        PERSON_ID: decoded.PERSON_ID           
      };

      try {
        bookshelf = await renameBookshelfDB(bookshelf);
        res.status(201).json(bookshelf);
      } catch (error) {
        res.status(501).json(error);  
      }
      
    });
     
      
    } catch (err) {
      next(err);
    }
  }



  export async function updateBook(req, res, next) {
    try {
      var book = {
        ISBN: req.body.ISBN,                      
		    TITLE: req.body.TITLE,                    
		    COVER_IMAGE: req.body.COVER_IMAGE,      
		    BINDING: req.body.BINDING,
		    NUMBER_OF_PAGES: Number(req.body.NUMBER_OF_PAGES),
		    ORIGINAL_PUBLICATION_YEAR: Number(req.body.ORIGINAL_PUBLICATION_YEAR),
		    LANGUAGE: req.body.LANGUAGE,
		    DESCRIPTION: req.body.DESCRIPTION,               
		    SUMMARY: req.body.SUMMARY,                     
		    PUBLICATION_DATE: req.body.PUBLICATION_DATE
    };

    
    book = await updateBookDB(book);
    res.status(201).json(book);
     
      
    } catch (err) {
      next(err);
    }
  }


  export async function updateAuthor(req, res, next) {
    try {
      var author = {
        PERSON_ID: req.body.PERSON_ID,
        FIRST_NAME: req.body.FIRST_NAME,
        LAST_NAME: req.body.LAST_NAME,
        ADDRESS: req.body.ADDRESS,
        EMAIL: req.body.EMAIL,
        PHONE_NUMBER: req.body.PHONE_NUMBER,
        DETAILS: req.body.DETAILS,
        WEB_ADDRESS: req.body.WEB_ADDRESS
      };
    author = await updateAuthorDB(author);
    res.status(201).json(author);
     
      
    } catch (err) {
      next(err);
    }
  }


  export async function updatePublisher(req, res, next) {
    try {
      var publisher = {
        PUBLISHER_ID: req.body.PUBLISHER_ID,
        NAME: req.body.NAME,
        ADDRESS: req.body.ADDRESS,
        EMAIL_ID: req.body.EMAIL_ID,
        WEB_ADDRESS: req.body.WEB_ADDRESS
      };
    publisher = await updatePublisherDB(publisher);
    res.status(201).json(publisher);  
      
    } catch (err) {
      next(err);
    }
  }

  export async function updateGenre(req, res, next) {
    try {
      var genre = {
        GENRE_ID: req.body.GENRE_ID,
        GENRE_NAME: req.body.GENRE_NAME
      };
    genre = await updateGenreDB(genre);
    res.status(201).json(genre);
     
      
    } catch (err) {
      next(err);
    }
  }


  export async function updateUser(req, res, next){
    try {
      var token = req.headers['x-access-token'];
      jwt.verify(token, secret, async function(err, decoded) {
        let user = {
          PERSON_ID: decoded.PERSON_ID,
          FIRST_NAME: req.body.FIRST_NAME,
          LAST_NAME: req.body.LAST_NAME,
          ADDRESS: req.body.ADDRESS,
          EMAIL:req.body.EMAIL,
          PHONE_NUMBER: req.body.PHONE_NUMBER,
          DETAILS: req.body.DETAILS
        };
  
        try {
         
          user = await updateUserDB(user);
          res.status(201).json(user);
        } catch (error) {
          res.status(501).json(error);  
        }  
      });
  
      } catch (err) {
        next(err);
      }
  }


  export async function updateAdmin(req, res, next){
    try {
      var token = req.headers['x-access-token'];
      jwt.verify(token, secret, async function(err, decoded) {
        let admin = {
          PERSON_ID: decoded.PERSON_ID,
          FIRST_NAME: req.body.FIRST_NAME,
          LAST_NAME: req.body.LAST_NAME,
          ADDRESS: req.body.ADDRESS,
          EMAIL:req.body.EMAIL,
          PHONE_NUMBER: req.body.PHONE_NUMBER,
          DETAILS: req.body.DETAILS
        };
  
        try {
          admin = await updateAdminDB(admin);
          res.status(201).json(admin);
        } catch (error) {
          res.status(501).json(error);  
        }  
      });
  
      } catch (err) {
        next(err);
      }
  }
