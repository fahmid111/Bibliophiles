import React from "react";
import { ListGroup, ListGroupItem, Table } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function ShowReviews({ reviews }) {
  if (reviews.length == 0) {
    return <div style={{ textAlign: "center" }}>No Reviews Yet</div>;
  } else {
    return (
      <div>
        <div class="container">
          <div>
            <Table striped bordered hover className="table">
              <tbody>
                {reviews.map((review) => {
                  return (
                    <tr>
                      <td class="col-2">
                        <ListGroup className="list-group-item-action">
                          <ListGroupItem>
                            <h5 class="lister-item-header">
                              {review.NAME}
                              <small class="text-muted unbold">
                                &nbsp;({review.USER_NAME})
                              </small>

                              <span
                                class="text-muted"
                                style={{ marginLeft: "50px" }}
                              >
                                <b style={{ fontSize: "12px" }}>
                                  Rating: &nbsp;{" "}
                                </b>
                                {review.RATING != null ? (
                                  <>
                                    <FaStar
                                      size={18}
                                      color={colors.orange}
                                      style={{
                                        marginRight: 5,
                                        marginBottom: 5,
                                      }}
                                    />
                                    <small>
                                      <b>
                                        {review.RATING}
                                        <span style={{ fontSize: "13px" }}>
                                          /5
                                        </span>
                                      </b>
                                    </small>
                                  </>
                                ) : (
                                  <>
                                    <b style={{ fontSize: "12px" }}>unrated</b>
                                  </>
                                )}
                              </span>
                            </h5>
                            <hr></hr>
                            <p class="text-muted text-small">
                              <em>{review.REVIEW_CONTENT}</em>
                            </p>
                          </ListGroupItem>
                        </ListGroup>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
        <br></br>
      </div>
    );
  }
}

export default ShowReviews;
