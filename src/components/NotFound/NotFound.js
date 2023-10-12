import { useNavigate, Link } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return(
    <div className="notFound">
      <h1 className="notFound__header">404</h1>
      <p className="notFound__text">Страница не найдена</p>
      <Link className="notFound__link" onClick={() => navigate(-1)}>Назад</Link>
    </div>
  )
}

export default NotFound;  