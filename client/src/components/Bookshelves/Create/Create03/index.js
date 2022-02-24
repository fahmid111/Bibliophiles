import qs from "qs";
import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import httpCommonGet from "../../../../HTTP/httpCommonParam";
import httpCommonPost from "../../../../HTTP/httpCommonURL";
import NavbarHomePage from "../../../Navbar/NavbarHomePage";
import toastFun from "../../../toast/toast";
import "./style.css";

export default function Create(props) {
  const [bookshelves, setBookshelf] = useState([]);

  const [dropdownState, setDropdownState] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [searchtext, setSearchText] = useState({});

  const [books, setAllBooks] = useState([]);
  const getAllBooks = async () => {
    try {
      var data = qs.stringify({
        SEARCH_TEXT: searchtext.SEARCH_TEXT,
        CONSTRAINT: searchtext.CONSTRAINT,
      });

      const getBook = await httpCommonPost.post("/search-book", data);
      setAllBooks(getBook.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookshelves();
  }, []);

  const getAllBookshelves = async () => {
    try {
      const getBookshelves = await httpCommonGet.get(`/bookshelves`);
      setBookshelf(getBookshelves.data);
      console.log(bookshelves);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
  };
  const handleSetDropdownValue = (value) => {
    setDropdownValue(value);
    setDropdownState(!dropdownState);
  };

  async function addBook(ISBN) {
    try {
      var data = qs.stringify({
        BOOKSHELF_ID: props.history.location.state.BOOKSHELF_ID,
        ISBN: ISBN,
      });
      const getBookshelfContent = await httpCommonPost.post(
        "/book-bookshelf",
        data
      );
      toastFun("Added Successfully!", 1);
    } catch (error) {
      toastFun("Already in this Bookshelf", 2);
      console.log(error);
    }
  }

  async function search(e) {
    e.preventDefault();
    searchtext.CONSTRAINT = dropdownValue;
    if (searchtext.SEARCH_TEXT == null || searchtext.CONSTRAINT === "") {
      return;
    }
    searchtext.SEARCH_TEXT = "%" + searchtext.SEARCH_TEXT.toUpperCase() + "%";
    getAllBooks();
    // window. location. reload();
  }

  return (
    <div>
      <ToastContainer style={{ marginTop: "70px" }} />

      <div>
        <NavbarHomePage />
      </div>
      <div class="container-fluid content">
        <div class="row">
          <div class="col-md-10 create-container">
            <div class="col-md-4"></div>
            <div class="col-md-6 create-form">
            <Link to={"/bookshelves"} class="link-right" style={{ textDecoration: 'none' }}><h5 class="cross"><i class="fas fa-times-circle"></i></h5></Link>

              <h4>Add Books to Bookshelf</h4>

              <div className="search02-container">
                <div className={`dropdown02`}>
                  <button
                    onClick={handleDropdownClick}
                    className="dropdown02-btn"
                  >
                    {dropdownValue === "" ? "Search by" : dropdownValue}
                  </button>
                  <div
                    className={`dropdown02-items ${
                      dropdownState ? "isVisible02" : "isHidden02"
                    }`}
                  >
                    <div className="dropdown02-item">
                      <div
                        className="dropdown02__link"
                        onClick={() => handleSetDropdownValue("Title")}
                      >
                        Title
                      </div>
                    </div>
                    <div className="dropdown02-item">
                      <div
                        className="dropdown02__link"
                        onClick={() => handleSetDropdownValue("Author")}
                      >
                        Author
                      </div>
                    </div>
                    <div className="dropdown02-item">
                      <div
                        className="dropdown02__link"
                        onClick={() => handleSetDropdownValue("Genre")}
                      >
                        Genre
                      </div>
                    </div>
                    <div className="dropdown02-item">
                      <div
                        className="dropdown02__link"
                        onClick={() => handleSetDropdownValue("Publisher")}
                      >
                        Publisher
                      </div>
                    </div>
                  </div>
                </div>
                <form class="search-form" onSubmit={search} id="search-bar">
                  <input
                    class="form-control search-input"
                    type="text"
                    placeholder="Search Books to Add"
                    onChange={(e) =>
                      setSearchText({
                        ...searchtext,
                        SEARCH_TEXT: e.target.value,
                      })
                    }
                  />
                  <button class="btn btn-primary search-button" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <div className="table-container">
                <Table striped bordered hover className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => {
                      return (
                        <tr className="no-back">
                          <td class="col-1">
                            <ListGroupItem className="no-back">
                              {" "}
                              <img
                                src={`https://i.imgur.com/${book.COVER_IMAGE}.jpg`}
                                alt=""
                                width="100"
                                height="150"
                              />{" "}
                            </ListGroupItem>
                          </td>
                          <td class="col-2">
                            <ListGroup className="list-group-flush no-back">
                              <ListGroupItem className="no-back">
                                <h5 class="lister-item-header tab-text">
                                  {book.TITLE}
                                  <small class="tab-text">
                                    &nbsp;({book.ORIGINAL_PUBLICATION_YEAR})
                                  </small>
                                </h5>
                                <p class="text-small tab-text">
                                  {book.AUTHORS.map((author, i) => {
                                    if (i == 0) {
                                      return <>{author.AUTHOR_NAME}</>;
                                    } else {
                                      return <>{", " + author.AUTHOR_NAME}</>;
                                    }
                                  })}
                                </p>
                              </ListGroupItem>

                              <ListGroupItem className="no-back">
                                <span
                                  onClick={() => addBook(`${book.ISBN}`)}
                                  class="addbook"
                                >
                                  Add Book to Bookshelf
                                </span>
                              </ListGroupItem>
                            </ListGroup>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <div class="card rightPanel">
              <div class="card-body">
                <h5 class="menu">
                  <i class="fab fa-mendeley"></i>&nbsp;Menu
                </h5>
                <br></br>
                <Link
                  to={"/create-bookshelf"}
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Create Bookshelf</p>
                </Link>
                <Link
                  to={"/create-bookshelf-2"}
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <br></br>
                  <p class="card-text menu-option">Add to Bookshelf</p>
                </Link>
                <Link to={"/delete-bookshelf"} class="link-right" style={{ textDecoration: 'none' }}>
                    <br></br>
                  <p class="card-text menu-option">
                    Delete Bookshelf
                  </p></Link>
                  <Link to={"/edit-bookshelf"} class="link-right" style={{ textDecoration: 'none' }}>
                    <br></br>
                  <p class="card-text menu-option">
                    Edit Bookshelf
                  </p></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
