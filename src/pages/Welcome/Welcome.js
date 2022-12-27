import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdBookmark } from "react-icons/io";
import styled from "styled-components";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="logoIcon">
        <IoMdBookmark className="icon" />
        <p>독서를 기록해보세요.</p>
      </div>

      <StartButton onClick={() => navigate("/login")}>
        <div>시작하기</div>
      </StartButton>
    </Container>
  );
};

export default Welcome;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  .logoIcon {
    height: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    .icon {
      font-size: 8rem;
      color: ${(props) => props.theme.mainColor};
    }

    p {
      padding: 40px 0;
    }
  }
`;

const StartButton = styled.div`
  width: 100%;
  padding: 20px 0;

  div {
    padding: 15px 0;
    border-radius: 8px;
    background-color: ${(props) => props.theme.mainColor};
    text-align: center;
    color: white;
    font-weight: 500;
  }
`;
