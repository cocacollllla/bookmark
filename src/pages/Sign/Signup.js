import React, { useState } from "react";
import { signup } from "../../api/axios";
import Loading from "../../components/Loading";
import Sign from "./Sign";
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMesssage] = useState(null);

  const onSubmit = async (email, password) => {
    setLoading(true);
    const data = await signup(email, password);
    setMesssage(data);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Sign onSubmit={onSubmit} errMessage={message} />
    </div>
  );
};

export default Signup;
