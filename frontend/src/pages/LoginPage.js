import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, verifyToken } from "../slices/AuthSlice";

import Form from "../components/Form/Form";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userInfo, setUserInfo] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const onHandleChanged = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const onHandleSubmitted = (event) => {
    event.preventDefault();
    dispatch(login(userInfo));
  };

  useEffect(() => {
    localStorage.getItem("token") && navigate("/admin");
  }, [user]);

  return (
    <div>
      <Form onChange={onHandleChanged} onSubmit={onHandleSubmitted} />
    </div>
  );
};

export default LoginPage;
