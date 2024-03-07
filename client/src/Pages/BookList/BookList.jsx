import { Link } from "react-router-dom";
import BookLink from "./BookLink";
import { useState, useEffect } from "react";
import { getAllBooks } from "../../Models/Book";

export default function BookList() {
  const [books, setBooks] = useState();
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllBooks();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setBooks(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>Books not found</p>
      </>
    );
  }

  if (!loaded) {
    return (
      <>
        <p>Books are loading</p>
      </>
    );
  }

  return (
    <>
      <h1>Book list</h1>
      {books.map((book, index) => (
        <BookLink key={index} name={book.name} id={book._id} />
      ))}

      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
