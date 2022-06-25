import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import Loading from '../../components/Loading';
import Target from './Target';
import { bookApi } from '../../api/axios';
import styled from 'styled-components';
import ListResult from '../../components/ListResult';

const Search = () => {
  const [searchResultList, setSearchResultList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [totalResult, setTotalResult] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const keyword = location.state;

  

  useEffect(() => {

    const getData = async () => {
   
      setLoading(true);
      const result = await bookApi.search(keyword, page);
      if(page === 1){
        setSearchResultList(result.data.item);
        window.scrollTo(0, 0);
      } else {
        setSearchResultList(prev => [...prev, ...result.data.item]);
      }
      setTotalResult(result.data.totalResults);
      setLoading(false);
    }


    if(totalResult !== searchResultList.length) {
      if(keyword !== null){
        getData();
        console.log(keyword);
      }
    }

  }, [page, keyword])

  useEffect(() => {
    setPage(1);
    setTotalResult(null);
  }, [keyword]);



  console.log(page);

  return (
    <SearchWrap>
      {page === 1 && loading ? (
        <Loading full={true} />
      ) : (
        <>
          <BookList keyword={keyword === null || searchResultList.length === 0}>
            <ListResult bookList={searchResultList} />
          </BookList>
          <Target loading={loading} setPage={setPage} />
        </>
      )
      }  
    </SearchWrap>
  )
}

export default Search;

const SearchWrap = styled.div`
  padding: 80px 20px;
`;

const BookList = styled.div`
  height: ${props => props.keyword ? "100vh" : "auto"};
`;

