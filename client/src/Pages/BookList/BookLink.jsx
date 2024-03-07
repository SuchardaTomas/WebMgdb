import { Link } from "react-router-dom";

export default function BookLink(props) {
  return (
    <>
      <p>Name: {props.name}</p>
      <Link to={`/book/${props.id}`}>
        <p>View book</p>
      </Link>
    </>
  );
}
