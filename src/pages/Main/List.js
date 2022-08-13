import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BsArrowUpCircleFill } from "react-icons/bs";
import styled from 'styled-components';
import { dbService } from '../../firebase';
import ListResult from '../../components/ListResult';

const List = ({bookList}) => {
  const [filterDataOrigin, setFilterDataOrigin] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const location = useLocation();
  const keyword = location.state;
  const pathname = location.pathname;

  useEffect(() => {
    if(pathname === '/list'){
      dbService.collection('book').get().then((querySnapshot) => {
        let productItems = [];
        querySnapshot.forEach((doc) => {
          productItems = [...productItems, { docId:doc.id, ...doc.data()} ]
        });
        setFilterDataOrigin(productItems);
      });
    }
    
  }, [pathname]);

  useEffect(() => {
    if(keyword !== null){
      const data = filterDataOrigin.filter(el => el.title.includes(keyword));
      setFilterData(data);
    }
  }, [keyword, filterDataOrigin]);

  const scrollToTop = () => {
    window.scrollTo({top: 0,behavior: "smooth"})
  }

  return (
    <ListWrap path={pathname === '/list'}>
      <ListResult bookList={bookList !== undefined ? bookList : filterData} />
      <BsArrowUpCircleFill className="topBtn" onClick={scrollToTop} />
    </ListWrap>
  )
}

export default List;

const ListWrap = styled.div`
  padding: ${props => props.path ? "80px" : "10px"} 20px 20px 20px;

  .topBtn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    font-size: 2rem;
    color: ${(props) => props.theme.mainColor};
  }
`;
