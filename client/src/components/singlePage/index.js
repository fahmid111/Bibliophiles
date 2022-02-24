import qs from "qs";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import httpCommonGet from "../../HTTP/httpCommonParam.js";
import httpCommonPost from "../../HTTP/httpCommonURL.js";
import NavbarHomePage from "../Navbar/NavbarHomePage.js";
import ShowReviews from "../ShowReviews";
import toastFun from "../toast/toast";
import "./style.css";


const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

export default function SingleBookPage(props) {
  const [book, setBook] = useState({});

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const [yourReview, setYourReview] = useState(null);

  const [allReviews, setAllReview] = useState([]);

  const [avgRating, setAvgRating] = useState(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  useEffect(() => {
    getBook();
    getRating();
    getYourReview();
    getAllReviews();
    getAvgRating();
  }, []);

  const getAvgRating = async () => {
    try {
      const rating = await httpCommonGet.get(
        `/avg-rating?ISBN=${props.match.params.ISBN}`
      );
      setAvgRating(rating.data[0].AVERAGE_RATING);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllReviews = async () => {
    try {
      const reviews = await httpCommonGet.get(
        `/all-reviews-book?ISBN=${props.match.params.ISBN}`
      );
      setAllReview(reviews.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [authors, setAuthors] = useState([]);

  const getBook = async () => {
    try {
      let getBook = await httpCommonGet.get(
        `/complete-book?ISBN=${props.match.params.ISBN}`
      );
      getBook = getBook.data[0];
      let authorText = "";
      let genreText = "";
      setAuthors(getBook.AUTHORS);
      // getBook.AUTHORS.map((author, i) => {
      //   authorName.push(author.AUTHOR_NAME);
      //   authorID.push(author.AUTHOR_ID);
      //   if (i == 0) {
      //     authorText += author.AUTHOR_NAME;
      //   } else {
      //     authorText += ", " + author.AUTHOR_NAME;
      //   }
      // });
      getBook.GENRES.map((genre, i) => {
        if (i == 0) {
          genreText += genre.GENRE_NAME;
        } else {
          genreText += ", " + genre.GENRE_NAME;
        }
      });
      // getBook.AUTHOR_NAMES = authorText;
      getBook.GENRE_NAMES = genreText;
      setBook(getBook);
    } catch (error) {
      console.log(error);
    }
  };

  const getRating = async () => {
    try {
      const getRating = await httpCommonGet.get(
        `/rate?ISBN=${props.match.params.ISBN}`
      );
      setCurrentValue(getRating.data[0].VALUE);
    } catch (error) {
      setCurrentValue(0);
      console.log(error);
    }
  };

  const getYourReview = async () => {
    try {
      const getReview = await httpCommonGet.get(
        `/review?ISBN=${props.match.params.ISBN}`
      );
      setYourReview({
        ...yourReview,
        REVIEW: getReview.data[0].REVIEW_CONTENT,
      });
    } catch (error) {
      setYourReview("");
      console.log(error);
    }
  };

  const giveRating = async () => {
    console.log(props.match.params.ISBN);
    if(currentValue===0){
      toastFun("Select Star/Stars to Rate this Book", 2);
      return;
    }
    try {
      var data = qs.stringify({
        VALUE: currentValue,
        ISBN: props.match.params.ISBN,
      });
      const rating = await httpCommonPost.post("/rate", data);
      toastFun("Rated Successfully!", 1);
    } catch (error) {
      toastFun("Failed to Rate!", 2);
      console.log(error);
    }
  };

  const postReview = async () => {
    if (!yourReview.REVIEW) {
      toastFun("Review Field is Empty!", 2);
      return;
    } else if (yourReview.REVIEW.trim() === "") {
      toastFun("Review Field is Empty!", 2);
      return;
    } else {
      try {
        var data = qs.stringify({
          REVIEW: yourReview.REVIEW,
          ISBN: props.match.params.ISBN,
        });
        const review = await httpCommonPost.post("/review", data);
        setYourReview(review);

        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <ToastContainer style={{ marginTop: "70px" }} />

      <div>
        <NavbarHomePage></NavbarHomePage>
      </div>
      <Container className="mt-5 main-container">
        <Row>
          <Col className="col-md-4 left-cont">
            <img
              src={`https://i.imgur.com/${book.COVER_IMAGE}.jpg`}
              alt=""
              width="150"
              height="230"
            />
            <div>
              <div className="rate-container">
                <b style={{ marginLeft: 35 }}>Your Rating</b>
                <div className="rate-stars">
                  {stars.map((_, index) => {
                    return (
                      <FaStar
                        key={index}
                        size={20}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={
                          (hoverValue || currentValue) > index
                            ? colors.orange
                            : colors.grey
                        }
                        style={{
                          marginRight: 10,
                          cursor: "pointer",
                        }}
                      />
                    );
                  })}
                </div>

                <button onClick={giveRating} className="rate-button">
                  Rate
                </button>
                <br></br>
                <br></br>
                <b style={{ marginLeft: 35 }}>Your Review</b>
                <textarea
                  placeholder="Write a Review for this Book"
                  type="text"
                  value={yourReview != null ? yourReview.REVIEW : ""}
                  className="rate-textarea form-control"
                  onChange={(e) =>
                    setYourReview({ ...yourReview, REVIEW: e.target.value })
                  }
                ></textarea>

                <button
                  onClick={postReview}
                  className="rate-button"
                  style={{ top: -10 }}
                >
                  Post Review
                </button>
              </div>
            </div>
          </Col>
          <Col className="col-md-8 right-cont">
            <h2>
              {book.TITLE}
              <small class="text-muted unbold">
                &nbsp;({book.ORIGINAL_PUBLICATION_YEAR})
              </small>
              <span class="text-muted" style={{ float: "right" }}>
                <b style={{ fontSize: "12px" }}>Average Rating: &nbsp; </b>
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
                    {avgRating.toFixed(2)}
                    <span style={{ fontSize: "20px" }}>/5</span>
                  </b>
                </small>
              </span>
              <h5
                class="text-muted text-larger"
                style={{ marginLeft: 10, marginTop: "5px" }}
              >
                {authors.map((author, i) => {
                  if (i == 0) {
                    return(<><Link to={`/author/${author.AUTHOR_ID}`}>
                      {author.AUTHOR_NAME}
                      </Link></>);
                  } else {
                    return(<>{", "}
                    <Link to={`/author/${author.AUTHOR_ID}`}>
                      {author.AUTHOR_NAME}
                      </Link>
                      </>);
                  }
                })}
              </h5>
              <hr></hr>
            </h2>
            <ul>
              <li>Publisher: <><Link to={`/publisher/${book.PUBLISHER_ID}`}>
                        {book.NAME}
                      </Link></></li>
              <li>Language: {book.LANGUAGE}</li>
              <li>Genre: {book.GENRE_NAMES}</li>
              <li>Description: {book.DESCRIPTION}</li>
              {/* <li>
              Generes:
              {Array.isArray(book.genres) &&
                book.genres.map(el => <span className="ml-2">{el.name}</span>)}
            </li> */}
              <li>Summary: {book.SUMMARY}</li>
              <li>Number of Pages: {book.NUMBER_OF_PAGES}</li>
              <li>Binding: {book.BINDING}</li>
            </ul>
            <div>
              <br></br>
              <br></br>
            </div>
            <div className="review-table">
              <h4 className="review-top-text">Reader Community Reviews</h4>
              <hr className="hr-line"></hr>
              <ShowReviews reviews={allReviews} />
            </div>
            <br></br>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
