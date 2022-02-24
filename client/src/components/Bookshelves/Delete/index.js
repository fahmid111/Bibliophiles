import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Banner from "../../../assets/images/delete-bookshelves.jpg";
import httpCommon from "../../../HTTP/httpCommonParam";
import NavbarHomePage from "../../Navbar/NavbarHomePage";
import toastFun from "../../toast/toast";
import Slides from "./DeleteSlides";
import "./style.css";

export default function DeleteBookshelf() {
  const [bookshelves, setBookshelf] = useState([]);
  const [books, setBooks] = useState([]);
  const [val, setVal] = useState(null);

  useEffect(() => {
    getAllBookshelves();
  }, []);

  const getAllBookshelves = async () => {
    try {
      const getBookshelves = await httpCommon.get(`/bookshelves`);
      setBookshelf(getBookshelves.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBooks = async (e) => {
    e.preventDefault();
    try {
      if (val === null) {
        toastFun("Select Bookshelf First!", 2);
        return;
      } else {
        const getBooks = await httpCommon.get(
          `/book-bookshelf?BOOKSHELF_ID=${val}`
        );
        setBooks(getBooks.data);
      }
    } catch (error) {
      toastFun("No Books in This Bookshelf", 2);
      setBooks([]);
      console.log(error);
    }
  };

  const delAllBooks = async (e) => {
    e.preventDefault();

    try {
      if (val === null) {
        toastFun("Select Bookshelf First!", 2);
        return;
      } else {
        const deletedBookshelf = await httpCommon.delete(
          `/del-all-books-bookshelf?BOOKSHELF_ID=${val}`
        );
        window.location.reload();
      }
    } catch (error) {
      toastFun("Error Deleting Books", 2);
      console.log(error);
    }
  };

  const delBookshelf = async (e) => {
    e.preventDefault();

    try {
      if (val === null) {
        toastFun("Select Bookshelf First!", 2);
        return;
      } else {
        const deletedBookshelf = await httpCommon.delete(
          `/del-bookshelf?BOOKSHELF_ID=${val}`
        );
        window.location.reload();
      }
    } catch (error) {
      toastFun("Error Deleting Bookshelf", 2);
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <NavbarHomePage />
      </div>
      <div class="container-fluid content-d">
        <div class="row">
          <div class="col-md-10 banner-d create-container-d">
            <img src={Banner} width="600px"></img>
            <br></br>
            <br></br>
            <form id="bookshelf">
              <div class="form-group">
                <select
                  class="form-control"
                  placeholder="Select Bookshelf to Delete"
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select Bookshelf to Delete
                  </option>
                  {bookshelves.map((bookshelf) => {
                    return (
                      <option value={bookshelf.BOOKSHELF_ID}>
                        {bookshelf.BOOKSHELF_NAME}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  onClick={getBooks}
                  class="btnSubmit-d"
                  value="select"
                  style={{ marginRight: "50px" }}
                />

                <input
                  type="submit"
                  onClick={delAllBooks}
                  class="btnSubmit-d"
                  value="Delete All Books"
                  style={{ marginRight: "50px" }}
                />

                <input
                  type="submit"
                  onClick={delBookshelf}
                  class="btnSubmit-d"
                  value="Delete Bookshelf"
                />

                <ToastContainer style={{ marginTop: "70px" }} />
              </div>
            </form>
            <div>
              <Slides book={books} b_id={val}></Slides>
            </div>
          </div>
          <div class="col-md-2">
            <div class="card rightPanel-d">
              <div class="card-body">
                <h5 class="menu-d">
                  <i class="fab fa-mendeley"></i>&nbsp;Menu
                </h5>
                <br></br>
                <Link
                  to={"/create-bookshelf"}
                  class="link-right-d"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option-d">Create Bookshelf</p>
                </Link>
                <Link
                  to={"/create-bookshelf-2"}
                  class="link-right-d"
                  style={{ textDecoration: "none" }}
                >
                  <br></br>
                  <p class="card-text menu-option-d">Add to Bookshelf</p>
                </Link>
                <Link
                  to={"/delete-bookshelf"}
                  class="link-right-d"
                  style={{ textDecoration: "none" }}
                >
                  <br></br>
                  <p class="card-text menu-option-d">Delete Bookshelf</p>
                </Link>
                <Link
                  to={"/edit-bookshelf"}
                  class="link-right-d"
                  style={{ textDecoration: "none" }}
                >
                  <br></br>
                  <p class="card-text menu-option-d">Edit Bookshelf</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
