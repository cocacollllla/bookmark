import React, {useState, useEffect} from 'react';
import { useLocation} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Search = () => {
  const [searchResultList, setSearchResultList] = useState([]);
  const location = useLocation();
  const keyword = location.state;


  useEffect(() => {

    const getData = async () => {
      const result = await axios.get(`/ttb/api/ItemSearch.aspx?ttbkey=${process.env.REACT_APP_TTB_KEY}&Query=${keyword}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`);
      setSearchResultList(result.data.item);
    }

    if(keyword !== null){
      getData();
    }

  }, [keyword]);

  console.log(searchResultList);


  return (
    <SearchWrap>
      
    </SearchWrap>
  )
}

export default Search;

const SearchWrap = styled.div`
  padding: 80px 20px;
`;

