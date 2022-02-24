import qs from "qs";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import httpCommonParam from "../../../HTTP/httpCommonParam.js";
import httpCommonURL from "../../../HTTP/httpCommonURL";
import NavbarAdmin from "../../Navbar/NavbarAdmin";
import toastFun from "../../toast/toast";
import "./style.css";

export default function ManageAuthorPage(props) {
  const [authors, setAuthor] = useState([]);
  const [authorAdd, setAuthorAdd] = useState({});
  const [authorUpdate, setAuthorUpdate] = useState({});
  const [valAuthorID, setValAuthorID] = useState(null);
  const [valAuthorIDDel, setValAuthorIDDel] = useState(null);

  const [authorBooks, setAuthorBooks] = useState([]);

  const [authorBooksDel, setAuthorBooksDel] = useState([]);

  useEffect(() => {
    getAllAuthors();
  }, []);

  const getAllAuthors = async () => {
    try {
      const getAuthors = await httpCommonParam.get(`/all-authors`);
      setAuthor(getAuthors.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addAuthor = async (e) => {
    e.preventDefault();
    if (authorAdd === {}) {
      toastFun("Fill the Necessary Fields", 2);
      return;
    } else if (!authorAdd.FIRST_NAME || !authorAdd.LAST_NAME) {
      toastFun("Fill First Name and Last Name!", 2);
      return;
    } else if(!authorAdd.EMAIL) {
      toastFun("Fill email!", 2);
      return;
    }
    
    else {
      try {
        var data = qs.stringify(authorAdd);
        const author = await httpCommonURL.post("/addAuthor", data);
        setAuthorAdd(authorAdd);
        toastFun("Added Successfully!", 1);
      } catch (error) {
        toastFun("Failed to Add Author", 2);
        console.log(error);
      }
    }
  };

  const getAuthorToUpdate = async (e) => {
    e.preventDefault();
    try {
      let getAuthor = await httpCommonParam.get(
        `/getAuthor?PERSON_ID=${valAuthorID}`
      );
      getAuthor = getAuthor.data[0];
      setAuthorUpdate(getAuthor);

      getAuthorBooks(e);
    } catch (error) {
      toastFun("Failed to Get Author", 2);
      console.log(error);
    }
  };

  const getAuthorBooks = async (e) => {
    e.preventDefault();

    try {
      let getAuthorBooks = await httpCommonParam.get(
        `/getAuthorBooks?PERSON_ID=${valAuthorID}`
      );
      setAuthorBooks(getAuthorBooks.data);
    } catch (error) {
      // if (getAuthorBooks.length === 0)
      //   toastFun("This author has no books", 2);
      // else {
      //   toastFun("Failed to get books!", 2);
      
      // }
      setAuthorBooks([]);
      console.log(error);
    }
  };

  const updateAuthor = async (e) => {
    e.preventDefault();
    if (!authorUpdate.PERSON_ID) {
      toastFun("Select Author First!", 2);
    } else if (!authorUpdate.FIRST_NAME || !authorUpdate.LAST_NAME) {
      toastFun("Fill First Name and Last Name!", 2);
      return;
    } else if(!authorUpdate.EMAIL) {
      toastFun("Fill email!", 2);
      return; 
    }
    else {
      try {
        var data = qs.stringify(authorUpdate);
        const author = await httpCommonURL.put("/updateAuthor", data);
        setAuthorUpdate(author);
        toastFun("Updated Successfully!", 1);
      } catch (err) {
        toastFun("Failed to Update Author", 2);
        console.log(err);
      }
    }
  };

  const getAuthorBooksDel = async (e) => {
    e.preventDefault();

    try {
      if (valAuthorIDDel === null) {
        toastFun("No Author Selected!", 2);
        return;
      } else {
        toastFun("Author Selected!", 1);
        let getAuthorBooksDel = await httpCommonParam.get(
          `/getAuthorBooks?PERSON_ID=${valAuthorIDDel}`
        );
        setAuthorBooksDel(getAuthorBooksDel.data);
        
      }
    } catch (error) {
      if (getAuthorBooksDel.length === 0)
      //   toastFun("This author has no books", 2);
      // else toastFun("Failed to get books!", 2);
      setAuthorBooksDel([]);
      console.log(error);
    }
  };


  const deleteAuthor = async (e) => {
    e.preventDefault();

    try {
      if (valAuthorIDDel === null) {
        toastFun("No Author Selected!", 2);
        return;
      } else {
        const deletedAuthor = await httpCommonParam.delete(
          `/deleteAuthor?PERSON_ID=${valAuthorIDDel}`
        );
        toastFun("Deleted Successfully!", 1);
        setValAuthorIDDel(null);
      }
    } catch (error) {
      toastFun("This author has books. Cannot delete.", 2);
      console.log(error);
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
            <div class="col-md-6 create-form" id="add-author">
              <h4>Add Author</h4>
              <form id="add-author-form" onSubmit={addAuthor}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name *"
                    name="author-first-name"
                    onChange={(e) =>
                      setAuthorAdd({ ...authorAdd, FIRST_NAME: e.target.value })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name *"
                    name="author-last-name"
                    onChange={(e) =>
                      setAuthorAdd({ ...authorAdd, LAST_NAME: e.target.value })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Address"
                    name="author-address"
                    onChange={(e) =>
                      setAuthorAdd({ ...authorAdd, ADDRESS: e.target.value })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email *"
                    name="authro-email"
                    onChange={(e) =>
                      setAuthorAdd({ ...authorAdd, EMAIL: e.target.value.toLowerCase() })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Phone number"
                    name="author-phone-number"
                    onChange={(e) =>
                      setAuthorAdd({
                        ...authorAdd,
                        PHONE_NUMBER: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Details"
                    name="author-details"
                    onChange={(e) =>
                      setAuthorAdd({ ...authorAdd, DETAILS: e.target.value })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Web-Address"
                    name="author-web-address"
                    onChange={(e) =>
                      setAuthorAdd({
                        ...authorAdd,
                        WEB_ADDRESS: e.target.value,
                      })
                    }
                  />
                </div>

                <div class="form-group">
                  <input type="submit" class="btnSubmit" value="Add" />
                </div>
              </form>
            </div>

            <p></p>
            <p></p>

            {/* update author */}
            <div class="col-md-6 create-form" id="update-author">
              <h4> Update Author</h4>
              <form id="update-author" onSubmit={updateAuthor}>
                <div class="form-group">
                  <select
                    class="form-control"
                    placeholder="Select Author"
                    value={valAuthorID}
                    onChange={(e) => setValAuthorID(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select Author
                    </option>
                    {authors.map((author) => {
                      return (
                        <option value={author.PERSON_ID}>
                          {author.AUTHOR_NAME_EMAIL}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p></p>
                <div>
                  <button class="btnSubmit" onClick={getAuthorToUpdate}>
                    {" "}
                    Get Author{" "}
                  </button>
                </div>
                <p></p>
                <p></p>
                <div class="form-group">
                  <select
                    class="form-control"
                    placeholder="Books of this author"
                    value={valAuthorID}
                    /* onChange={(e) => setValAuthorID(e.target.value)} */
                  >
                    <option value="" disabled selected>
                      {"There are " + authorBooks.length + " Books of this Author"}
                    </option>
                    {authorBooks.map((authorBook) => {
                      return (
                        <option disabled>
                          {authorBook.TITLE}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p></p>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                    name="author-first-name"
                    value={authorUpdate != null ? authorUpdate.FIRST_NAME : ""}
                    onChange={(e) =>
                      setAuthorUpdate({
                        ...authorUpdate,
                        FIRST_NAME: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    name="author-last-name"
                    value={authorUpdate != null ? authorUpdate.LAST_NAME : ""}
                    onChange={(e) =>
                      setAuthorUpdate({
                        ...authorUpdate,
                        LAST_NAME: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Address"
                    name="author-address"
                    value={authorUpdate != null ? authorUpdate.ADDRESS : ""}
                    onChange={(e) =>
                      setAuthorUpdate({
                        ...authorUpdate,
                        ADDRESS: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    name="authro-email"
                    value={authorUpdate != null ? authorUpdate.EMAIL : ""}
                    onChange={(e) =>
                      setAuthorUpdate({
                        ...authorUpdate,
                        EMAIL: e.target.value.toLowerCase(),
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Phone number"
                    name="author-phone-number"
                    value={
                      authorUpdate != null ? authorUpdate.PHONE_NUMBER : ""
                    }
                    onChange={(e) =>
                      setAuthorUpdate({
                        ...authorUpdate,
                        PHONE_NUMBER: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Details"
                    name="author-details"
                    value={authorUpdate != null ? authorUpdate.DETAILS : ""}
                    onChange={(e) =>
                      setAuthorUpdate({
                        ...authorUpdate,
                        DETAILS: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Web-Address"
                    name="author-web-address"
                    value={authorUpdate != null ? authorUpdate.WEB_ADDRESS : ""}
                    onChange={(e) =>
                      setAuthorUpdate({
                        ...authorUpdate,
                        WEB_ADDRESS: e.target.value,
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

            <div class="col-md-6 create-form" id="delete-author">
              <h4> Delete Author</h4>
              <form id="delete-author-form" onSubmit={deleteAuthor}>
                <div class="form-group">
                  <select
                    class="form-control"
                    placeholder="Select Author"
                    value={valAuthorIDDel}
                    onChange={(e) => setValAuthorIDDel(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select Author
                    </option>
                    {authors.map((author) => {
                      return (
                        <option value={author.PERSON_ID}>
                          {author.AUTHOR_NAME_EMAIL}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p></p>
                <p></p>
                <div>
                  <button class="btnSubmit" onClick={getAuthorBooksDel}>
                    {" "}
                    Get Author{" "}
                  </button>
                </div>
                <p></p>
                <p></p>
                <div class="form-group">
                  <select
                    class="form-control"
                    placeholder="Books of this author"
                    value={valAuthorIDDel}
                    /* onChange={(e) => setValAuthorID(e.target.value)} */
                  >
                    <option value="" disabled selected>
                      {"There are " + authorBooksDel.length + " Books of this Author"}
                    </option>
                    {authorBooksDel.map((authorBookDel) => {
                      return (
                        <option disabled>
                          {authorBookDel.TITLE}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p></p>
                <p></p>
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
                  href="#add-author"
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Add Author</p>
                </a>
                <br></br>
                <a
                  href="#update-author"
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Update Author</p>
                </a>
                <br></br>
                <a
                  href="#delete-author"
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Delete Author</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}