import qs from "qs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import httpCommon from "../../../HTTP/httpCommonURL";
import NavbarHomePage from "../../Navbar/NavbarHomePage";
import toastFun from "../../toast/toast";
import "./style.css";

export default function Create() {
  const [name, setName] = useState([]);

  async function nameBookshelf(e) {
    e.preventDefault();
    if (!name.NAME) {
      toastFun("Fill the Name Field!", 2);
      return;
    }else if(name.NAME.trim()===""){
      toastFun("Some Characters are Expected!", 2);
      return;
    }
    try {
      var data = qs.stringify(name);
      const getBookshelf = await httpCommon.post("/create-bookshelf", data);
      window.location.replace("/create-bookshelf-2");
    } catch (error) {
      console.log(error);
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
              <h4>Create Bookshelf</h4>
              <form id="bookshelf" onSubmit={nameBookshelf}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Bookshelf Name *"
                    name="bookshelf-name"
                    onChange={(e) => setName({ ...name, NAME: e.target.value })}
                  />
                </div>
                <div class="form-group">
                  <input type="submit" class="btnSubmit" value="Create" />
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
