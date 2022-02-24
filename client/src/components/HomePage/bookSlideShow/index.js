// import Banner from "../../assets/images/banner.jpg";
import React from "react";
import { Card, Col } from "react-bootstrap";
// import "./carousel.css";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

export default function BookSlideShow({ book, inf }) {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    // nextArrow: <NextBtn />,
    // prevArrow: <PreviousButton />
  };
  if(!inf){
    settings.infinite = true;
  } 
  return (
    <Slider {...settings}>
      {book.map(function (book) {
        return (
          <React.Fragment>
            <Link to={`/book/${book.ISBN}`} style={{textDecoration: 'none'}}>
              <Col>
                <Card class="h-100">
                  
                  {/* <h5 style={{ textAlign: "center" }}>{book.BOOK_RANK}</h5> */}
                  {() => {
                    if (book.BOOK_RANK) {
                      return <>{book.BOOK_RANK}</>;
                    }
                  }}
                  <Card.Img
                    variant="top"
                    src={`https://i.imgur.com/${book.COVER_IMAGE}.jpg`}
                    width="100"
                    alt={book.TITLE}
                    height="250"
                    title={book.TITLE}
                  />
                  {book.BOOK_RANK != null ? (
                    <>
                      <span class=" text-center" style={{padding: "5px"}}>
                        <span class="text-dark">
                          <em>#{book.BOOK_RANK}</em>
                        </span>
                        <span class="text-muted">
                        &nbsp;&nbsp;&nbsp;
                          <FaStar
                            size={15}
                            color={colors.orange}
                            style={{
                              marginRight: 5,
                              marginBottom: 5,
                            }}
                          />
                          <small>
                            <b>
                              {book.AVERAGE_RATING.toFixed(2)}
                              <span style={{ fontSize: "13px" }}>/5</span>
                            </b>
                          </small>
                        </span>
                      </span>
                    </>
                  ) : null}
                  {/* <Card.Body>
                      <span class="text-dark"><em>{book.TITLE}</em></span>
                    </Card.Body> */}
                </Card>
              </Col>
            </Link>
          </React.Fragment>
        );
      })}
    </Slider>
  );
}
