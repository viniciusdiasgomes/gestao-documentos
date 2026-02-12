import { useNavigate } from "react-router-dom";
import "../styles/not-found.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="notfound-page">
      <h1>404</h1>
      <h2>Página não encontrada</h2>

      <p>
        A página que você tentou acessar não existe
        ou foi removida.
      </p>

      <button
        className="btn-home"
        onClick={() => navigate("/")}
      >
        Voltar para Home
      </button>
    </main>
  );
}
