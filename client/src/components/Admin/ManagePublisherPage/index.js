import qs from "qs";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import httpCommonParam from "../../../HTTP/httpCommonParam.js";
import httpCommonURL from "../../../HTTP/httpCommonURL";
import NavbarAdmin from "../../Navbar/NavbarAdmin";
import toastFun from "../../toast/toast";
import "./style.css";

export default function ManagePublisherPage(props) {
  const [publishers, setPublisher] = useState([]); //ok
  const [publisherAdd, setPublisherAdd] = useState({});
  const [publisherUpdate, setPublisherUpdate] = useState({});
  const [valPublisherID, setValPublisherID] = useState(null);
  const [valPublisherIDDel, setValPublisherIDDel] = useState(null);

  const [publisherBooks, setPublisherBooks] = useState([]);

  const [publisherBooksDel, setPublisherBooksDel] = useState([]);


  useEffect(() => {
    getAllPublishers();
  }, []);

  const getAllPublishers = async () => {
    try {
      const getPublishers = await httpCommonParam.get(`/all-publishers`);
      /* console.log(getPublishers); */
      setPublisher(getPublishers.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addPublisher = async (e) => {
    e.preventDefault();
    if (publisherAdd === {}) {
      toastFun("Fill the Necessary Fields", 2);
      return;
    } else if (!publisherAdd.NAME) {
      toastFun("Fill Publisher Name!", 2);
      return;
    } else if (!publisherAdd.EMAIL_ID) {
      toastFun("Fill email!", 2);
      return;
    } 
    
    else {
      try {
        var data = qs.stringify(publisherAdd);
        const publisher = await httpCommonURL.post("/addPublisher", data);
        setPublisherAdd(publisherAdd);
        toastFun("Added Successfully!", 1);
      } catch (error) {
        toastFun("Failed to Add Publisher", 2);
        console.log(error);
      }
    }
  };

  
  const getPublisherBooks = async (e) => {
    
    e.preventDefault();
    try {
     
      console.log(valPublisherID);
      let getPublisherBooks = await httpCommonParam.get(
        `/getPublisherBooks?PUBLISHER_ID=${valPublisherID}`
      );
      setPublisherBooks(getPublisherBooks.data);
   
    } catch (error) {
      // toastFun("This publisher has no books", 2);
      setPublisherBooks([]);
      console.log(error);
    }
  };
  


  
  const getPublisherToUpdate = async (e) => {
    e.preventDefault();
    
    try {
      let getPublisher = await httpCommonParam.get(
        `/getPublisher?PUBLISHER_ID=${valPublisherID}`
      );
      getPublisher = getPublisher.data[0];
      setPublisherUpdate(getPublisher);
      getPublisherBooks(e);
      console.log(publisherBooks.length);
    } catch (error) {
      toastFun("Failed to Get Publisher", 2);
      console.log(error);
    }
  };

  const updatePublisher = async (e) => {
    e.preventDefault();
    if (!publisherUpdate.PUBLISHER_ID) {
      toastFun("Select Publisher First!", 2);
    } else if (!publisherUpdate.NAME) {
      toastFun("Fill Publisher Name!", 2);
      return;
    }  else if (!publisherUpdate.EMAIL_ID) {
      toastFun("Fill email!", 2);
      return;
    }   
    else {
      try {
        var data = qs.stringify(publisherUpdate);
        const publisher = await httpCommonURL.put("/updatePublisher", data);
        setPublisherUpdate(publisher);
        toastFun("Updated Successfully!", 1);
      } catch (err) {
        toastFun("Failed to Update Publisher", 2);
        console.log(err);
      }
    }
  };

  const getPublisherBooksDel = async (e) => {
    
    e.preventDefault();
    
    try {
      if(valPublisherIDDel === null) {
        toastFun("No Publisher Selected!", 2);
        return;
      }
      toastFun("Publisher Selected!", 1);
      let getPublisherBooksDel = await httpCommonParam.get(
        `/getPublisherBooks?PUBLISHER_ID=${valPublisherIDDel}`
      );
      setPublisherBooksDel(getPublisherBooksDel.data);
   
    } catch (error) {
      // toastFun("This publisher has no books.", 2);
      setPublisherBooks([]);
      console.log(error);
    }
  };

  const deletePublisher = async (e) => {
    e.preventDefault();

    try {
      if (valPublisherIDDel === null) {
        toastFun("No Publisher Selected!", 2);
        return;
      } else {
        const deletedPublisher = await httpCommonParam.delete(
          `/deletePublisher?PUBLISHER_ID=${valPublisherIDDel}`
        );
        toastFun("Deleted Successfully!", 1);
        setValPublisherIDDel(null);
      }
    } catch (error) {
      toastFun("This publisher has books. Cannot Delete.", 2);
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer style={{ marginTop: "70px" }} />

      <div>
        <NavbarAdmin />
      </div>
      <div class="container-fluid content">
        <div class="row">
          <div class="col-md-10 create-container">
            <div class="col-md-4"></div>
            <div class="col-md-6 create-form" id="add-publisher">
              <h4>Add Publisher</h4>
              <form id="add-author-form" onSubmit={addPublisher}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name *"
                    name="publisher-name"
                    onChange={(e) =>
                      setPublisherAdd({ ...publisherAdd, NAME: e.target.value })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Address "
                    name="publisher-address"
                    onChange={(e) =>
                      setPublisherAdd({
                        ...publisherAdd,
                        ADDRESS: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email id *"
                    name="publisher-email-id"
                    onChange={(e) =>
                      setPublisherAdd({
                        ...publisherAdd,
                        EMAIL_ID: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Web Address"
                    name="publisher-web-address"
                    onChange={(e) =>
                      setPublisherAdd({
                        ...publisherAdd,
                        WEB_ADDRESS: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input type="submit" class="btnSubmit" value="Add" />
                </div>
              </form>
            </div>

            <p></p>
            <p></p>
            <div class="col-md-6 create-form" id="update-publisher">
              <h4> Update Publisher</h4>
              <form id="update-publisher-form" onSubmit={updatePublisher}>
                <div class="form-group">
                  <select
                    class="form-control"
                    placeholder="Select Publisher"
                    value={valPublisherID}
                    onChange={(e) => setValPublisherID(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select Publisher
                    </option>
                    {publishers.map((publisher) => {
                      return (
                        <option value={publisher.PUBLISHER_ID}>
                          {publisher.PUBLISHER_NAME_EMAIL}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p></p>
                <div>
                  <button class="btnSubmit" onClick={getPublisherToUpdate}>
                    {" "}
                    Get Publisher{" "}
                  </button>
                </div>
                <p></p>
                <div class="form-group">
                  <select
                    class="form-control"
                    placeholder="No books yet"
                    value={valPublisherID} 
                    /* onChange={(e) => setValAuthorID(e.target.value)} */
                  >
                    <option value="" placeholder="" disabled selected>
                      {"There are " + publisherBooks.length + " Books of this Publisher"}
                    </option>
                    {publisherBooks.map((publisherBook) => {
                      return (
                        <option disabled>
                          {publisherBook.TITLE}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p></p>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Publisher Name *"
                    name="publisher-name"
                    value={publisherUpdate != null ? publisherUpdate.NAME : ""}
                    onChange={(e) =>
                      setPublisherUpdate({
                        ...publisherUpdate,
                        NAME: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Address "
                    name="publisher-address"
                    value={
                      publisherUpdate != null ? publisherUpdate.ADDRESS : ""
                    }
                    onChange={(e) =>
                      setPublisherUpdate({
                        ...publisherUpdate,
                        ADDRESS: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email id *"
                    name="publisher-email-id"
                    value={
                      publisherUpdate != null ? publisherUpdate.EMAIL_ID : ""
                    }
                    onChange={(e) =>
                      setPublisherUpdate({
                        ...publisherUpdate,
                        EMAIL_ID: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Web Address "
                    name="publisher-web-address"
                    value={
                      publisherUpdate != null ? publisherUpdate.WEB_ADDRESS : ""
                    }
                    onChange={(e) =>
                      setPublisherUpdate({
                        ...publisherUpdate,
                        WEB_ADDRESS: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <input type="submit" class="btnSubmit" value="Update" />
                </div>
              </form>
            </div>

            <p></p>
            <p></p>

            <div class="col-md-6 create-form" id="delete-publisher">
              <h4> Delete Publisher</h4>
              <form id="delete-publisher-form" onSubmit={deletePublisher}>
                <div class="form-group">
                  <select
                    class="form-control"
                    placeholder="Select Publisher"
                    value={valPublisherIDDel}
                    onChange={(e) => setValPublisherIDDel(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select Publisher
                    </option>
                    {publishers.map((publisher) => {
                      return (
                        <option value={publisher.PUBLISHER_ID}>
                          {publisher.PUBLISHER_NAME_EMAIL}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p></p>
                <p></p>
                <div>
                  <button class="btnSubmit" onClick={getPublisherBooksDel}>
                    {" "}
                    Get Publisher{" "}
                  </button>
                </div>
                <p></p>
                <div class="form-group">
                  <select
                    class="form-control"
                    placeholder="No books yet"
                    value={valPublisherIDDel} 
                    /* onChange={(e) => setValAuthorID(e.target.value)} */
                  >
                    <option value="" disabled selected>
                    {"There are " + publisherBooksDel.length + " Books of this Publisher"}
                    </option>
                    {publisherBooksDel.map((publisherBookDel) => {
                      return (
                        <option disabled>
                          {publisherBookDel.TITLE}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p></p>
                <p></p>
                <div class="form-group">
                  <input type="submit" class="btnSubmit" value="Delete" />
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

                <a
                  href="#add-publisher"
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Add Publisher</p>
                </a>
                <br></br>
                <a
                  href="#update-publisher"
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Update Publisher</p>
                </a>
                <br></br>
                <a
                  href="#delete-publisher"
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Delete Publisher</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}