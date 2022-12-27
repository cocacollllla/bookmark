import React from "react";
import styled from "styled-components";
import { authorSlice } from "../util/util";

const BookListCard = ({ book, clickHandler }) => {
  return (
    <Book onClick={() => clickHandler(book.isbn)}>
      <div className="bookCover">
        <img src={book.cover} alt="책 커버" />
      </div>
      <div className="bookTitleBox">
        <div className="title">{book.title}</div>
        <div className="author">{authorSlice(book.author)}</div>
      </div>
    </Book>
  );
};

export default BookListCard;

const Book = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 8px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;

  .bookCover {
    min-width: 55px;
    max-width: 55px;
    height: 78px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
    }
  }

  .bookTitleBox {
    padding-left: 15px;

    .title {
      margin-bottom: 8px;
      white-space: normal;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 21px;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .author {
      font-size: 0.9rem;
    }
  }
`;
