import qs from "qs";
import React, { useEffect, useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import httpCommonParam from "../../../HTTP/httpCommonParam.js";
import httpCommonURL from "../../../HTTP/httpCommonURL";
import NavbarAdmin from "../../Navbar/NavbarAdmin";
import toastFun from "../../toast/toast";
import "./style.css";

export default function ManageBookPage(props) {
  const [authorsFromInput, setAuthorsFromInput] = useState("");
  const [genresFromInput, setGenresFromInput] = useState("");
  const [awardsFromInput, setAwardsFromInput] = useState("");

  const handleOnchange = (val) => setAuthorsFromInput(val);
  const handleOnchange02 = (val) => setGenresFromInput(val);
  const handleOnchange03 = (val) => setAwardsFromInput(val);

  const [bookAdd, setBookAdd] = useState({});
  const [awardLine, setAwardLine] = useState("");
  const [authors, setAuthor] = useState([]);
  const [awards, setAllAwards] = useState([]);
  const [publishers, setPublisher] = useState([]);
  const [genres, setAllGenres] = useState([]);

  const [valPublisher, setValPublisher] = useState(null);

  const [valISBN, setValISBN] = useState(null);
  const [delISBN, setDelISBN] = useState(null);

  const [bookUpdate, setBookUpdate] = useState({});
  const [updatedBook, setUpdatedBook] = useState({});

  useEffect(() => {
    getAllAuthors();
    getAllGenre();
    getAllPublishers();
    getAllAwards();
  }, []);

  const getAllAwards = async () => {
    try {
      const getAwards = await httpCommonParam.get("/get-all-awards");
      setAllAwards(getAwards.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAuthors = async () => {
    try {
      const getAuthors = await httpCommonParam.get(`/all-authors`);
      setAuthor(getAuthors.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPublishers = async () => {
    try {
      const getPublishers = await httpCommonParam.get(`/all-publishers`);
      setPublisher(getPublishers.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllGenre = async () => {
    try {
      const getGenres = await httpCommonParam.get("/get-all-genre");
      setAllGenres(getGenres.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookToUpdate = async (e) => {
    e.preventDefault();
    try {
      let getBook = await httpCommonParam.get(`/book?ISBN=${valISBN}`);
      getBook = getBook.data;
      setBookUpdate(getBook);
    } catch (error) {
      toastFun("No Book by This ISBN", 2);
    }
  };

  const updateBook = async (e) => {
    e.preventDefault();
    if (!bookUpdate.ISBN) {
      toastFun("Get Book by ISBN First", 2);
    } else {
      try {
        var data = qs.stringify(bookUpdate);
        const book = await httpCommonURL.put("/updateBook", data);
        setBookUpdate(book);
        toastFun("Updated Successfully!", 1);
      } catch (err) {
        toastFun(err.message, 2);
      }
    }
  };

  const deleteBook = async (e) => {
    e.preventDefault();
    if (!delISBN) {
      toastFun("Select Book by ISBN First to Delete", 2);
    } else {
      try {
        const book = await httpCommonParam.delete(
          `/deleteBook?ISBN=${delISBN}`
        );
        toastFun("Deleted Successfully!", 1);
      } catch (err) {
        toastFun("Failed to Delete", 2);
      }
    }
  };

  const addBook = async (e) => {
    e.preventDefault();
    if (bookAdd === {}) {
      toastFun("Fill the Necessary Fields", 2);
      return;
    } else if (
      !bookAdd.ISBN ||
      !bookAdd.TITLE ||
      !bookAdd.BINDING ||
      !bookAdd.NUMBER_OF_PAGES ||
      !bookAdd.PUBLICATION_YEAR ||
      !bookAdd.LANGUAGE ||
      !bookAdd.SUMMARY ||
      !bookAdd.DESCRIPTION ||
      !bookAdd.COVER_IMAGE ||
      !bookAdd.PUBLICATION_DATE ||
      !valPublisher
    ) {
      toastFun("Fill the Necessary Fields", 2);
      return;
    } else {
      if (!authorsFromInput || !genresFromInput) {
        toastFun("Fill the Necessary Fields", 2);
      } else {
        const authorArr = authorsFromInput.split(",");
        const genreArr = genresFromInput.split(",");
        var awardArr = [];
        if (awardsFromInput) {
          awardArr = awardsFromInput.split(",");
        }
        if (awardLine) {
          const arr = awardLine.split(",");
          for (var i = 0; i < arr.length; i++) {
            awardArr.push(arr[i]);
          }
        }
        bookAdd.AUTHORS = authorArr;
        bookAdd.GENRES = genreArr;
        bookAdd.AWARDS = awardArr;
        bookAdd.PUBLISHER_ID = valPublisher;
        console.log(awardArr);

        try {
          var data = qs.stringify(bookAdd);
          const book = await httpCommonURL.post("/addBook", data);
          setBookAdd(bookAdd);
          toastFun("Added Successfully!", 1);
        } catch (error) {
          toastFun("Cannot Add this Book, ISBN or Title Invalid!", 2);
        }
      }
    }
  };

  return (
    <div>
      <ToastContainer style={{ marginTop: "70px" }} />
      <div>
        <NavbarAdmin />
      </div>
      <div class="container-fluid content">
        <div class="row">
          <div class="col-md-10 create-container">
            <div class="col-md-4"></div>
            <div class="col-md-6 create-form" id="add-book">
              <h4>Add Book</h4>
              <form id="add-book-form" onSubmit={addBook}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ISBN *"
                    name="book-isbn"
                    onChange={(e) =>
                      setBookAdd({ ...bookAdd, ISBN: e.target.value })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Title *"
                    name="book-title"
                    onChange={(e) =>
                      setBookAdd({ ...bookAdd, TITLE: e.target.value })
                    }
                  />
                </div>

                <br />

                <MultiSelect
                  style={{ backgroundColor: "white", width: "395px" }}
                  className="multi-select"
                  onChange={handleOnchange}
                  placeholder="Select Author*"
                  options={authors.map((author) => ({
                    label: author.AUTHOR_NAME_EMAIL,
                    value: author.PERSON_ID,
                  }))}
                ></MultiSelect>
                <br></br>

                <div class="form-group">
                  <select
                    class="form-control"
                    placeholder="Select Publisher*"
                    value={valPublisher}
                    onChange={(e) => setValPublisher(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select Publisher*
                    </option>
                    {publishers.map((publisher) => {
                      return (
                        <option value={publisher.PUBLISHER_ID}>
                          {publisher.PUBLISHER_NAME_EMAIL}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <MultiSelect
                  style={{ backgroundColor: "white", width: "395px" }}
                  className="multi-select"
                  onChange={handleOnchange02}
                  placeholder="Select Genres*"
                  options={genres.map((genre) => ({
                    label: genre.GENRE_NAME,
                    value: genre.GENRE_ID,
                  }))}
                ></MultiSelect>
                <br></br>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Binding *"
                    name="book-binding"
                    onChange={(e) =>
                      setBookAdd({ ...bookAdd, BINDING: e.target.value })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Number of Pages *"
                    name="book-numOfPages"
                    onChange={(e) =>
                      setBookAdd({
                        ...bookAdd,
                        NUMBER_OF_PAGES: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Publication Year *"
                    name="book-publicationYear"
                    onChange={(e) =>
                      setBookAdd({
                        ...bookAdd,
                        PUBLICATION_YEAR: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Language *"
                    name="book-language"
                    onChange={(e) =>
                      setBookAdd({ ...bookAdd, LANGUAGE: e.target.value })
                    }
                  />
                </div>
                <div class="form-group">
                  <textarea
                    type="text"
                    class="form-control"
                    placeholder="Summary *"
                    name="book-summary"
                    onChange={(e) =>
                      setBookAdd({ ...bookAdd, SUMMARY: e.target.value })
                    }
                  />
                </div>
                <div class="form-group">
                  <textarea
                    type="text"
                    class="form-control"
                    placeholder="Description *"
                    name="book-description"
                    onChange={(e) =>
                      setBookAdd({ ...bookAdd, DESCRIPTION: e.target.value })
                    }
                  />
                </div>
                <MultiSelect
                  style={{ backgroundColor: "white", width: "395px" }}
                  className="multi-select"
                  onChange={handleOnchange03}
                  placeholder="Select Awards"
                  options={awards.map((award) => ({
                    label: award.AWARDS,
                    value: award.AWARDS,
                  }))}
                ></MultiSelect>
                <br></br>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="or... Write New Award Name"
                    name="book-award"
                    onChange={(e) => setAwardLine(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Cover Image (Only the Imgur Token) *"
                    name="book-coverImage"
                    onChange={(e) =>
                      setBookAdd({ ...bookAdd, COVER_IMAGE: e.target.value })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Publication Date *"
                    name="book-publication-date"
                    onChange={(e) =>
                      setBookAdd({
                        ...bookAdd,
                        PUBLICATION_DATE: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input type="submit" class="btnSubmit" value="Create" />
                </div>
              </form>
            </div>

            <p></p>
            <p></p>
            <div class="col-md-6 create-form" id="update-book">
              <h4> Update Book</h4>
              <form id="update-book-form" onSubmit={updateBook}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="ISBN *"
                    name="book-isbn"
                    onChange={(e) => setValISBN(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <button class="btnSubmit" onClick={getBookToUpdate}>
                    Get Book
                  </button>
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Title *"
                    name="book-title"
                    value={bookUpdate != null ? bookUpdate.TITLE : ""}
                    onChange={(e) =>
                      setBookUpdate({ ...bookUpdate, TITLE: e.target.value })
                    }
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Binding *"
                    name="book-binding"
                    value={bookUpdate != null ? bookUpdate.BINDING : ""}
                    onChange={(e) =>
                      setBookUpdate({ ...bookUpdate, BINDING: e.target.value })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Number of Pages *"
                    name="book-numOfPages"
                    value={bookUpdate != null ? bookUpdate.NUMBER_OF_PAGES : ""}
                    onChange={(e) =>
                      setBookUpdate({
                        ...bookUpdate,
                        NUMBER_OF_PAGES: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Publication Year *"
                    name="book-publicationYear"
                    value={
                      bookUpdate != null
                        ? bookUpdate.ORIGINAL_PUBLICATION_YEAR
                        : ""
                    }
                    onChange={(e) =>
                      setBookUpdate({
                        ...bookUpdate,
                        ORIGINAL_PUBLICATION_YEAR: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Language *"
                    name="book-language"
                    value={bookUpdate != null ? bookUpdate.LANGUAGE : ""}
                    onChange={(e) =>
                      setBookUpdate({ ...bookUpdate, LANGUAGE: e.target.value })
                    }
                  />
                </div>
                <div class="form-group">
                  <textarea
                    type="text"
                    class="form-control"
                    placeholder="Summary *"
                    name="book-summary"
                    value={bookUpdate != null ? bookUpdate.SUMMARY : ""}
                    onChange={(e) =>
                      setBookUpdate({ ...bookUpdate, SUMMARY: e.target.value })
                    }
                  />
                </div>
                <div class="form-group">
                  <textarea
                    type="text"
                    class="form-control"
                    placeholder="Description *"
                    name="book-description"
                    value={bookUpdate != null ? bookUpdate.DESCRIPTION : ""}
                    onChange={(e) =>
                      setBookUpdate({
                        ...bookUpdate,
                        DESCRIPTION: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Cover Image  (Only the Imgur Token) *"
                    name="book-coverImage"
                    value={bookUpdate != null ? bookUpdate.COVER_IMAGE : ""}
                    onChange={(e) =>
                      setBookUpdate({
                        ...bookUpdate,
                        COVER_IMAGE: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Publication Date *"
                    name="book-publicationDate"
                    value={
                      bookUpdate != null ? bookUpdate.PUBLICATION_DATE : ""
                    }
                    onChange={(e) =>
                      setBookUpdate({
                        ...bookUpdate,
                        PUBLICATION_DATE: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input type="submit" class="btnSubmit" value="Update" />
                </div>
              </form>
            </div>

            <p></p>
            <p></p>
            <div class="col-md-6 create-form" id="delete-book">
              <h4> Delete Book</h4>
              <form id="delete-book-form" onSubmit={deleteBook}>
                <div class="form-group">
                  <input
                    autocomplete="off"
                    type="text"
                    class="form-control"
                    placeholder="ISBN *"
                    name="book-isbn"
                    onChange={(e) => setDelISBN(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <input type="submit" class="btnSubmit" value="Delete" />
                </div>
              </form>
            </div>
          </div>

          <div class="col-md-2">
            <div class="card rightPanel">
              <div class="card-body">
                <h5 class="menu">
                  <i class="fab fa-mendeley"></i>&nbsp;Menu
                </h5>
                <br></br>
                {/* <Link
                  to={"#add-book"}
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Add Book</p>
                </Link>
                <br></br>
                <Link
                  to={"#update-book"}
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Update Book</p>
                </Link> */}
                <a
                  href="#add-book"
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Add Book</p>
                </a>
                <br></br>
                <a
                  href="#update-book"
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Update Book</p>
                </a>
                <br></br>
                <a
                  href="#delete-book"
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Delete Book</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
