import qs from "qs";
import React, { useEffect, useState } from "react";
import { Col, ListGroup, ListGroupItem, Row, Table } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import httpCommonParam from "../../HTTP/httpCommonParam";
import httpCommonURL from "../../HTTP/httpCommonURL";
import NavbarHomePage from "../Navbar/NavbarHomePage";
import toastFun from "../toast/toast";
import "./AllBooks.css";


const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function isPositiveInteger(str) {
  const num = Number(str);

  if (Number.isInteger(num) && num > 0) {
    return true;
  }

  return false;
}

function AllBooks(props) {
  const [books, setAllBooks] = useState([]);
  const [genres, setAllGenres] = useState([]);
  const [genreVal, setGenreVal] = useState("");
  const [awards, setAllAwards] = useState([]);
  const [awardVal, setAwardVal] = useState("");
  const [languages, setAllLanguages] = useState([]);
  const [langVal, setLangVal] = useState("");
  const [binds, setAllBinds] = useState([]);
  const [bindVal, setBindVal] = useState("");
  const [titleVal, setTitle] = useState("");
  const [sortVal, setSortBy] = useState("");
  const [sortTypeVal, setSortType] = useState("");
  const [authorVal, setAuthor] = useState("");
  const [publisherVal, setPublisher] = useState("");
  const [yearStartVal, setYearStart] = useState("");
  const [yearEndVal, setYearEnd] = useState("");
  const [rateStartVal, setRateStart] = useState("");
  const [rateEndVal, setRateEnd] = useState("");
  const [pagesStartVal, setPagesStart] = useState("");
  const [pagesEndVal, setPagesEnd] = useState("");

  useEffect(() => {
    getAllBooks();
    getAllGenre();
    getAllAwards();
    getAllLangs();
    getAllBinds();
  }, []);

  const getAllBooks = async () => {
    console.log(props.history);
    if (props.history.location.state.searchText != null) {
      try {
        var data = qs.stringify({
          SEARCH_TEXT: props.history.location.state.searchText.SEARCH_TEXT,
          CONSTRAINT: props.history.location.state.searchText.CONSTRAINT,
        });

        const getBook = await httpCommonURL.post("/search-book", data);
        setAllBooks(getBook.data);
      } catch (error) {
        console.log(error);
      }
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

  const getAllAwards = async () => {
    try {
      const getAwards = await httpCommonParam.get("/get-all-awards");
      setAllAwards(getAwards.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllLangs = async () => {
    try {
      const getlangs = await httpCommonParam.get("/get-all-languages");
      setAllLanguages(getlangs.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBinds = async () => {
    try {
      const getBinds = await httpCommonParam.get("/get-all-binds");
      setAllBinds(getBinds.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const advanceSearch = async () => {
    var searchCheck = false;
    var advanceObject = {};
    
    if(titleVal.trim()!=""){
      advanceObject.TITLE = '%' + titleVal.trim().toUpperCase() + '%';
      searchCheck = true;
    }
    
    if(genreVal!=""){
      advanceObject.GENRE_ID = genreVal;
      searchCheck = true;
    }

    if(awardVal!=""){
      advanceObject.AWARD = awardVal;
      searchCheck = true;
    }

    if(authorVal.trim()!=""){
      advanceObject.AUTHOR = '%' + authorVal.trim().toUpperCase() + '%';
      searchCheck = true;
    }
    
    if(publisherVal.trim()!=""){
      advanceObject.PUBLISHER = '%' + publisherVal.trim().toUpperCase() + '%';
      searchCheck = true;
    }
    
    if((yearStartVal.trim()==="" && yearEndVal.trim()!="")||(yearStartVal.trim()!="" && yearEndVal.trim()==="")){
      toastFun("Both Fields of Original Publication Year Must be Filled", 2);
      searchCheck = false;
      return;
    }else if(yearStartVal.trim()!="" && yearEndVal.trim()!=""){
      if(isPositiveInteger(yearStartVal.trim()) && isPositiveInteger(yearEndVal.trim())){
        if(Number(yearEndVal.trim())<Number(yearStartVal.trim())){
          toastFun("End Year Should be Larger Than Start Year", 2);
          searchCheck = false;
          return;
        }else{
          advanceObject.YEAR_START = yearStartVal.trim();
          advanceObject.YEAR_END = yearEndVal.trim();
          searchCheck = true;
        }
      }else{
        toastFun("Original Publication Year Must be Positive Integer", 2);
        searchCheck = false;
        return;
      }
    }

    if((rateStartVal==="" && rateEndVal!="")||(rateStartVal!="" && rateEndVal==="")){
      toastFun("Both Fields of Rating Must be Selected", 2);
      searchCheck = false;
      return;
    }else if(rateStartVal!="" && rateEndVal!=""){
        if(Number(rateEndVal)<Number(rateStartVal)){
          toastFun("Average Rating Range is not Correct", 2);
          searchCheck = false;
          return;
        }else{
          advanceObject.RATING_START = rateStartVal;
          advanceObject.RATING_END = rateEndVal;
          searchCheck = true;
        }
    }

    if((pagesStartVal.trim()==="" && pagesEndVal.trim()!="")||(pagesStartVal.trim()!="" && pagesEndVal.trim()==="")){
      toastFun("Both Fields of Number of Pages Must be Filled", 2);
      searchCheck = false;
      return;
    }else if(pagesStartVal.trim()!="" && pagesEndVal.trim()!=""){
      if(isPositiveInteger(pagesStartVal.trim()) && isPositiveInteger(pagesEndVal.trim())){
        if(Number(pagesEndVal.trim())<Number(pagesStartVal.trim())){
          toastFun("Page Range is not Correct", 2);
          searchCheck = false;
          return;
        }else{
          advanceObject.PAGE_START = pagesStartVal.trim();
          advanceObject.PAGE_END = pagesEndVal.trim();
          searchCheck = true;
        }
      }else{
        toastFun("Number of Pages Must be Positive Integer", 2);
        searchCheck = false;
        return;
      }
    }

    if(langVal!=""){
      advanceObject.LANGUAGE = langVal;
      searchCheck = true;
    }

    if(bindVal!=""){
      advanceObject.BINDING = bindVal;
      searchCheck = true;
    }

    if(sortVal!=""){
      advanceObject.SORT = sortVal;
    }

    if(sortTypeVal!=""){
      advanceObject.SORT_TYPE = sortTypeVal;
    }

    if(searchCheck){
      props.history.replace({ state: {} });
      try {
        var data = qs.stringify(advanceObject);
        const getAdvanceBooks = await httpCommonURL.post("/advance-search", data);
        setAllBooks(getAdvanceBooks.data);
        console.log(getAdvanceBooks.data);
        toastFun("Search Success!", 1);
      } catch (error) {
        toastFun('No Data Found!', 2);
        console.log(error.message);
        setAllBooks([]);
      }
    }else{
      toastFun('Fill At Least One Field!', 2);
    }

    
  };

  return (
    <div>
      <div>
        <NavbarHomePage />
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8" style={{ marginTop: "75px" }}>
            <Table striped bordered hover className="table">
              <thead>
                <tr>
                  <th>{"Search result: " + books.length + " books"}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => {
                  return (
                    <tr>
                      <td class="col-3">
                        <ListGroupItem>
                          {" "}
                          <img
                            src={`https://i.imgur.com/${book.COVER_IMAGE}.jpg`}
                            alt=""
                            width="180"
                            height="250"
                          />{" "}
                        </ListGroupItem>
                      </td>
                      <td class="col-2">
                        <ListGroup className="list-group-flush">
                          <ListGroupItem>
                            <h5 class="lister-item-header">
                              {book.TITLE}
                              <small class="text-muted unbold">
                                &nbsp;({book.ORIGINAL_PUBLICATION_YEAR})
                              </small>
                              <span
                                class="text-muted"
                                style={{ float: "right" }}
                              >
                                <b style={{ fontSize: "12px" }}>
                                  Average Rating: &nbsp;{" "}
                                </b>
                                <FaStar
                                  size={25}
                                  color={colors.orange}
                                  style={{
                                    marginRight: 5,
                                    marginBottom: 5,
                                  }}
                                />
                                <small>
                                  <b>
                                    {book.AVG_RATING.toFixed(2)}
                                    <span style={{ fontSize: "13px" }}>/5</span>
                                  </b>
                                </small>
                              </span>
                            </h5>
                            <p class="text-muted text-small">
                              {book.AUTHORS.map((author, i) => {
                                if (i == 0) {
                                  return <>{author.AUTHOR_NAME}</>;
                                } else {
                                  return <>{", " + author.AUTHOR_NAME}</>;
                                }
                              })}
                            </p>
                            <p class="desc">{book.DESCRIPTION}</p>
                            <p class="text-muted text-small smol">
                              Genre:{" "}
                              {book.GENRES.map((genre, i) => {
                                if (i == 0) {
                                  return <>{genre.GENRE_NAME}</>;
                                } else {
                                  return <>{", " + genre.GENRE_NAME}</>;
                                }
                              })}
                              <br></br>
                              Publisher: {book.NAME} <br></br>
                              Language: {book.LANGUAGE} <br></br>Number of
                              Pages: {book.NUMBER_OF_PAGES}
                            </p>
                          </ListGroupItem>

                          <ListGroupItem>
                            {" "}
                            <Link to={`/book/${book.ISBN}`}>
                              {" "}
                              View Book{" "}
                            </Link>{" "}
                          </ListGroupItem>
                        </ListGroup>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div class="col-md-4">
            <div class="card rightPanel">
              <div class="card-body">
                <h5 class="d-inline">
                  <i class="fab fa-mendeley"></i>&nbsp;Advance Search
                </h5>
                <select
                  name="sort-by"
                  style={{ marginLeft: "38px", width: "145px", padding: "1px" }}
                  placeholder="Sort by"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="" selected>
                    Sort by
                  </option>
                  <option value="title">Title</option>
                  <option value="avg">Average Rating</option>
                  <option value="year">Publication Year</option>
                  <option value="pages">Number of Pages</option>
                </select>
                <select
                  name="sort-type"
                  style={{ marginLeft: "10px", width: "80px", padding: "2px" }}
                  placeholder="Order"
                  onChange={(e) => setSortType(e.target.value)}
                >
                  <option value=""  selected>
                    Order
                  </option>
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
                <hr></hr>

                <div class="clause">
                  <div>
                    <h6>Title</h6>
                  </div>
                  <div>
                    <input
                      name="title"
                      size="55"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div class="clause" style={{ marginTop: "10px" }}>
                  <Row>
                    <Col md="2">
                      <div style={{ marginTop: "10px" }}>
                        <h6>Genre</h6>
                      </div>
                      <select
                        style={{ width: "195px", padding: "2px" }}
                        placeholder="Select Genre"
                        value={genreVal}
                        onChange={(e) => setGenreVal(e.target.value)}
                      >
                        <option value=""  selected>
                          Select Genre
                        </option>
                        {genres.map((genre) => {
                          return (
                            <option value={genre.GENRE_ID}>
                              {genre.GENRE_NAME}
                            </option>
                          );
                        })}
                      </select>
                    </Col>
                    <Col md="2">
                      <div style={{ marginTop: "10px" }}>
                        <h6>Award</h6>
                      </div>
                      <select
                        style={{ width: "195px", padding: "2px" }}
                        placeholder="Select Award"
                        value={awardVal}
                        onChange={(e) => setAwardVal(e.target.value)}
                      >
                        <option value=""  selected>
                          Select Award
                        </option>
                        {awards.map((award) => {
                          return (
                            <option value={award.AWARDS}>{award.AWARDS}</option>
                          );
                        })}
                      </select>
                    </Col>
                  </Row>
                </div>
                <div class="clause" style={{ marginTop: "15px" }}>
                  <Row>
                    <Col md="2">
                      <div>
                        <h6>Author</h6>
                      </div>
                      <div>
                        <input
                          name="author"
                          size="21"
                          onChange={(e) => setAuthor(e.target.value)}
                        />
                      </div>
                    </Col>
                    <Col md="2">
                      <div>
                        <h6>Publisher</h6>
                      </div>
                      <div>
                        <input
                          name="publisher"
                          size="21"
                          onChange={(e) => setPublisher(e.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>

                <div class="clause" style={{ marginTop: "15px" }}>
                  <div>
                    <h6>Original Publication Year</h6>
                  </div>
                  <div class="d-inline">
                    <input
                      name="year-start"
                      size="21"
                      onChange={(e) => setYearStart(e.target.value)}
                    />
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;to &nbsp;&nbsp;&nbsp;&nbsp;
                  <div class="d-inline">
                    <input
                      name="year-end"
                      size="21"
                      onChange={(e) => setYearEnd(e.target.value)}
                    />
                  </div>
                </div>
                <div class="clause" style={{ marginTop: "15px" }}>
                  <div>
                    <h6>Average Rating</h6>
                  </div>
                  <select
                    name="rating-start"
                    style={{ width: "195px", padding: "2px" }}
                    placeholder="Select Rating"
                    onChange={(e) => setRateStart(e.target.value)}
                  >
                    <option value=""  selected>
                      Select Rating
                    </option>
                    <option value="1.0">1.0</option>
                    <option value="1.1">1.1</option>
                    <option value="1.2">1.2</option>
                    <option value="1.3">1.3</option>
                    <option value="1.4">1.4</option>
                    <option value="1.5">1.5</option>
                    <option value="1.6">1.6</option>
                    <option value="1.7">1.7</option>
                    <option value="1.8">1.8</option>
                    <option value="1.9">1.9</option>
                    <option value="2.0">2.0</option>
                    <option value="2.1">2.1</option>
                    <option value="2.2">2.2</option>
                    <option value="2.3">2.3</option>
                    <option value="2.4">2.4</option>
                    <option value="2.5">2.5</option>
                    <option value="2.6">2.6</option>
                    <option value="2.7">2.7</option>
                    <option value="2.8">2.8</option>
                    <option value="2.9">2.9</option>
                    <option value="3.0">3.0</option>
                    <option value="3.1">3.1</option>
                    <option value="3.2">3.2</option>
                    <option value="3.3">3.3</option>
                    <option value="3.4">3.4</option>
                    <option value="3.5">3.5</option>
                    <option value="3.6">3.6</option>
                    <option value="3.7">3.7</option>
                    <option value="3.8">3.8</option>
                    <option value="3.9">3.9</option>
                    <option value="4.0">4.0</option>
                    <option value="4.1">4.1</option>
                    <option value="4.2">4.2</option>
                    <option value="4.3">4.3</option>
                    <option value="4.4">4.4</option>
                    <option value="4.5">4.5</option>
                    <option value="4.6">4.6</option>
                    <option value="4.7">4.7</option>
                    <option value="4.8">4.8</option>
                    <option value="4.9">4.9</option>
                    <option value="5.0">5.0</option>
                  </select>
                  &nbsp;&nbsp;&nbsp;&nbsp;to &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    name="rating-end"
                    style={{ width: "195px", padding: "2px" }}
                    placeholder="Select Rating"
                    onChange={(e) => setRateEnd(e.target.value)}
                  >
                    <option value=""  selected>
                      Select Rating
                    </option>
                    <option value="1.0">1.0</option>
                    <option value="1.1">1.1</option>
                    <option value="1.2">1.2</option>
                    <option value="1.3">1.3</option>
                    <option value="1.4">1.4</option>
                    <option value="1.5">1.5</option>
                    <option value="1.6">1.6</option>
                    <option value="1.7">1.7</option>
                    <option value="1.8">1.8</option>
                    <option value="1.9">1.9</option>
                    <option value="2.0">2.0</option>
                    <option value="2.1">2.1</option>
                    <option value="2.2">2.2</option>
                    <option value="2.3">2.3</option>
                    <option value="2.4">2.4</option>
                    <option value="2.5">2.5</option>
                    <option value="2.6">2.6</option>
                    <option value="2.7">2.7</option>
                    <option value="2.8">2.8</option>
                    <option value="2.9">2.9</option>
                    <option value="3.0">3.0</option>
                    <option value="3.1">3.1</option>
                    <option value="3.2">3.2</option>
                    <option value="3.3">3.3</option>
                    <option value="3.4">3.4</option>
                    <option value="3.5">3.5</option>
                    <option value="3.6">3.6</option>
                    <option value="3.7">3.7</option>
                    <option value="3.8">3.8</option>
                    <option value="3.9">3.9</option>
                    <option value="4.0">4.0</option>
                    <option value="4.1">4.1</option>
                    <option value="4.2">4.2</option>
                    <option value="4.3">4.3</option>
                    <option value="4.4">4.4</option>
                    <option value="4.5">4.5</option>
                    <option value="4.6">4.6</option>
                    <option value="4.7">4.7</option>
                    <option value="4.8">4.8</option>
                    <option value="4.9">4.9</option>
                    <option value="5.0">5.0</option>
                  </select>
                </div>
                <div class="clause" style={{ marginTop: "15px" }}>
                  <div>
                    <h6>Number of Pages</h6>
                  </div>
                  <div class="d-inline">
                    <input
                      name="page-start"
                      size="21"
                      onChange={(e) => setPagesStart(e.target.value)}
                    />
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;to &nbsp;&nbsp;&nbsp;&nbsp;
                  <div class="d-inline">
                    <input
                      name="page-end"
                      size="21"
                      onChange={(e) => setPagesEnd(e.target.value)}
                    />
                  </div>
                </div>
                <div class="clause" style={{ marginTop: "10px" }}>
                  <Row>
                    <Col md="2">
                      <div style={{ marginTop: "10px" }}>
                        <h6>Language</h6>
                      </div>
                      <select
                        style={{ width: "195px", padding: "2px" }}
                        placeholder="Select Language"
                        value={langVal}
                        onChange={(e) => setLangVal(e.target.value)}
                      >
                        <option value=""  selected>
                          Select Language
                        </option>
                        {languages.map((language) => {
                          return (
                            <option value={language.LANGUAGE}>
                              {language.LANGUAGE}
                            </option>
                          );
                        })}
                      </select>
                    </Col>
                    <Col md="2">
                      <div style={{ marginTop: "10px" }}>
                        <h6>Binding Type</h6>
                      </div>
                      <select
                        style={{ width: "195px", padding: "2px" }}
                        placeholder="Select Binding"
                        value={bindVal}
                        onChange={(e) => setBindVal(e.target.value)}
                      >
                        <option value=""  selected>
                          Select Binding
                        </option>
                        {binds.map((bind) => {
                          return (
                            <option value={bind.BINDING}>{bind.BINDING}</option>
                          );
                        })}
                      </select>
                    </Col>
                  </Row>
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    class="btnSubmit"
                    value="Advance Search"
                    onClick={advanceSearch}
                  />
                  <ToastContainer
                    style={{marginTop: "70px"}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllBooks;
