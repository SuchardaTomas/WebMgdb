import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <>
      <Link to={"/createbook"}>
        <p>Book create form</p>
      </Link>

      <Link to={"/books"}>
        <p>Book list</p>
      </Link>
    </>
  );
}
