import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authorSlice } from '../util/util';

const ListResult = ({bookList}) => {
  const [bookData, setBookData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  useEffect(() => {
    if(pathname !== '/search') {
      const addDate = bookList.map(el => {
        const str = el.endDate.slice(0, 7);
        return {...el, date: str};
      });

      const groupValues = addDate.reduce((acc, current) => {
        acc[current.date] = acc[current.date] || [];
        acc[current.date].push(current);
        return acc;
      }, {});
    
      const groups = Object.keys(groupValues).map((key) => {
        return { date: key, list: groupValues[key] };
      }); 

      const sortedList = groups.sort((a, b) => new Date(b.date) - new Date(a.date));
      setBookData(sortedList);
    }

  }, [bookList, pathname]);

  return (
    <>
    {pathname === '/search' ? (
      bookList.map(book => (
        <Book key={book.isbn13} onClick={() => navigate(`/bookinfo/${book.isbn13}`)}>
          <BookCover><img src={book.cover} alt="" /></BookCover>
          <BookTitle>
            <div>{book.title}</div>
            <div>{authorSlice(book.author)}</div>
          </BookTitle>
        </Book>
      ))
    ) : (
      bookData.map((book, idx) => (
        <BookBox key={idx}>
          <div className="bookDate">{book.date}</div>
          {book.list.map(el => (
            <Book key={el.isbn13} onClick={() => navigate(`/view/${el.id}`)}>
              <BookCover><img src={el.cover} alt="" /></BookCover>
              <BookTitle>
                <div>{el.title}</div>
                <div>{authorSlice(el.author)}</div>
              </BookTitle>
            </Book>
          ))}
        </BookBox>
      ))
    )}
    </>
  )
}

export default ListResult;


const Book = styled.div`
  display: flex;
  align-items: center;
  min-height: 130px;
  padding: 7px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  margin-bottom: 10px;
`;

const BookCover = styled.div`
  width: 20%;

  img {
    width: 100%;
  }
`;

const BookTitle = styled.div`
  max-width: 80%;
  padding: 0 20px;

  div {
    font-size: 0.9rem;
  }

  div:first-child {
    margin-bottom: 10px;
    font-weight: 500;
    line-height: 20px;
  }
`;

const BookBox = styled.div`
  margin-bottom: 40px;

  .bookDate {
    padding: 15px 0;
    font-size: 1.1rem;
    font-weight: 500
  }
`;