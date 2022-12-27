import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookListData } from "../../api/axios";
import moment from "moment";
import styled from "styled-components";
import Calendar from "./Calendar";
import Bottom from "../../components/Bottom";

const getMonth = () => {
  const mm = window.sessionStorage.getItem("currentMonth");
  if (mm === null) {
    return moment();
  } else {
    return moment(mm, "MM-YYYY");
  }
};

const Home = () => {
  const [value, setValue] = useState(() => getMonth());
  const [bookList, setBookList] = useState(null);
  const users = useSelector((state) => state.users);

  const returnToday = () => setValue(moment());
  const handleClickDay = (day) => setValue(day);
  const jumpToMonth = (num) =>
    num
      ? setValue(value.clone().add(1, "month"))
      : setValue(value.clone().subtract(1, "month"));

  useEffect(() => {
    const getList = async () => {
      if (users?.uid) {
        const bookList = await getBookListData(users.uid);
        setBookList(bookList);
      }
    };
    getList();
  }, [users]);

  useEffect(() => {
    window.sessionStorage.setItem("currentMonth", value.format("MM-YYYY"));
  }, [value]);

  return (
    <Container>
      <Calendar
        returnToday={returnToday}
        jumpToMonth={jumpToMonth}
        handleClickDay={handleClickDay}
        value={value}
        bookList={bookList}
      />
      <Bottom />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
`;
