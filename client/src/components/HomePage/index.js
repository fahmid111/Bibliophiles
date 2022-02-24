import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Banner from "../../assets/images/banner021.jpg";
import httpCommon from "../../HTTP/httpCommonParam.js";
import NavbarHomePage from "../Navbar/NavbarHomePage";
import BookSlideShow from "./bookSlideShow";
import "./HomePage.css";
import { HomeWrapper } from "./style";

const TOP_COUNT = 25;

export default function HomePage() {
  const [allBooks, setAllBooks] = useState([]);
  const [topBooks, setTopBooks] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);
  const [allFantasyBooks, setAllFantasyBooks] = useState([]);
  const [allYABooks, setAllYABooks] = useState([]);
  const [allThrillerBooks, setAllThrillerBooks] = useState([]);
  const [allClassicBooks, setAllClassicBooks] = useState([]);
  const [allMysteryBooks, setAllMysteryBooks] = useState([]);
  const [allSciFiBooks, setAllSciFiBooks] = useState([]);
  const [allDramaBooks, setAllDramaBooks] = useState([]);
  const [allRomBooks, setAllRomBooks] = useState([]);

  useEffect(() => {
    // getAllBooks();
    getTopBooks();
    getRecentBooks();
    getAllFantasyBooks();
    getAllYABooks();
    getAllThrillerBooks();
    getAllClassicBooks();
    getAllMysteryBooks();
    getAllSciFiBooks();
    getAllDramaBooks();
    getAllRomBooks();
  }, []);

  // const getAllBooks = async () => {
  //   try {
  //     const books = await httpCommon.get("/book");
  //     setAllBooks(books.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getTopBooks = async () => {
    try {
      const books = await httpCommon.get(`/topBooks?COUNT=${TOP_COUNT}`);
      setTopBooks(books.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getRecentBooks = async () => {
    try {
      const books = await httpCommon.get(`/recentBooks?COUNT=${TOP_COUNT}`);
      setRecentBooks(books.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllFantasyBooks = async () => {
    try {
      const books = await httpCommon.get("/getGenreBook/?name=fantasy");
      setAllFantasyBooks(books.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllYABooks = async () => {
    try {
      const books = await httpCommon.get("/getGenreBook/?name=young adult");
      setAllYABooks(books.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllThrillerBooks = async () => {
    try {
      const books = await httpCommon.get("/getGenreBook/?name=thriller");
      setAllThrillerBooks(books.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllClassicBooks = async () => {
    try {
      const books = await httpCommon.get("/getGenreBook/?name=classics");
      setAllClassicBooks(books.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMysteryBooks = async () => {
    try {
      const books = await httpCommon.get("/getGenreBook/?name=mystery");
      setAllMysteryBooks(books.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSciFiBooks = async () => {
    try {
      const books = await httpCommon.get("/getGenreBook/?name=science fiction");
      setAllSciFiBooks(books.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllDramaBooks = async () => {
    try {
      const books = await httpCommon.get("/getGenreBook/?name=drama");
      setAllDramaBooks(books.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllRomBooks = async () => {
    try {
      const books = await httpCommon.get("/getGenreBook/?name=romance");
      setAllRomBooks(books.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <NavbarHomePage />
      </div>
      <div class="main-container">
        <div className="head-text">
          <div className="head-image">
            <img className="photo-u" src={Banner} alt="Cover image" />
          </div>
          <div className="text-on-image-u" style={{ marginTop: "20px" }}>
            <h2>
              {" "}
              <strong> Welcome to Bibliophiles </strong>{" "}
            </h2>
            <p></p>
            <p>
              <br></br>
              <h4>
                {" "}
                <p>find the books you love</p>{" "}
                <p>in the bibliophile's paradise</p>{" "}
              </h4>
            </p>
            <br></br>
            <a href="#start">
              <button type="button" class="btn btn-primary btn-lg">
                Get Started
              </button>
            </a>
          </div>
        </div>

        <div id="start"></div>
        <br></br>

        {/* <div>
        <HomeWrapper id="all_books">
          <Container>
          <div className="clearfix mt-5 mb-2 divBottom">
             <header>
               <h3 className="float-left">Surf through All Books</h3>
            </header>
            </div>
            <br></br>
            <BookSlideShow book={allBooks} />
          </Container>
        </HomeWrapper>
      </div>
      <div>
        <br></br> */}

        <div>
          <HomeWrapper id="top_books">
            <Container>
              <div className="clearfix mt-5 mb-2 divBottom">
                <header>
                  <h3 className="float-left">{"Bibliophiles Top " + TOP_COUNT}</h3>
                </header>
              </div>
              <br></br>
              <BookSlideShow book={topBooks} inf = {true} />
            </Container>
          </HomeWrapper>
        </div>
        <div>
          <br></br>
        </div>

        <div>
          <HomeWrapper id="recent_books">
            <Container>
              <div className="clearfix mt-5 mb-2 divBottom">
                <header>
                  <h3 className="float-left">Recent Books</h3>
                </header>
              </div>
              <br></br>
              <BookSlideShow book={recentBooks} inf = {true} />
            </Container>
          </HomeWrapper>
        </div>
        <div>
          <br></br>
        </div>


        <div>
          <HomeWrapper>
            <Container>
              <div className="clearfix mt-5 mb-2 divBottom">
                <header>
                  <h3 className="float-left">Surf by Genre</h3>
                </header>
              </div>
            </Container>
          </HomeWrapper>
        </div>

        <div>
          <HomeWrapper>
            <Container>
              <div className="clearfix mt-5 mb-2">
                <h5 className="float-left">
                  <u>Classic Books</u>
                </h5>
                {/* <Link className="float-right text-uppercase" to="/">
              see all
              </Link> */}
              </div>
              <BookSlideShow book={allClassicBooks} />
            </Container>
          </HomeWrapper>
        </div>
        <div>
          <br></br>
        </div>

        <div>
          <HomeWrapper>
            <Container>
              <div className="clearfix mt-5 mb-2">
                <h5 className="float-left">
                  <u>Fantasy Books</u>
                </h5>
                {/* <Link className="float-right text-uppercase" to="/">
              see all
              </Link> */}
              </div>
              <BookSlideShow book={allFantasyBooks} />
            </Container>
          </HomeWrapper>
        </div>
        <div>
          <br></br>
        </div>

        <div>
          <HomeWrapper>
            <Container>
              <div className="clearfix mt-5 mb-2">
                <h5 className="float-left">
                  <u>Drama Books</u>
                </h5>
                {/* <Link className="float-right text-uppercase" to="/">
              see all
              </Link> */}
              </div>
              <BookSlideShow book={allDramaBooks} />
            </Container>
          </HomeWrapper>
        </div>
        <div>
          <br></br>
        </div>

        <div>
          <HomeWrapper>
            <Container>
              <div className="clearfix mt-5 mb-2">
                <h5 className="float-left">
                  <u>Science Fiction Books</u>
                </h5>
                {/* <Link className="float-right text-uppercase" to="/">
              see all
              </Link> */}
              </div>
              <BookSlideShow book={allSciFiBooks} />
            </Container>
          </HomeWrapper>
        </div>
        <div>
          <br></br>
        </div>

        <div>
          <HomeWrapper>
            <Container>
              <div className="clearfix mt-5 mb-2">
                <h5 className="float-left">
                  <u>Young Adult Fiction Books</u>
                </h5>
                {/* <Link className="float-right text-uppercase" to="/">
              see all
              </Link> */}
              </div>
              <BookSlideShow book={allYABooks} />
            </Container>
          </HomeWrapper>
        </div>
        <div>
          <br></br>
        </div>

        <div>
          <HomeWrapper>
            <Container>
              <div className="clearfix mt-5 mb-2">
                <h5 className="float-left">
                  <u>Thriller Books</u>
                </h5>
                {/* <Link className="float-right text-uppercase" to="/">
              see all
              </Link> */}
              </div>
              <BookSlideShow book={allThrillerBooks} />
            </Container>
          </HomeWrapper>
        </div>
        <div>
          <br></br>
        </div>

        <div>
          <HomeWrapper>
            <Container>
              <div className="clearfix mt-5 mb-2">
                <h5 className="float-left">
                  <u>Mystery Books</u>
                </h5>
                {/* <Link className="float-right text-uppercase" to="/">
              see all
              </Link> */}
              </div>
              <BookSlideShow book={allMysteryBooks} />
            </Container>
          </HomeWrapper>
        </div>
        <div>
          <br></br>
        </div>

        <div>
          <HomeWrapper>
            <Container>
              <div className="clearfix mt-5 mb-2">
                <h5 className="float-left">
                  <u>Romantic Books</u>
                </h5>
                {/* <Link className="float-right text-uppercase" to="/">
              see all
              </Link> */}
              </div>
              <BookSlideShow book={allRomBooks} />
            </Container>
          </HomeWrapper>
        </div>
        <div>
          <br></br>
        </div>
      </div>
    </div>
  );
}
