import { useNavigate, Link } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="not-found">
      <h1 className="not-found__header">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <Link className="not-found__link" onClick={() => navigate(-1)}>
        Назад
      </Link>
    </main>
  );
}

export default NotFound;
