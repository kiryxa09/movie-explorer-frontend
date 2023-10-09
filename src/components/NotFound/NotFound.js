import { useNavigate, Link } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return(
    <div className="not-found">
      <h2 className="not-found__header">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <Link className="not-found__link" onClick={() => navigate(-1)}>Назад</Link>
    </div>
  )
}

export default NotFound;  