import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsFillCaretDownFill } from "react-icons/bs";

import styled from "styled-components";
import BottomSheetModal from "../../components/BottomSheetModal";
import YearlyChart from "./YearlyChart";
import { useNavigate } from "react-router-dom";
import { getBookListData } from "../../api/axios";
import MonthlyChart from "./MonthlyChart";

const maxOffset = 100;
const year = new Date().getFullYear();
const years = Array.from(new Array(maxOffset), (val, index) => year - index);

const Chart = () => {
  const users = useSelector((state) => state.users);

  const [onModal, setOnModal] = useState(false);
  const [thisYear, setThisYear] = useState(new Date().getFullYear());
  const [books, setBooks] = useState([]);
  const [remain, setRemain] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      const bookList = await getBookListData(users.uid);
      const yearBook = bookList.filter(
        (book) => parseInt(book.endDate.slice(0, 4)) === thisYear
      );
      setBooks(yearBook);

      if (users.goal?.hasOwnProperty(thisYear)) {
        const rem = users.goal[thisYear] - yearBook.length;
        if (rem > 0) setRemain(rem);
      }
    };
    getList();
  }, [users, thisYear]);

  const isGoal = users.goal?.hasOwnProperty(thisYear);

  const onModalHandler = () => {
    setOnModal(true);
  };

  const onChangeYear = (year) => {
    setThisYear(year);
    setOnModal(false);
  };

  return (
    <Container>
      <div className="thisYear" onClick={onModalHandler}>
        {thisYear}
        <BsFillCaretDownFill size={14} />
      </div>

      <YearlyChart
        users={users}
        yearBook={books}
        thisYear={thisYear}
        remain={remain}
      />

      <MonthlyChart yearBook={books} />

      {thisYear === year && !isGoal && (
        <GoalContainer>
          <p>{thisYear} 독서 목표 권 수를 정해주세요.</p>
          <div onClick={() => navigate("/setgoals")}>
            독서 목표 권 수 정하기
          </div>
        </GoalContainer>
      )}

      {thisYear === year && isGoal && users.goal[thisYear] > books.length && (
        <GoalContainer>
          <p>
            {thisYear} 독서 목표 권 수까지 <span>{remain}</span> 권 남았습니다.
          </p>
        </GoalContainer>
      )}

      {isGoal && users.goal[thisYear] <= books.length && (
        <GoalContainer>
          <p>{thisYear} 독서 목표 권 수를 달성하셨습니다!</p>
        </GoalContainer>
      )}

      {thisYear !== year && isGoal && users.goal[thisYear] > books.length && (
        <GoalContainer>
          <p>{thisYear} 독서 목표 권 수를 달성하지 못하셨습니다.</p>
        </GoalContainer>
      )}

      <BottomSheetModal
        isModalOpen={onModal}
        closeModal={() => setOnModal(false)}
      >
        <BottomSheetInner>
          {years.map((el) => (
            <div key={el} onClick={() => onChangeYear(el)}>
              {el}
            </div>
          ))}
        </BottomSheetInner>
      </BottomSheetModal>
    </Container>
  );
};

export default Chart;

const Container = styled.div`
  .thisYear {
    text-align: center;
  }
`;

const GoalContainer = styled.div`
  margin-top: 50px;
  font-size: 0.9rem;
  text-align: center;

  div {
    margin: 20px 0;
    padding: 10px;
    background-color: ${(props) => props.theme.mainColor};
    border-radius: 8px;
    color: ${(props) => props.theme.white};
    font-weight: 500;
  }

  span {
    font-size: 1rem;
    color: ${(props) => props.theme.mainColor};
    font-weight: 500;
  }
`;

const BottomSheetInner = styled.div`
  padding: 10px;
  height: 150px;
  overflow: auto;

  div {
    padding: 15px 0;
    text-align: center;
  }
`;
