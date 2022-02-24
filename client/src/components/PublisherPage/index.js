import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import icon from "../../assets/images/publisher-icon.jpg";
import httpCommonGet from "../../HTTP/httpCommonParam.js";
import Slides from "../Bookshelves/Slides";
import NavbarHomePage from "../Navbar/NavbarHomePage";
import "./style.css";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

export default function PublisherPage(props) {
  const [publisher, setPublisher] = useState({});
  const [publisherBooks, setPublisherBooks] = useState([]);

  useEffect(() => {
    getPublisher();
    getPublisherBooks();
  }, []);

  const getPublisher = async () => {
    try {
      let getPublisher = await httpCommonGet.get(
        `/getPublisher?PUBLISHER_ID=${props.match.params.PUBLISHER_ID}`
      );
      setPublisher(getPublisher.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getPublisherBooks = async () => {
    try {
      let getPublisherBooks = await httpCommonGet.get(
        `/getPublisherBooks?PUBLISHER_ID=${props.match.params.PUBLISHER_ID}`
        // "/book"
      );
      setPublisherBooks(getPublisherBooks.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <NavbarHomePage />
      </div>
      <Container className="main-container-auth">
        <Row>
          <Col className="col-md-4 left-cont">
            <img src={icon} alt="" width="320" height="240" />
          </Col>
          <Col className="col-md-8 right-cont border">
            <h2 class="d-inline">
              {publisher.NAME}{" "}
            </h2>
            <hr></hr>
            <ul>
              <li>Address: {publisher.ADDRESS}</li>
              <li>Email: {publisher.EMAIL_ID}</li>
              <li>Website: {publisher.WEB_ADDRESS}</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Container>
          <h4 class="text-muted" style={{textAlign: "center", marginLeft:"-0px", marginTop: "10px"}}>
              <em>Books by {publisher.NAME}
              </em></h4><hr></hr>
      </Container>
      <div class="col-md-10 book-container-auth">
        <Slides book={publisherBooks} />
      </div>
    </div>
  );
}
