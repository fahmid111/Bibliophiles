// import Banner from "../../assets/images/banner.jpg";
import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import httpCommonParam from "../../../../HTTP/httpCommonParam.js";
import toastFun from "../../../toast/toast";
import "./style.css";

var del = true;


export default function Slides({ book, b_id }) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    // nextArrow: <NextBtn />,
    // prevArrow: <PreviousButton />
  };

  const delBook = async (B_ISBN) => {
    try {
      const deletedBook = await httpCommonParam.delete(
        `/del-book-bookshelf?ISBN=${B_ISBN}&BOOKSHELF_ID=${b_id}`
      );
      for (var i = 0; i < book.length; i++) {
        if (book[i].ISBN === B_ISBN) {
          book.splice(i, 1);
        }
      }
      // console.log(book);
      del = del?false:true;

      if(del){
        toastFun("Deleted Successfully! Click Select to See the Effect", 1);
      }

      // Slides({book, b_id});
      // window.location.reload();
    } catch (error) {
      toastFun("Failed to Delete!", 2);
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer style={{ marginTop: "70px" }} />

      <Slider {...settings}>
        {book.map(function (book) {
          return (
            <>
              <React.Fragment>
                <Link onClick={() => delBook(book.ISBN)}>
                  <Col>
                    <Card>
                      <Card.Img
                        class="card-book"
                        variant="top"
                        src={`https://i.imgur.com/${book.COVER_IMAGE}.jpg`}
                        // width = "60px"
                        height="250px"
                      />
                      <Card.Body>
                        <span class="text-dark card-text-bottom">
                          <em>{book.TITLE}</em>
                        </span>
                      </Card.Body>
                    </Card>
                  </Col>
                </Link>
              </React.Fragment>
            </>
          );
        })}
      </Slider>
    </>
  );
}
