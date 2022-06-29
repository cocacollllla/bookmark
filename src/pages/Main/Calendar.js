import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Calendar = ({value, jumpToMonth, returnToday, handleClickDay, bookList}) => {
  const [calendar, setCalendar] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const startDay = value.clone().startOf('month').startOf('week');
    const endDay = value.clone().endOf('month').endOf('week');
  
    const day = startDay.clone().subtract(1, 'day');
    const a = [];
    while(day.isBefore(endDay, 'day')) {
      a.push(
        Array(7).fill(0).map(() => day.add(1, 'day').clone())
      )
    }
    setCalendar(a);

  }, [value]);

  function grayed(day) {
    return value.format('MM') !== day.format('MM')
  }

  function dayStyles(day) {
    if(grayed(day)) return 'grayed';
    return ''
  }

  const endDayCover = (day, bookList) => {
    const list = bookList.filter(el => el.endDate === day.format('YYYY.MM.DD'));
   
    if(list.length > 0){
      return (
        <div className="imgDay" onClick={() => navigate(`/view/${list[0].docId}`)}>
          <img src={list[0].cover} alt="" />
        </div>
      )
    }
  }



  return (
    <CalendarWrap>
      <ControlBtn>
        <button onClick={() => jumpToMonth(0)}>
          <MdArrowBackIos />
        </button>
        <YearMonth onClick={returnToday}>{value.format('YYYY년 M월')}</YearMonth>
        <button onClick={() => jumpToMonth(1)}>
          <MdArrowForwardIos />
        </button>
      </ControlBtn>
      <Dayweek>
        {['일', '월', '화', '수', '목', '금', '토'].map((el) => (
          <div key={el}>
            <span>{el}</span>
          </div>
        ))}
      </Dayweek>
      <div>
        {calendar.map(week => 
          <Week key={week}>
          {week.map(day => 
            <Day key={day} onClick={() => handleClickDay(day)}>
              <div className={dayStyles(day)} id="day">
                <span>{day.format('D').toString()}</span>
                {endDayCover(day, bookList)}
              </div>
            </Day>)}
          </Week>)}
      </div>
    </CalendarWrap>
  )
}

export default Calendar;

const CalendarWrap = styled.div`
  
  margin: 10px auto 30px auto;
`;

const Dayweek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: .7rem;
  div {
    padding: 1rem 0;
    &:first-of-type span{
      color: #f54842;
    }
    &:last-of-type span{
      color: #2b63bd;
    }
  }
`;

const ControlBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    padding: 1rem;
    border: 0;
    background: transparent;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const YearMonth = styled.div`
  font-weight: 500;
  text-align: center;
  cursor:  pointer;
`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-top: 1px solid #eee;

  &:last-child {
    border-bottom: 1px solid #eee;
  }
`;

const Day = styled.div`
  text-align: center;
  cursor: pointer;
  border-right: 1px solid #eee;
  &:nth-of-type(7n) {
    border-right: none;

    span{
      color: #2b63bd;
    }
  }

  &:nth-of-type(8n+1) span {
    color: #f54842;
  }
  #day {
    min-height: 85px;
    padding: 3px 10px;

    span {
      font-size: 0.7rem;
    }
  }
  
  .grayed span{
    color: #c9c9c9;
  }

  .imgDay {
    width: 100%;

    img {
      width: 100%;
      margin-top: 5px;
    }
  }


`;