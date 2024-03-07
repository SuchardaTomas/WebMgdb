import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateBook, getBookById } from "../../Models/Book";

export default function BookUpdateForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const [loaded, setLoaded] = useState();
  const [book, setBook] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getBookById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setBook(data.payload);
      setLoaded(true);
    }
  };

  const postForm = async () => {
    const book = await updateBook(id, formData);
    if (book.status === 200) {
      redirectToSuccessPage(book.payload._id);
    } else {
      setInfo(book.msg);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  const redirectToSuccessPage = (id) => {
    return navigate(`/book/${id}`);
  };

  useEffect(() => {
    load();
  }, []);

  if (loaded === null) {
    return (
      <>
        <p>Book not found</p>
      </>
    );
  }

  if (!loaded) {
    return (
      <>
        <p>Loading book...</p>
      </>
    );
  }

  return (
    <>
      <h1>Book update form</h1>

      <form>
        <input
          type="text"
          required
          name="name"
          placeholder="Enter name"
          defaultValue={book.name}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          required
          name="author"
          placeholder="Enter name of author"
          defaultValue={book.legs}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          required
          name="pages"
          placeholder="Enter number of pages"
          defaultValue={book.pages}
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handlePost}>Update book</button>
      </form>

      <p>{info}</p>

      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
