import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookApi } from '../../api/axios';
import BookInfoTop from '../../components/BookInfoTop';
import styled from 'styled-components';

const BookInfo = () => {
  const [bookInfo, setBookInfo] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const isbn = params.isbn;

  useEffect(() => {
    const getBookInfo = async () => {
      const book = await bookApi.info(isbn);
      setBookInfo(...book.data.item);
    };
    getBookInfo();
  }, [isbn]);

  return (
    <BookInfoWrap>

        
        {Object.keys(bookInfo).length !== 0 &&
        <Box>
          <BookInfoBox>
            <BookInfoTop bookInfo={bookInfo} />

            <InfoBottom>
              <Category><div>분류</div><div>{bookInfo.categoryName}</div></Category>
              <Description><div>책 소개</div><div>{bookInfo.description}</div></Description>
            </InfoBottom>

            
          </BookInfoBox>
          <div className="btn uploadBtn" onClick={() => navigate(`/recording/write/${isbn}`)}>독서 기록하기</div>
        </Box>
        }
      
    
    </BookInfoWrap>
  )
}

export default BookInfo;

const BookInfoWrap = styled.div`
  height: 100vh;
  padding: 80px 20px 20px 20px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const BookInfoBox = styled.div`
  padding: 10px 7px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
`;

const InfoBottom = styled.div`
  font-size: 0.9rem;
`;


const Category = styled.div`
  margin-bottom: 30px;
  div:first-child {
    margin-bottom: 10px;
  }
`;

const Description = styled.div`
  div:first-child {
    margin-bottom: 10px;
  }

  div:last-child {
    line-height: 20px;
  }
`;
