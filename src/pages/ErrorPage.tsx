import { useLocation } from "react-router-dom";

function ErrorPage() {
  const pathname = useLocation();

  return (
    <div className="text-2xl">
      No matches found for
      <span className="font-bold">&nbsp;{pathname.pathname}</span>
    </div>
  );
}

export default ErrorPage;
