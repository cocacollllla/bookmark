import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
      // getData();
      dbService.collection('test').get().then((querySnapshot) => {
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

      const test = filterDataOrigin.filter(el => el.title.includes(keyword));
      setFilterData(test);
    }
    
  }, [keyword, filterDataOrigin]);


  return (
    <ListWrap path={pathname === '/list'}>
      <ListResult bookList={bookList !== undefined ? bookList : filterData} />
    </ListWrap>
  )
}

export default List;

const ListWrap = styled.div`
  padding: ${props => props.path ? "80px" : "10px"} 20px 20px 20px;
`;
