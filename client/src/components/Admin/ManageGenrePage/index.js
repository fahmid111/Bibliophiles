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

export default function ManageGenrePage(props) {
  const [genres, setGenre] = useState([]); //ok
  const [genreAdd, setGenreAdd] = useState({});
  const [genreUpdate, setGenreUpdate] = useState({});
  const [valGenreID, setValGenreID] = useState(null);
  const [valGenreIDDel, setValGenreIDDel] = useState(null);

  useEffect(() => {
    getAllGenres();
  }, []);

  const getAllGenres = async () => {
    try {
      const getGenres = await httpCommonParam.get(`/get-all-genre`);
      setGenre(getGenres.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addGenre = async (e) => {
    e.preventDefault();
    if (genreAdd === {}) {
      toastFun("Fill the Necessary Fields", 2);
      return;
    } else if (!genreAdd.GENRE_NAME) {
      toastFun("Fill the Genre Name!", 2);
      return;
    } else {
      try {
        var data = qs.stringify(genreAdd);
        const genre = await httpCommonURL.post("/addGenre", data);
        setGenreAdd(genreAdd);
        toastFun("Added Successfully!", 1);
      } catch (error) {
        toastFun("Failed to Add Genre", 2);
        console.log(error);
      }
    }
  };

  const getGenreToUpdate = async (e) => {
    e.preventDefault();
    try {
      let getGenre = await httpCommonParam.get(
        `/getGenre?GENRE_ID=${valGenreID}`
      );
      getGenre = getGenre.data[0];
      setGenreUpdate(getGenre);
    } catch (error) {
      toastFun("Failed to Get Genre", 2);
      console.log(error);
    }
  };

  const updateGenre = async (e) => {
    e.preventDefault();
    if (!genreUpdate.GENRE_ID) {
      toastFun("Select Genre First!", 2);
    } else if (!genreUpdate.GENRE_NAME) {
      toastFun("Fill the Genre Name!", 2);
      return;
    } else {
      try {
        var data = qs.stringify(genreUpdate);
        const genre = await httpCommonURL.put("/updateGenre", data);
        setGenreUpdate(genre);
        toastFun("Updated Successfully!", 1);
      } catch (err) {
        toastFun("Failed to Update Genre", 2);
        console.log(err);
      }
    }
  };

  const deleteGenre = async (e) => {
    e.preventDefault();

    try {
      if (valGenreIDDel === null) {
        toastFun("No Genre Selected!", 2);
        return;
      } else {
        const deletedGenre = await httpCommonParam.delete(
          `/deleteGenre?GENRE_ID=${valGenreIDDel}`
        );
        toastFun("Deleted Successfully!", 1);
      }
    } catch (error) {
      toastFun("Cannot Delete this Genre!", 2);
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
            <div class="col-md-6 create-form" id="add-genre">
              <h4>Add Genre</h4>
              <form id="add-genre-form" onSubmit={addGenre}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name *"
                    name="genre-name"
                    onChange={(e) =>
                      setGenreAdd({ ...genreAdd, GENRE_NAME: e.target.value })
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
            <div class="col-md-6 create-form" id="update-genre">
              <h4> Update Genre</h4>
              <form id="update-genre-form" onSubmit={updateGenre}>
                <div class="form-group">
                  <select
                    class="form-control"
                    placeholder="Select Genre"
                    value={valGenreID}
                    onChange={(e) => setValGenreID(e.target.value)}
                  >
                    <option value="" disabled selected>
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
                </div>
                <p></p>
                <div>
                  <button onClick={getGenreToUpdate} class="btnSubmit">
                    {" "}
                    Get Genre{" "}
                  </button>
                </div>
                <p></p>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name *"
                    name="genre-name"
                    value={genreUpdate != null ? genreUpdate.GENRE_NAME : ""}
                    onChange={(e) =>
                      setGenreUpdate({
                        ...genreUpdate,
                        GENRE_NAME: e.target.value,
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

            <div class="col-md-6 create-form" id="delete-genre">
              <h4> Delete Genre</h4>
              <form id="delete-genre-form" onSubmit={deleteGenre}>
                <div class="form-group">
                  <select
                    class="form-control"
                    placeholder="Select Genre"
                    value={valGenreIDDel}
                    onChange={(e) => setValGenreIDDel(e.target.value)}
                  >
                    <option value="" disabled selected>
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
                </div>
                <p></p>
                <p></p>
                <div class="form-group">
                  <input type="submit" class="btnSubmit" value="Delete" />
                </div>
                <ToastContainer style={{ marginTop: "70px" }} />
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
                  href="#add-genre"
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Add Genre</p>
                </a>
                <br></br>
                <a
                  href="#update-genre"
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Update Genre</p>
                </a>
                <br></br>
                <a
                  href="#delete-genre"
                  class="link-right"
                  style={{ textDecoration: "none" }}
                >
                  <p class="card-text menu-option">Delete Genre</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
