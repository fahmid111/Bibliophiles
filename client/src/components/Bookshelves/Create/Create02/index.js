import React, { useEffect, useState } from "react";
// import { Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import httpCommon from "../../../../HTTP/httpCommonParam";
import NavbarHomePage from "../../../Navbar/NavbarHomePage";
import toastFun from "../../../toast/toast";
import "./style.css";

export default function Create() {
  const [bookshelves, setBookshelf] = useState([]);
  const [val, setVal] = useState(null);

  useEffect(() => {
    getAllBookshelves();
  }, []);

  const getAllBookshelves = async () => {
    try {
      const getBookshelves = await httpCommon.get(`/bookshelves`);
      setBookshelf(getBookshelves.data);
      console.log(bookshelves);
    } catch (error) {
      console.log(error);
    }
  };

  const history = useHistory();

  async function selectBookshelf(e) {
    e.preventDefault();
    console.log(val);
    if (val === null) {
      toastFun("Select a Bookshelf!", 2);
      return;
    } else {
      console.log("here");
      history.push({
        pathname: "/create-bookshelf-3",
        state: { BOOKSHELF_ID: val },
      });
    }
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
              <Link
                to={"/bookshelves"}
                class="link-right"
                style={{ textDecoration: "none" }}
              >
                <h5 class="cross">
                  <i class="fas fa-times-circle"></i>
                </h5>
              </Link>
              <h4>Add Books to Bookshelf</h4>
              <form id="bookshelf" onSubmit={selectBookshelf}>
                <div class="form-group">
                  {/* <h6 style={{color: "#fff"}}>Select a Bookshelf</h6> */}
                  <select
                    class="form-control"
                    placeholder="Select a Bookshelf"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select Your Bookshelf
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
                  <input type="submit" class="btnSubmit" value="select" />
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
                <Link
                  to={"/delete-bookshelf"}
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <br></br>
                  <p class="card-text menu-option">Delete Bookshelf</p>
                </Link>
                <Link
                  to={"/edit-bookshelf"}
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <br></br>
                  <p class="card-text menu-option">Edit Bookshelf</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
