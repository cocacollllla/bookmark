import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Sign = ({ isLogin, onSubmit, errMessage }) => {
  const [signInfo, setSignInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMessage(errMessage);
  }, [errMessage]);

  const switchAuthModeHandler = () => {
    if (isLogin) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  const testAcountPassword = process.env.REACT_APP_TEST_ACCOUNT_PASSWORD;

  const testAcountHandler = () => {
    setSignInfo({
      ...signInfo,
      email: "bookmark@test.com",
      password: testAcountPassword,
    });
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setSignInfo({
      ...signInfo,
      [name]: value,
    });
  };

  const submitHandler = () => {
    let { email, password, confirmPassword } = signInfo;
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (!isLogin) {
      if (!emailIsValid) {
        setMessage("올바른 이메일 형식을 입력해 주세요.");
      } else if (!passwordIsValid) {
        setMessage("비밀번호는 6자리 이상이어야 합니다.");
      } else if (!passwordsAreEqual) {
        setMessage("비밀번호가 같지 않습니다.");
      } else {
        setMessage("");
        onSubmit(email, password);
      }
    } else {
      setMessage("");
      onSubmit(email, password);
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      submitHandler();
    }
  };

  return (
    <Container>
      <div className="headerText">{isLogin ? "로그인" : "회원가입"}</div>
      <div>
        <input
          type="text"
          name="email"
          placeholder="이메일을 입력해 주세요."
          onChange={onChange}
          value={signInfo.email}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호 입력해 주세요."
          onChange={onChange}
          value={signInfo.password}
          onKeyPress={handleOnKeyPress}
        />
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 다시 한번 입력해 주세요."
            onChange={onChange}
            value={signInfo.confirmPassword}
            onKeyPress={handleOnKeyPress}
          />
        )}
        <div className="errorText">{message && message}</div>
      </div>
      <SubmitButton onClick={submitHandler}>
        {isLogin ? "로그인" : "회원가입"}
      </SubmitButton>
      <Buttons isLogin={isLogin}>
        {isLogin && <div onClick={testAcountHandler}>테스트계정</div>}
        <div onClick={switchAuthModeHandler}>
          {isLogin ? "회원가입" : "로그인"}
        </div>
      </Buttons>
    </Container>
  );
};

export default Sign;

const Container = styled.div`
  padding-top: 30px;

  input {
    width: 100%;
    padding: 13px 10px;
    margin-bottom: 8px;
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 8px;
  }

  .headerText {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 20px 0;
    text-align: center;
    font-weight: 500;
  }

  .errorText {
    position: relative;
    font-size: 0.8rem;
    color: #4448bf;
    font-weight: 500;
  }
`;

const SubmitButton = styled.div`
  margin: 30px 0 20px 0;
  padding: 15px 0;
  border-radius: 8px;
  background-color: ${(props) => props.theme.mainColor};
  text-align: center;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isLogin ? "space-between" : "flex-end")};
  align-items: center;
  font-size: 0.9rem;
`;
