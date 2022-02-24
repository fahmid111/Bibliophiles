import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";

const HomePage = React.lazy(() => import("./components/HomePage"));
const MainPage = React.lazy(() => import("./components/MainPage"));
const SingleBookPage = React.lazy(() => import("./components/singlePage"));
const AuthorPage = React.lazy(() => import("./components/AuthorPage"));
const PublisherPage = React.lazy(() => import("./components/PublisherPage"));
const AllBookPage = React.lazy(() => import("./components/AllBooks/AllBooks.js"));
const Bookshelves = React.lazy(() => import("./components/Bookshelves"));
const BookshelfCreate = React.lazy(() => import("./components/Bookshelves/Create"));
const BookshelfCreate02 = React.lazy(() => import("./components/Bookshelves/Create/Create02"));
const BookshelfCreate03 = React.lazy(() => import("./components/Bookshelves/Create/Create03"));
const DeleteBookshelf = React.lazy(() => import("./components/Bookshelves/Delete"));
const EditBookshelf = React.lazy(() => import("./components/Bookshelves/Edit"));
const AdminHome = React.lazy(() => import("./components/Admin/AdminHomePage"));
const ManageBooks = React.lazy(() => import("./components/Admin/ManageBookPage"));
const ManageAuthor = React.lazy(() => import("./components/Admin/ManageAuthorPage"));
const ManagePublisher = React.lazy(() => import("./components/Admin/ManagePublisherPage"));
const ManageGenre = React.lazy(() => import("./components/Admin/ManageGenrePage"));
const UserProfile = React.lazy(() => import("./components/UserProfilePage"));
const AdminProfile = React.lazy(() => import("./components/AdminProfilePage"));

function App() {
  return (
    <Router>
      <React.Suspense fallback={"loading  ....."}>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/user-homepage" exact component={HomePage} />
          <Route path="/book/:ISBN" component={SingleBookPage} />
          <Route path="/author/:AUTHOR_ID" component={AuthorPage} />
          <Route path="/publisher/:PUBLISHER_ID" component={PublisherPage} />
          <Route path="/showbook" component={AllBookPage} />
          <Route path="/bookshelves" component={Bookshelves} />
          <Route path="/create-bookshelf" component={BookshelfCreate} />
          <Route path="/create-bookshelf-2" component={BookshelfCreate02} />
          <Route path="/create-bookshelf-3" component={BookshelfCreate03} />
          <Route path="/delete-bookshelf" component={DeleteBookshelf} />
          <Route path="/edit-bookshelf" component={EditBookshelf} />
          <Route path="/admin-homepage" component={AdminHome} />
          <Route path="/manage-books" component={ManageBooks} />
          <Route path="/manage-authors" component={ManageAuthor} />
          <Route path="/manage-publishers" component={ManagePublisher} />
          <Route path="/manage-genres" component={ManageGenre} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/admin-profile" component={AdminProfile} />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
