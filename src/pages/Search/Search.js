import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Target from "./Target";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { bookApi } from "../../api/axios";
import styled from "styled-components";
import Loading from "../../components/Loading";
import BookListCard from "../../components/BookListCard";

const Search = () => {
  const [searchResultList, setSearchResultList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResult, setTotalResult] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const keyword = location.state;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await bookApi.search(keyword, page);
      if (page === 1) {
        setSearchResultList(result.data.item);
        window.scrollTo(0, 0);
      } else {
        setSearchResultList((prev) => [...prev, ...result.data.item]);
      }
      setTotalResult(result.data.totalResults);
      setLoading(false);
    };

    if (keyword !== null) {
      getData();
    }
  }, [page, keyword]);

  useEffect(() => {
    setPage(1);
    setTotalResult(null);
    setSearchResultList([]);
  }, [keyword]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bookInfoClickHandler = (id) => {
    navigate(`/bookinfo/${id}`);
  };

  return (
    <>
      {page === 1 && loading ? (
        <Loading />
      ) : (
        <SearchWrap>
          <BookList>
            {searchResultList !== undefined &&
              searchResultList.map((book) => (
                <BookListCard
                  key={book.isbn}
                  book={book}
                  clickHandler={bookInfoClickHandler}
                />
              ))}
            {page >= 2 && (
              <BsArrowUpCircleFill className="topBtn" onClick={scrollToTop} />
            )}
          </BookList>
          {searchResultList !== undefined &&
            totalResult !== searchResultList.length &&
            searchResultList.length !== 0 && (
              <Target loading={loading} setPage={setPage} />
            )}
        </SearchWrap>
      )}
    </>
  );
};

export default Search;

const SearchWrap = styled.div`
  padding: 50px 0 10px 0;
`;

const BookList = styled.div`
  height: ${(props) => (props.keyword ? "100vh" : "auto")};
  margin-top: 10px;
  .topBtn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    font-size: 2rem;
    color: ${(props) => props.theme.mainColor};
  }
`;
