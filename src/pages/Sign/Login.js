import React, { useState } from "react";
import { login } from "../../api/axios";
import Loading from "../../components/Loading";
import Sign from "./Sign";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onSubmit = async (email, password) => {
    setLoading(true);
    const data = await login(email, password);
    setMessage(data);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Sign isLogin onSubmit={onSubmit} errMessage={message} />
    </div>
  );
};

export default Login;
