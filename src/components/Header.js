import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";
import styled from "styled-components";

const Header = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const currentMenu = location.pathname.split("/")[1];

  const nameInput = useRef();

  const searchPage =
    currentMenu === "search" ||
    currentMenu === "booklist" ||
    currentMenu === "addfriend";

  const placeholderText = () => {
    if (currentMenu === "search") {
      return "알라딘에서 검색";
    }
    if (currentMenu === "booklist") {
      return "내 기록에서 검색";
    }
    if (currentMenu === "addfriend") {
      return "검색할 친구의 코드를 입력해 주세요.";
    }
  };

  const handleInput = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") searchHandler();
  };

  const searchHandler = () => {
    if (!searchKeyword) {
      alert("검색어를 입력해주세요");
    } else {
      navigate(`/${currentMenu}`, {
        state: searchKeyword,
      });
      nameInput.current.blur();
    }
  };

  useEffect(() => {
    if (currentMenu === "search" || currentMenu === "addfriend") {
      nameInput.current.focus();
    }
    setSearchKeyword("");
  }, [searchPage, currentMenu]);

  if (
    location.pathname === "/welcome" ||
    location.pathname === "/login" ||
    location.pathname === "/signup"
  )
    return null;

  return (
    <HeaderWrap>
      <HeaderTitle>
        <Logo>
          {currentMenu === "" ? (
            <FaBookmark className="icon logo" />
          ) : (
            <MdArrowBackIosNew
              className="icon back"
              onClick={() =>
                currentMenu === "search" || currentMenu === "booklist"
                  ? navigate("/")
                  : navigate(-1)
              }
            />
          )}
        </Logo>
        <TitleBox>
          {currentMenu === "" && (
            <div className="titleContainer">
              <Title>내 기록</Title>
            </div>
          )}

          {currentMenu === "bookinfo" && <Title>도서정보</Title>}
          {currentMenu === "recording" && <Title>독서 기록하기</Title>}
        </TitleBox>
      </HeaderTitle>

      {searchPage && (
        <SearchBox>
          <input
            type="text"
            value={searchKeyword}
            onChange={handleInput}
            onKeyPress={handleOnKeyPress}
            placeholder={placeholderText()}
            ref={nameInput}
          />
        </SearchBox>
      )}
    </HeaderWrap>
  );
};

export default Header;

const HeaderWrap = styled.div`
  position: fixed;
  top: -1px;
  z-index: 9;
  width: inherit;
  max-width: inherit;
  padding: 15px 20px;
  background-color: ${(props) => props.theme.white};

  .icon {
    font-size: 25px;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  width: 20px;
  margin-right: 20px;

  .logo {
    color: ${(props) => props.theme.mainColor};
  }
`;

const TitleBox = styled.div`
  width: 100%;

  .titleContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const SearchBox = styled.div`
  padding: 20px 0 10px 0;

  input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: ${(props) => props.theme.gray200};
    vertical-align: text-top;

    &:focus {
      outline: none;
    }
  }
`;
const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
`;
