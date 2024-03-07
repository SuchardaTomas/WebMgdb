import { Link, useParams, useNavigate } from "react-router-dom";
import { getBookById, deleteBook } from "../../Models/Book";
import { useEffect, useState } from "react";

export default function BookView() {
  const { id } = useParams();
  const [book, setBook] = useState();
  const [loaded, setLoaded] = useState();
  const [formData, setFormData] = useState();
  const [info, setInfo] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getBookById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setBook(data.payload);
      setLoaded(true);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if(formData === book.name) {
      const result = await deleteBook(id);
      if(result.status === 200) {
        redirect(id); 
      } else {
        setInfo(result.msg);
      }
    } else {
      setInfo("Wrong book name");
    }
  }

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const redirect = (id) => {
    return navigate(`/deletedbook/${id}`);
  }

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
      <h1>Book view </h1>
      <p>Book id: {id}</p>
      <p>Book name: {book.name}</p>
      <p>Book name of author: {book.author}</p>
      <p>Book pages: {book.pages}</p>
      <form>
        <p>Napište jméno knihy pro smazání knihy</p>
        <input type="text" placeholder={book.name} onChange={handleChange}/>
        <button onClick={handleDelete}>Delete book</button>
        <p>{info}</p>
      </form>
      
      <Link to={`/updatebook/${id}`}>
        <p>Update book</p>
      </Link>

      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}
