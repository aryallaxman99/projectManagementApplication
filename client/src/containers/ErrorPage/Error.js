import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-texts">
        <h1>
          404
          <BiError />
        </h1>
        <h2>
          You didn't break the internet, but we can't find what you are looking
          for.
        </h2>
        <Link to="/">back to home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
