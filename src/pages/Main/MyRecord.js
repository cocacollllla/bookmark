import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPlusCircleFill } from "react-icons/bs";
import { FiCalendar, FiList } from "react-icons/fi";
import styled from 'styled-components';
import Calendar from './Calendar';
import moment from 'moment';
import { dbService } from '../../firebase';
import List from './List';

const getMonth = () => {
  const mm = window.sessionStorage.getItem('currentMonth');
  if(mm === null){
    return moment()
  } else {
    return moment(mm, "MM-YYYY");
  }
}

const MyRecord = () => {
  const [value, setValue] = useState(() => getMonth());
  const [bookList, setBookList] = useState([]);
  const [tab, setTab] = useState(() => { return Number(window.sessionStorage.getItem('view')) || 0});

  const returnToday = () => setValue(moment());
  const handleClickDay = (day) => setValue(day);
  const jumpToMonth = (num) => (num ? setValue(value.clone().add(1, 'month')) : setValue(value.clone().subtract(1, 'month')));
  
  const navigate = useNavigate();

  useEffect(() => {
    

    dbService.collection('book').get().then((querySnapshot) => {
      let productItems = [];
      querySnapshot.forEach((doc) => {
        productItems = [...productItems, { docId:doc.id, ...doc.data()} ]
      });
      setBookList(productItems);
    });
  }, []);



  useEffect(() => {
    window.sessionStorage.setItem("view", tab);
  }, [tab]);

  useEffect(() => {
    window.sessionStorage.setItem("currentMonth", value.format('MM-YYYY'));
  }, [value])

  const clickTab = (el) => {
    setTab(el);
  }


  return (
    <MyRecordWrap>
      <ViewIcon>
        <div onClick={() => clickTab(0)}><FiCalendar className="icon" /></div>
        <div onClick={() => clickTab(1)}><FiList className="icon" /></div>
      </ViewIcon>
      {tab === 0 ? (
        <>
          <Calendar returnToday={returnToday} jumpToMonth={jumpToMonth} handleClickDay={handleClickDay} value={value} bookList={bookList} />
          <AddBook onClick={() => navigate('/search')}><BsPlusCircleFill className="addBook" /></AddBook>
        </>
      ) : (
        <List bookList={bookList} />
      )}
      

    </MyRecordWrap>
    
  )
}

export default MyRecord;

const MyRecordWrap = styled.div`
  padding-top: 80px;
`;


const ViewIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;

  div:first-child {
    margin-right: 10px;

    .icon {
      font-size: 1.1rem
    }
  }

  .icon {
    color: #666;
    font-size: 1.2rem;
  }
`;

const AddBook = styled.div`
  margin-top: 0;
  text-align: center;
  
  .addBook {
    font-size: 3rem;
    color: ${(props) => props.theme.mainColor};
  }
`;