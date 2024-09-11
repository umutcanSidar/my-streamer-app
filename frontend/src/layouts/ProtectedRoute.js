import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { verifyToken } from "../slices/AuthSlice";

const ProtectedRoute = ({ children }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    !localStorage.getItem("token") && navigate("/login");
    dispatch(verifyToken());
  }, [dispatch, navigate]);

  if (error) return <Navigate to={"/login"} />;

  return children;
};

export default ProtectedRoute;
