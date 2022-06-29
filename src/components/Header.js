import React, {useState, useRef, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBookmark } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import styled from 'styled-components';



const Header = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const currentMenu = location.pathname.split('/')[1];

  const nameInput = useRef();
  

  const handleInput = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
  }

  const handleOnKeyPress = (e) => {
    if(e.key === 'Enter') searchHandler()
  }

  const searchHandler = () => {
    if(!searchKeyword){
      alert('검색어를 입력해주세요')
    } else {
      navigate(currentMenu === 'search' ? '/search' : '/list', {state: searchKeyword});
      nameInput.current.blur();
    }
  }

  useEffect(() => {
    if(currentMenu === 'search' || currentMenu === 'list'){
      nameInput.current.focus();
    }
  }, [currentMenu]);


  return (

    <HeaderWrap>
    <Logo>{currentMenu === '' ? <FaBookmark className="icon logo" /> : <MdArrowBackIosNew className="icon back" onClick={() => currentMenu === 'search' || currentMenu ===  'list' ? navigate('/') : navigate(-1)} />}</Logo>
    <TitleBox>
      {currentMenu === '' && <SearchBox><Title>내 기록</Title><HiOutlineSearch className="icon search" onClick={() => navigate('/list')} /></SearchBox>}
      {(currentMenu === 'search' || currentMenu === 'list') && 
        <SearchBox>
          <input type="text" onChange={handleInput} onKeyPress={handleOnKeyPress} placeholder={currentMenu === 'search' ? '알라딘에서 검색' : '내 독서기록에서 검색'} ref={nameInput} />
          <HiOutlineSearch className="icon search" onClick={searchHandler} />
        </SearchBox>}
      {currentMenu === 'bookinfo' && <Title>도서정보</Title>}
      {currentMenu === 'recording' && <Title>독서 기록하기</Title>}
      {/* {currentMenu !== '' && currentMenu !== 'search' && currentMenu !== 'bookinfo' && currentMenu !== 'recording' && <Title>책 제목</Title>} */}
    </TitleBox>
  </HeaderWrap>
  )
}

export default Header;

const HeaderWrap = styled.div`
  display: flex;
  width: 100%;
  height: 55px;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  background-color: white;
  position: fixed;
  top: -1px;
  z-index: 9;

  .icon {
    font-size: 25px;
  }
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
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: 100%;
    height: 35px;
    margin-right: 15px;
    padding-left: 10px;
    border: none;
    border-radius: 10px;
    background-color: #eee;
    vertical-align:text-top;

    &:focus {
      outline: none
    }
  }
`;
const Title = styled.div`
  font-weight: 500;
`;
