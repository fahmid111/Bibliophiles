import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import toastFun from "../toast/toast";
import "./SearchBar.css";

export default function SearchBar() {
  const [dropdownState, setDropdownState] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [searchtext, setSearchText] = useState({ SEARCH_TEXT: "" });

  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
  };
  const handleSetDropdownValue = (value) => {
    setDropdownValue(value);
    setDropdownState(!dropdownState);
  };

  const history = useHistory();

  async function search(e) {
    e.preventDefault();
    searchtext.CONSTRAINT = dropdownValue;
    searchtext.SEARCH_TEXT = searchtext.SEARCH_TEXT.trim();
    if (searchtext.SEARCH_TEXT == "" || searchtext.CONSTRAINT === "") {
      toastFun("Select Search by and Fill Search Field", 2);
      return;
    }
    searchtext.SEARCH_TEXT = "%" + searchtext.SEARCH_TEXT.toUpperCase() + "%";
    history.push({ pathname: "/showbook", state: { searchText: searchtext } });
    window.location.reload();
  }

  return (
    <div className="search-container">
      <ToastContainer style={{ marginTop: "70px" }} />
      <div className={`dropdown`}>
        <button onClick={handleDropdownClick} className="dropdown-btn">
          {dropdownValue === "" ? "Search by" : dropdownValue}
        </button>
        <div
          className={`dropdown-items ${
            dropdownState ? "isVisible" : "isHidden"
          }`}
        >
          <div className="dropdown-item">
            <div
              className="dropdown__link"
              onClick={() => handleSetDropdownValue("Title")}
            >
              Title
            </div>
          </div>
          <div className="dropdown-item">
            <div
              className="dropdown__link"
              onClick={() => handleSetDropdownValue("Author")}
            >
              Author
            </div>
          </div>
          <div className="dropdown-item">
            <div
              className="dropdown__link"
              onClick={() => handleSetDropdownValue("Genre")}
            >
              Genre
            </div>
          </div>
          <div className="dropdown-item">
            <div
              className="dropdown__link"
              onClick={() => handleSetDropdownValue("Publisher")}
            >
              Publisher
            </div>
          </div>
        </div>
      </div>
      <form class="form-inline" onSubmit={search} id="search-bar">
        <input
          class="form-control mr-sm-2"
          type="text"
          onChange={(e) =>
            setSearchText({ ...searchtext, SEARCH_TEXT: e.target.value })
          }
        />
        <button class="btn btn-primary my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
