import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="text-center mt-5">
      <h1>404 — Page Not Found</h1>
      <p className="mt-3">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
}
