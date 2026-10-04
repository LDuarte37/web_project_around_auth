import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, loggedIn, isCheckingToken }) {
  if (isCheckingToken) {
    return null;
  }

  return loggedIn ? children : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;