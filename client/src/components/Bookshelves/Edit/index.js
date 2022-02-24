import qs from "qs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import httpCommonParam from "../../../HTTP/httpCommonParam";
import httpCommonURL from "../../../HTTP/httpCommonURL";
import NavbarHomePage from "../../Navbar/NavbarHomePage";
import "./style.css";

const toastFun = (message, type) => {
  if (type === 1) {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === 2) {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
export default function Edit() {
  const [bookshelves, setBookshelf] = useState([]);
  const [val, setVal] = useState(null);
  const [bookshelfUpdate, setBookshelfUpdate] = useState({});


  useEffect(() => {
    getAllBookshelves();
  }, []);

  const getAllBookshelves = async () => {
    try {
      const getBookshelves = await httpCommonParam.get(`/bookshelves`);
      setBookshelf(getBookshelves.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookshelfToUpdate = async (e) => {
    e.preventDefault();
    try {
      let getBookshelf = await httpCommonParam.get(`/bookshelves?BOOKSHELF_ID=${val}`);
      getBookshelf = getBookshelf.data[0];
      setBookshelfUpdate(getBookshelf);
      toastFun("Successfully Got Your Bookshelf", 2);
    } catch (error) {
      toastFun("Cannot Get Your Bookshelf", 2);
      console.log(error);
    }
  };

  async function renameBookshelf(e) {
    e.preventDefault();
    if (!bookshelfUpdate.BOOKSHELF_ID) {
      toastFun("Select Bookshelf First!", 2);
      return;
    } else if (!bookshelfUpdate.BOOKSHELF_NAME) {
      toastFun("Type Some Text on Field!", 2);
      return;
    } else if (bookshelfUpdate.BOOKSHELF_NAME.trim() === "") {
      toastFun("Name Not Valid!", 2);
      return;
    } else{
      try {
        var data = qs.stringify(bookshelfUpdate);
        console.log(data);
        const getBookshelf = await httpCommonURL.put("/rename-bookshelf", data);
        window.location.reload();
        toastFun("Successfully Renamed!", 1);

      } catch (error) {
        toastFun("Failed to Rename!", 2);
        console.log(error);
      }
    }
  }

  return (
    <div>
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
              <h4>Rename Bookshelf</h4>

              <form id="rename-bookshelf" onSubmit={renameBookshelf}>
                <div class="form-group">
                  <select
                    class="form-control"
                    placeholder="Select Bookshelf"
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
                <p></p>
                <div>
                  <button class="btnSubmit" onClick={getBookshelfToUpdate}>
                    {" "}
                    Get Bookshelf{" "}
                  </button>
                </div>
                <p></p>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Bookshelf Name *"
                    type="text"
                    value={
                      bookshelfUpdate != null
                        ? bookshelfUpdate.BOOKSHELF_NAME
                        : ""
                    }
                    name="bookshelf-name"
                    onChange={(e) => setBookshelfUpdate({...bookshelfUpdate, BOOKSHELF_NAME: e.target.value})}
                  ></input>
                </div>
                <div class="form-group">
                  <input type="submit" class="btnSubmit" value="Rename" />
                  <Link
                    style={{
                      textDecoration: "none",
                      float: "right",
                      fontSize: "25px",
                    }}
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    <i class="fas fa-redo refresh"></i>
                  </Link>
                  <ToastContainer style={{ marginTop: "70px" }} />
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
