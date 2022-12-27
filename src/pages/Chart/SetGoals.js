import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userProfileUpdate } from "../../api/axios";
import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import { usersActions } from "../../store/users/users-slice";

const year = new Date().getFullYear();

const SetGoals = () => {
  const users = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState(0);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(goal === "");

  const onsubmitHandler = async () => {
    if (goal === "" || !goal) {
      setMessage("1권 이상 입력하셔야 합니다.");
      return;
    }
    if (users.goal?.hasOwnProperty(year)) {
      setMessage(`이미 ${year} 독서 목표 권 수를 정하셨습니다.`);
      return;
    }
    setLoading(true);
    await userProfileUpdate(users.uid, {
      goal: { ...users.goal, [year]: parseInt(goal) },
    });
    dispatch(
      usersActions.updateGoal({ ...users.goal, [year]: parseInt(goal) })
    );
    setLoading(false);
    navigate(-1);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Container>
      <div>{year} 독서 목표 권 수를 정해주세요.</div>
      <div className="subText">한번 정하면 수정할 수 없습니다.</div>

      <InputContainer>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        권
      </InputContainer>
      <div className="message">{message}</div>
      <HeaderRight save onsubmitHandler={onsubmitHandler} />
    </Container>
  );
};

export default SetGoals;

const Container = styled.div`
  padding-top: 30px;
  font-size: 0.9rem;
  text-align: center;

  div {
    margin-bottom: 20px;
  }

  .subText {
    font-size: 0.8rem;
    color: ${(props) => props.theme.gray400};
  }

  .message {
    font-size: 0.8rem;
    color: #4448bf;
    font-weight: 500;
  }
`;

const InputContainer = styled.div`
  margin-top: 60px;

  input {
    width: 130px;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    font-size: 1.3rem;
    font-weight: 500;
    text-align: center;
  }
`;
