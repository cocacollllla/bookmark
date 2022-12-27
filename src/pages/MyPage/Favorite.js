import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userProfileUpdate } from "../../api/axios";
import { usersActions } from "../../store/users/users-slice";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

const Favorite = () => {
  const users = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bookInfoClickHandler = (id) => {
    navigate(`/bookinfo/${id}`);
  };

  const deleteHeart = async (id) => {
    const filterObj = users.favorite.filter((el) => el.id !== id);
    await userProfileUpdate(users.uid, { favorite: filterObj });
    dispatch(usersActions.favoriteF(id));
  };

  return (
    <div>
      {users.favorite.length !== 0 ? (
        users.favorite.map((fav) => (
          <BookCard key={fav.id}>
            <div className="bookCover">
              <img src={fav.cover} alt="책 커버" />
            </div>
            <div
              className="bookTitle"
              onClick={() => bookInfoClickHandler(fav.id)}
            >
              <div className="title">{fav.title}</div>
              <div>{fav.author}</div>
            </div>
            <div className="del" onClick={() => deleteHeart(fav.id)}>
              <MdClose className="deleteIcon" />
            </div>
          </BookCard>
        ))
      ) : (
        <NoData>
          <p>찜한 도서가 없습니다.</p>
        </NoData>
      )}
    </div>
  );
};

export default Favorite;

const BookCard = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 6px;

  .bookCover {
    max-width: 50px;

    img {
      width: 100%;
    }
  }

  .bookTitle {
    padding-left: 10px;
    font-size: 0.9rem;

    .title {
      padding-bottom: 10px;
      font-weight: 500;
    }
  }

  .del {
    margin-left: auto;
    color: ${(props) => props.theme.accentColor};
  }
`;

const NoData = styled.div`
  padding: 50px 0;
  text-align: center;
  font-size: 0.9rem;
`;
