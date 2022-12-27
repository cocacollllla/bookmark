import React from "react";
import { authorSlice } from "../util/util";
import styled from "styled-components";

const BookInfoTop = ({ bookInfo, children }) => {
  return (
    <InfoTop>
      <Cover>
        <img src={bookInfo.cover} alt="도서 커버" />
      </Cover>
      <TitleBox>
        <div className="top">
          <Title>{bookInfo.title}</Title>
          <Author>
            <span>지은이</span>
            <span>
              {Object.keys(bookInfo).length !== 0 &&
                authorSlice(bookInfo.author)}
            </span>
          </Author>
          <Author>
            <span>출판사</span>
            <span>{bookInfo.publisher}</span>
          </Author>
        </div>
        <div className="starRating">{children}</div>
      </TitleBox>
    </InfoTop>
  );
};

export default BookInfoTop;

const InfoTop = styled.div`
  width: 100%;
  min-height: 100px;
  margin-bottom: 20px;
  display: flex;
`;

const Cover = styled.div`
  width: 30%;

  img {
    width: 100%;
  }
`;

const TitleBox = styled.div`
  width: 100%;
  min-height: 150px;
  padding: 5px 10px 0 20px;
  font-size: 0.9rem;

  .starRating {
    margin-top: 10px;
  }
`;

const Title = styled.div`
  font-weight: 500;
  padding-bottom: 20px;
  line-height: 20px;
  font-size: 1rem;
`;

const Author = styled.div`
  margin-bottom: 10px;

  span:first-child {
    margin-right: 10px;
  }
`;
