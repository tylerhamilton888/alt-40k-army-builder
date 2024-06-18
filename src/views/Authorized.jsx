import { Navigate } from "react-router-dom";

export const Authorized = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("game_user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
