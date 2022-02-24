// import Banner from "../../assets/images/banner.jpg";
import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./style.css";


export default function Slides({ book }) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    // nextArrow: <NextBtn />,
    // prevArrow: <PreviousButton />
  };
  return (
      <Slider {...settings}>
        {book.map(function(book) {
          return (
            <React.Fragment>
              <Link to={`/book/${book.ISBN}`}>
                <Col>
                  <Card>
                    <Card.Img
                      variant="top"
                      src = {`https://i.imgur.com/${book.COVER_IMAGE}.jpg`}
                      width = "60px"
                      height = "250px"
                    />
                    <Card.Body>
                      <span class="text-dark card-text-bottom"><em>{book.TITLE}</em></span>
                    </Card.Body>
                  </Card>
                </Col>
              </Link>
            </React.Fragment>
          );
        })}
      </Slider>
  );
}
