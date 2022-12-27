import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import styled from "styled-components";

const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;

const YearlyChart = ({ users, yearBook, thisYear, remain }) => {
  const [yearlyData, setYearlyData] = useState([]);
  const [monthBook, setMonthBook] = useState(0);

  useEffect(() => {
    const isGoal = users.goal?.hasOwnProperty(thisYear);

    const data = [
      {
        name: "읽은책",
        value: isGoal ? yearBook.length : 0,
      },
      {
        name: "남은책",
        value: isGoal ? remain : 0,
      },
      !isGoal && { name: "값없음", value: 1 },
    ];

    setYearlyData(data);

    const monthdata = yearBook.filter(
      (el) => parseInt(el.endDate.slice(5, 7)) === month
    );
    setMonthBook(monthdata.length);
  }, [users, thisYear, yearBook, remain]);

  return (
    <Container>
      <PieChartCotnainer yearView={thisYear !== year}>
        <ResponsiveContainer
          width={thisYear === year ? "55%" : "80%"}
          height={thisYear === year ? 170 : 270}
        >
          <PieChart>
            <Pie
              data={yearlyData}
              cx="50%"
              cy="50%"
              dataKey="value"
              innerRadius="85%"
              outerRadius="100%"
            >
              {yearlyData?.map((entry, index) => {
                if (index === 1 || index === 2) {
                  return <Cell key={`cell-${index}`} fill="#f3f6f9" />;
                }
                return <Cell key={`cell-${index}`} fill="#666BDB" />;
              })}
              <Label
                value={yearBook.length}
                position="center"
                fill="#333"
                style={{
                  fontSize: "28px",
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {thisYear === year && (
          <div className="month">
            <div>{month}월</div>
            <div>
              <span>{monthBook}</span> 권
            </div>
          </div>
        )}
      </PieChartCotnainer>
    </Container>
  );
};

export default YearlyChart;

const Container = styled.div``;

const PieChartCotnainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.yearView ? "center" : "space-between")};
  align-items: center;
  padding: 40px 40px 0 20px;

  .month {
    text-align: center;

    div:last-child {
      margin-top: 30px;
    }

    span {
      font-size: 1.7rem;
    }
  }
`;
