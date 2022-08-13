import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookInfoTop from '../../components/BookInfoTop';
import Loading from '../../components/Loading';
import styled from 'styled-components';
import { dbService } from '../../firebase';
import { AiFillStar } from "react-icons/ai";

const View = () => {
  const [bookInfo, setBookInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();

  const id = params.id;

  useEffect(() => {
    setLoading(true);
    dbService.collection('book').doc(id).get().then((doc) => {
      setBookInfo(doc.data());
      setLoading(false);
    });
    window.scrollTo({top: 0})
  }, [id]);


  const deleteBook = () => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if(ok){
      setLoading(true);
      dbService.collection('book').doc(id).delete();
      setLoading(false);
      navigate(`/`);
    }
    
  }

  return (
    <ViewWrap>
      {loading ? <Loading full={true} /> : 
        <BookInfoBox>
        <BookInfoTop bookInfo={bookInfo}>
          <StarRating>      
            {[1,2,3,4,5].map(el => (
              <div key={el} className={bookInfo.star >= el ? 'onStar' : ''}><AiFillStar /></div>
            ))}
          </StarRating>
        </BookInfoTop>
        <InfoBottom>
          <Category>
            <CateTitle>독서날짜</CateTitle>
            <DateBox>
              <div>{bookInfo.startDate}</div>
              <div className="endDay">{bookInfo.endDate}</div>
            </DateBox>
          </Category>
          <MemoBox>
            <CateTitle>메모</CateTitle>
            <Memo>{bookInfo.memo}</Memo>
          </MemoBox>

          {bookInfo.bookmark.length !== 0 && 
            <div>
              <CateTitle>책갈피</CateTitle>
              {bookInfo.bookmark && bookInfo.bookmark.map(el => (
                <BookMarkBox key={el.id}>
                  {el.string ? <div>{el.text}</div> : <div><img src={el.image} alt="" /></div>}
                  <Page>p. {el.page}</Page>
                </BookMarkBox>
              ))}
              
            </div>
          }
        </InfoBottom>

        
      </BookInfoBox>
      }
        
        
        
          
          <div className="btn uploadBtn" onClick={() => navigate(`/recording/edit/${id}`)}>수정</div>
          <div className="btn deleteBtn" onClick={deleteBook}>삭제</div>
        
        
      
    
    </ViewWrap>
  )
}

export default View;

const ViewWrap = styled.div`
  padding: 80px 20px 20px 20px;
`;


const StarRating = styled.div`
  display: flex;
  margin-top: 10px;

  div {
    font-size: 1.5rem;
    color: #ddd;
  }

  .onStar {
    color: #FFE269
  }

`;

const CateTitle = styled.div`
  margin-bottom: 15px;
  font-size: 0.9rem;
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

  
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }


  .endDay:before {
    content:'ㅡ';
    padding: 0 15px;
    color: #666;
  }
`;

const MemoBox = styled.div`
  margin-bottom: 30px;
`;

const Memo = styled.div`
  padding: 15px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  white-space: pre-wrap;
  line-height: 20px;
`;

const BookMarkBox = styled.div`
  padding: 15px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
  white-space: pre-wrap;
  line-height: 20px;

  &:last-child {
    margin-bottom: 0
  }
  

  img {
    width: 100%;
  }
`;

const Page = styled.div`
  margin-top: 20px;
  text-align: right;
`;
