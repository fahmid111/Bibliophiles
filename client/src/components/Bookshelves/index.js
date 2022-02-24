import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Banner from "../../assets/images/bookshelves.jpg";
import httpCommon from "../../HTTP/httpCommonParam";
import NavbarHomePage from "../Navbar/NavbarHomePage";
import Slides from "./Slides";
import "./style.css";
const toastFun = (message, type) =>{
  if(type===1){
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }else if(type===2){
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
}




export default function Bookshelf() {
  const [bookshelves, setBookshelf] = useState([]);
  const [books, setBooks] = useState([]);
  const [val, setVal] = useState(null);

  useEffect(() => {
    getAllBookshelves();
  
  }, []);
  
  const getAllBookshelves = async () => {

    try {
      const getBookshelves = await httpCommon.get(`/bookshelves`);
      setBookshelf(getBookshelves.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBooks = async (e) => {
    e.preventDefault();
    try {
      if(val === null){
        toastFun("Select Bookshelf First!", 2);
        return;
      }else{
        const getBooks = await httpCommon.get(`/book-bookshelf?BOOKSHELF_ID=${val}`);
        setBooks(getBooks.data);
        console.log(getBooks.data);
      }
    } catch (error) {
      toastFun("No Books in This Bookshelf", 2);
      setBooks([]);
      console.log(error);
    }
  };


  return (
    <div>
       <div>
      <NavbarHomePage />
      </div>
        <div class="container-fluid content-b">
        	<div class="row">
		        <div class="col-md-10 banner-b create-container-b">
              <img src={Banner} width="600px"></img>
              <br></br><br></br>
              <form id="bookshelf" onSubmit={getBooks}>
                  
                  <div class="form-group">
                  <select class="form-control" placeholder='Select a Bookshelf' value={val} onChange={(e) => setVal(e.target.value)}>
                  <option value="" disabled selected>Select Your Bookshelf</option>
                  {bookshelves.map(bookshelf => {
                      return <option value={bookshelf.BOOKSHELF_ID}>{bookshelf.BOOKSHELF_NAME}</option>;
                  })}
                  </select>
                  </div>
                  <div class="form-group">
                      <input type="submit" class="btnSubmit-b" value="select" />
                      <ToastContainer
                    style={{marginTop: "70px"}}
                  />
                  </div>
              </form>
              <div>
                <Slides book = {books}></Slides>
              </div>
		        </div>
		        <div class="col-md-2">
		  	      <div class="card rightPanel-b">
			          <div class="card-body">
                  <h5 class="menu-b"><i class="fab fa-mendeley"></i>&nbsp;Menu</h5>
                  <br></br>
                  <Link to={"/create-bookshelf"} class="link-right-b" style={{ textDecoration: 'none' }}>
                  <p class="card-text menu-option-b">
                    Create Bookshelf
                  </p></Link>
                  <Link to={"/create-bookshelf-2"} class="link-right-b" style={{ textDecoration: 'none' }}>
                    <br></br>
                  <p class="card-text menu-option-b">
                    Add to Bookshelf
                  </p></Link>
                  <Link to={"/delete-bookshelf"} class="link-right-b" style={{ textDecoration: 'none' }}>
                    <br></br>
                  <p class="card-text menu-option-b">
                    Delete Bookshelf
                  </p></Link>
                  <Link to={"/edit-bookshelf"} class="link-right-b" style={{ textDecoration: 'none' }}>
                    <br></br>
                  <p class="card-text menu-option-b">
                    Edit Bookshelf
                  </p></Link>
				        </div>
			        </div>
		        </div>
	        </div>
        </div>
    </div>
  );
}