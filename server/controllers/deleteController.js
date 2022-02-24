import { deleteAllBooksBookshelfDB, deleteAuthorDB, deleteBookDB, deleteBookOfBookshelfDB, deleteBookshelfDB, deleteGenreDB, deletePublisherDB } from '../Database/queryFunctions.js';

export async function deleteBookOfBookshelf(req, res, next){
    try {
        const context = {};
  
        context.ISBN = req.query.ISBN;
        context.BOOKSHELF_ID = req.query.BOOKSHELF_ID;
    
        const deleted = await deleteBookOfBookshelfDB(context);
    
        res.status(201).json(deleted);
      } catch (err) {
        next(err);
      }
}

export async function deleteAllBooksBookshelf(req, res, next){
    try {
        const context = {};
  
        context.BOOKSHELF_ID = req.query.BOOKSHELF_ID;
    
        const deleted = await deleteAllBooksBookshelfDB(context);
    
        res.status(201).json(deleted);
      } catch (err) {
        next(err);
      }
}
export async function deleteBookshelf(req, res, next){
    try {
        const context = {};
  
        context.BOOKSHELF_ID = req.query.BOOKSHELF_ID;
    
        let deleted = await deleteAllBooksBookshelfDB(context);
        
        deleted = await deleteBookshelfDB(context);
    
        res.status(201).json(deleted);
      } catch (err) {
        next(err);
      }
}

export async function deleteBook(req, res, next){
  try {
      const context = {};

      context.ISBN = req.query.ISBN;
  
      let deleted = await deleteBookDB(context);
        
      res.status(201).json(deleted);
    } catch (err) {
      next(err);
    }
}

export async function deleteAuthor(req, res, next){
  try {
      const context = {};

      context.PERSON_ID = req.query.PERSON_ID;
  
      let deleted = await deleteAuthorDB(context);
  
      res.status(201).json(deleted);
    } catch (err) {
      next(err);
    }
}

export async function deletePublisher(req, res, next){
  try {
      const context = {};

      context.PUBLISHER_ID = req.query.PUBLISHER_ID;
  
      let deleted = await deletePublisherDB(context);
  
      res.status(201).json(deleted);
    } catch (err) {
      next(err);
    }
}

export async function deleteGenre(req, res, next){
  try {
      const context = {};

      context.GENRE_ID = req.query.GENRE_ID;
  
      let deleted = await deleteGenreDB(context);
  
      res.status(201).json(deleted);
    } catch (err) {
      next(err);
    }
}
