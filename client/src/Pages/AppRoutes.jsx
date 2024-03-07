import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage/MainPage";

import BookView from "./BookView/BookView";
import BookList from "./BookList/BookList";
import BookCreateForm from "./BookCreateForm/BookCreateForm";
import BookUpdateForm from "./BookUpdateForm/BookUpdateForm";
import CreatedBook from "./BookCreateForm/CreatedBook";
import BookDeleted from "./BookView/BookDeleted";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/book/:id" element={<BookView />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/createbook" element={<BookCreateForm />} />
        <Route path="/updatebook/:id" element={<BookUpdateForm />} />
        <Route path="/createdbook/:id" element={<CreatedBook />} />
        <Route path="/deletedbook/:id" element={<BookDeleted />} />
      </Routes>
    </BrowserRouter>
  );
}

