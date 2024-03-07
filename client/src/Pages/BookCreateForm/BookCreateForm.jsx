import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createBook } from "../../Models/Book";

export default function BookCreateForm() {
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const postForm = async () => {
    const book = await createBook(formData);
    if (book.status === 201) {
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
    return navigate(`/createdbook/${id}`);
  };

  return (
    <>
      <h1>Book create form</h1>

      <form>
        <input
          type="text"
          required
          name="name"
          placeholder="Enter name"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          required
          name="author"
          placeholder="Enter name of author"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          required
          name="pages"
          placeholder="Enter number of pages"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="file"
          required
          name="image"
          placeholder="image of book"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handlePost}>Create book</button>
      </form>

      <p>{info}</p>

      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
