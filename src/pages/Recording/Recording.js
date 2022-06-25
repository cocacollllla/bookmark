import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookApi } from '../../api/axios';
import BookInfoTop from '../../components/BookInfoTop';
import Loading from '../../components/Loading';
import { AiFillStar } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";
import DatePicker from "react-datepicker";
import styled from 'styled-components';
import Bookmark from './Bookmark';
import { dbService, storageService } from '../../firebase';
import moment from 'moment';

const Recording = () => {
  const [bookInfo, setBookInfo] = useState({});
  const [bookmark, setBookmark] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const isbn = params.isbn;

  const useList = {
    image: '',
    text: '',
    page: '',
    string: true,
    id: 0
  };

  useEffect(() => {
    setLoading(true);
    const getBookInfo = async () => {
      const book = await bookApi.info(isbn);
      const defaultData = book.data.item[0];
      setBookInfo({title: defaultData.title, author: defaultData.author, cover: defaultData.cover, isbn13: defaultData.isbn13, publisher: defaultData.publisher, star: null, memo: '', startDate: new Date(), endDate: new Date(), creationData: null});
      console.log('지금');
      setLoading(false);
    };
    getBookInfo();

  }, [isbn]);


  useEffect(() => {
    setBookmark([{...useList}]);
  }, [])

  const addToList = () => {
    const copyData = {...useList};

    copyData.id = bookmark.length;
    setBookmark(bookmark.concat(copyData));

  }

  const handleChangeBookmark = (e, id) => {
    const { value, name } = e.target;

    const idx = bookmark.findIndex(el => el.id === id);
    const copyData = [...bookmark];
    copyData[idx] = {...copyData[idx], [name]: value};
    setBookmark(copyData);

  }

  const handleChangeInfo = (e) => {
    const { value, name } = e.target;
   
      setBookInfo({...bookInfo, [name]: value})
 
    
  }

  const trans = (id, string) => {
  
    const idx = bookmark.findIndex(el => el.id === id);
    const copyData = [...bookmark];
    let obj = copyData[idx];

    if(obj.text !== '' || obj.image !== ''){
      const ok = window.confirm('작성한 데이터가 초기화 됩니다. 바꾸시겠습니까?');
      if(ok) {
        obj.string ? obj.text = '' : obj.image = '' ;
      }
    }
    copyData[idx] = {...obj, string: !string};
    setBookmark(copyData);
    
  }

  const onFileChange = (e, id) => {
   
    const idx = bookmark.findIndex(el => el.id === id);

    const copyData = [...bookmark];
    const imgFile = e.target.files[0];

    const reader = new FileReader(); 
    reader.onloadend = (finishedEvent) => {
      const result = finishedEvent.currentTarget.result;
      copyData[idx] = {...copyData[idx], image : result};
      setBookmark(copyData);
    }
    reader.readAsDataURL(imgFile); 

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const copyData = [...bookmark];
    try{
      const please = copyData.map(async el => {
        if(el.image !== ''){
          let photoURL = null;
          if(!el.image.includes('https')){
            let loloca = storageService.ref();
            let nameT = Math.random();
            let please = await loloca.child(`test/${nameT}`).putString(el.image, 'data_url');
            photoURL = await please.ref.getDownloadURL();
            el.image = photoURL;
          }
          
        }
          return el;
      });
      const numFruits = await Promise.all(please);
      const filterObj = numFruits.filter(el => (el.text !== '' || el.image !== '') && el.page !== '');

      const objobj = {
        ...bookInfo, 
        id: isbn,
        creationData: bookInfo.creationData === null ? moment().format('YYYYMMDD') : bookInfo.creationData,
        startDate: typeof bookInfo.startDate === 'string' ? bookInfo.startDate : moment(bookInfo.startDate).format('YYYY.MM.DD') ,
        endDate: typeof bookInfo.endDate === 'string' ? bookInfo.endDate : moment(bookInfo.endDate).format('YYYY.MM.DD') ,
        bookmark: filterObj
      }

      await dbService.collection("test").doc(isbn).set(objobj);
      setLoading(false);
      alert('저장 되었습니다.');
      navigate(`/`);

    } catch(err) {
      console.log(err);
    }  
  }

 console.log(bookInfo);

  return (
    <RecordingWrap>
      {loading ? (
        <Loading full={true} />
      ) : (
        <>
        {Object.keys(bookInfo).length !== 0 &&
        <>
          <RecordingBox>
            <BookInfoTop bookInfo={bookInfo}>
              <StarRating>      
                {[1,2,3,4,5].map(el => (
                  <div key={el} className={bookInfo.star >= el ? 'onStar' : ''} onClick={() => setBookInfo({...bookInfo, star: el})}><AiFillStar /></div>
                ))}
              </StarRating>
            </BookInfoTop>

            <Write>
              <div>
                <CateTitle>독서날짜</CateTitle>
                <DateBox>
                  <div className="pickDate">
                    <FiCalendar className="calendarIcon" />
                    <DatePicker selected={typeof bookInfo.startDate === 'string' ? new Date(bookInfo.startDate) : bookInfo.startDate} dateFormat="yyyy-MM-dd" onChange={(date) => setBookInfo({...bookInfo, startDate: date})} />
                  </div>
                  <div className="pickDate">
                    <FiCalendar className="calendarIcon" />
                    <DatePicker selected={typeof bookInfo.endDate === 'string' ? new Date(bookInfo.endDate) : bookInfo.endDate} dateFormat="yyyy-MM-dd" onChange={(date) => setBookInfo({...bookInfo, endDate: date})} />
                  </div>
                </DateBox>
              </div>

              <MemoWrap>
                <CateTitle>메모</CateTitle>
                <textarea name="memo" onChange={handleChangeInfo} value={bookInfo.memo}></textarea>
              </MemoWrap>
            </Write>

            <Bookmark bookmark={bookmark} trans={trans} addToList={addToList} handleChange={handleChangeBookmark} onFileChange={onFileChange} />
          </RecordingBox>   
          <div className="btn uploadBtn" onClick={onSubmit}>독서 기록하기</div>
        </>
        }
      </>
      )
}
    </RecordingWrap>
  )
}

export default Recording;

const RecordingWrap = styled.div`
  padding: 80px 20px 20px 20px;
`;

const RecordingBox = styled.div`
  padding: 10px 7px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
`;

const Write = styled.div`
  
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


const DateBox = styled.div`
  display: flex;
  align-items: center;

  .pickDate {
    width: 150px;
    display: flex;
    align-items: center;

    &:last-child:before {
      content: "ㅡ";
      padding: 0 15px;
      color: #666;
    }
  }

  .calendarIcon {
    margin-right: 5px;
    color: #666;
    font-size: 1.2rem;
  }

  span {
    padding: 0 10px;
    color: #666
  }
`;

const MemoWrap = styled.div`
  margin-top: 20px;

  textarea {
    width: 100%;
    height: 100px;
    padding: .5rem;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.borderColor};
    resize: none;

    &:focus {
      outline: none
    }
  }
`;