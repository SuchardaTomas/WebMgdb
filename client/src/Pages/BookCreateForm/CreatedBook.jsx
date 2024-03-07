import { Link, useParams } from "react-router-dom";

export default function createdBook() {
  const { id } = useParams();

  return (
    <>
      <p>Book was created: {id}</p>
      <Link to={`/book/${id}`}>
        <p>View book</p>
      </Link>
      <Link to={`/`}>
        <p>Go home</p>
      </Link>
    </>
  );
}
