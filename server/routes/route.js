import bodyParser from 'body-parser';
import Express from 'express';
import { verifyAdminToken, verifyGeneralToken, verifyUserToken } from '../authentication/auth.js';
import { deleteAllBooksBookshelf, deleteAuthor, deleteBook, deleteBookOfBookshelf, deleteBookshelf, deleteGenre, deletePublisher } from '../controllers/deleteController.js';
import { getAllAuthors, getAllAwards, getAllBinds, getAllGenre, getAllLanguages, getAllPublishers, getAllReviewsOfBook, getAuthor, getAuthorBooks, getAvgRating, getBook, getBooksFromBookshelf, getBookshelves, getCompleteBook, getGenre, getGenreBook, getOwnReview, getPublisher, getPublisherBooks, getRating, getRecentBook, getTopBook, getUserRatedBooks, getUserReviewedBooks } from '../controllers/getController.js';
import { decodeToken, loginAdmin, loginUser, logout, postAdmin, postUser } from '../controllers/loginController.js';
import { addAuthor, addBook, addGenre, addPublisher, advanceSearch, bookToBookshelf, createBookshelf, postBook, rateBook, reviewBook, searchedBook } from '../controllers/postController.js';
import { renameBookshelf, updateAdmin, updateAuthor, updateBook, updateGenre, updatePublisher, updateUser } from '../controllers/putController.js';

const router = Express.Router();

let urlencodedParser = bodyParser.urlencoded({ extended: true });

router.route('/book').get(verifyGeneralToken, getBook).post(verifyAdminToken, urlencodedParser, postBook);
router.route('/complete-book').get(verifyGeneralToken, getCompleteBook);
router.route('/search-book').post(verifyUserToken, urlencodedParser, searchedBook);
router.route('/getGenreBook/:name?').get(verifyUserToken, getGenreBook);
router.route('/user/signup').post(urlencodedParser, postUser);
router.route('/admin/signup').post(urlencodedParser, postAdmin);
router.route('/user/login').post(urlencodedParser, loginUser);
router.route('/admin/login').post(urlencodedParser, loginAdmin);
router.route('/decode').get(verifyGeneralToken, decodeToken);
router.route('/logout').get(verifyGeneralToken, logout);
router.route('/bookshelves').get(verifyUserToken, getBookshelves);
router.route('/book-bookshelf').post(verifyUserToken, urlencodedParser, bookToBookshelf).get(verifyUserToken, getBooksFromBookshelf);
router.route('/create-bookshelf').post(verifyUserToken, urlencodedParser, createBookshelf);
router.route('/rate').post(verifyUserToken, urlencodedParser, rateBook).get(verifyUserToken, getRating);
router.route('/review').post(verifyUserToken, urlencodedParser, reviewBook).get(verifyUserToken, getOwnReview);
router.route('/all-reviews-book').get(verifyUserToken, getAllReviewsOfBook);
router.route('/avg-rating').get(verifyUserToken, getAvgRating);
router.route('/get-all-genre').get(verifyGeneralToken, getAllGenre);
router.route('/get-all-awards').get(verifyGeneralToken, getAllAwards);
router.route('/get-all-languages').get(verifyUserToken, getAllLanguages);
router.route('/get-all-binds').get(verifyUserToken, getAllBinds);
router.route('/advance-search').post(verifyUserToken, urlencodedParser, advanceSearch);
router.route('/del-book-bookshelf').delete(verifyUserToken, deleteBookOfBookshelf);
router.route('/del-all-books-bookshelf').delete(verifyUserToken, deleteAllBooksBookshelf);
router.route('/del-bookshelf').delete(verifyUserToken, deleteBookshelf);
router.route('/rename-bookshelf').put(verifyUserToken, urlencodedParser, renameBookshelf);
router.route('/all-authors').get(verifyAdminToken, getAllAuthors);
router.route('/all-publishers').get(verifyAdminToken, getAllPublishers);

router.route('/addBook').post(verifyAdminToken, urlencodedParser, addBook);
router.route('/updateBook').put(verifyAdminToken, urlencodedParser, updateBook);
router.route('/deleteBook').delete(verifyAdminToken, deleteBook);

router.route('/getPublisher').get(verifyGeneralToken, getPublisher);
router.route('/getGenre').get(verifyGeneralToken, getGenre);
router.route('/getAuthor').get(verifyGeneralToken, getAuthor);

router.route('/addAuthor').post(verifyAdminToken, urlencodedParser, addAuthor);
router.route('/addPublisher').post(verifyAdminToken, urlencodedParser, addPublisher);
router.route('/addGenre').post(verifyAdminToken, urlencodedParser, addGenre);

router.route('/updatePublisher').put(verifyAdminToken, urlencodedParser, updatePublisher);
router.route('/updateAuthor').put(verifyAdminToken, urlencodedParser, updateAuthor);
router.route('/updateGenre').put(verifyAdminToken, urlencodedParser, updateGenre);

router.route('/deleteGenre').delete(verifyAdminToken, deleteGenre);
router.route('/deletePublisher').delete(verifyAdminToken, deletePublisher);
router.route('/deleteAuthor').delete(verifyAdminToken, deleteAuthor);

router.route('/getAuthorBooks').get(verifyGeneralToken, getAuthorBooks);
router.route('/getPublisherBooks').get(verifyGeneralToken, getPublisherBooks);
router.route('/getUserRatedBooks').get(verifyUserToken, getUserRatedBooks);
router.route('/getUserReviewedBooks').get(verifyUserToken, getUserReviewedBooks);


router.route('/topBooks').get(verifyUserToken, getTopBook);
router.route('/recentBooks').get(verifyUserToken, getRecentBook);



router.route('/updateUser').put(verifyUserToken, urlencodedParser, updateUser);

router.route('/updateAdmin').put(verifyAdminToken, urlencodedParser, updateAdmin);



export default router;