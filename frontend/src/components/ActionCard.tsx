import { Link } from "react-router-dom";

type Props = {
  title: string;
  description: string;
  to: string;
};

export function ActionCard({ title, description, to }: Props) {
  return (
    <Link to={to} className="action-card">
      <h4>{title}</h4>
      <p>{description}</p>
      
    </Link>
  );
}
