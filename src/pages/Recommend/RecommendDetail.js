import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { userProfileUpdate } from "../../api/axios";
import HeaderRight from "../../components/HeaderRight";
import { usersActions } from "../../store/users/users-slice";

const RecommendDetail = () => {
  const users = useSelector((state) => state.users);
  const location = useLocation();
  const obj = location.state;
  const [heart, setHeart] = useState(false);

  const dispatch = useDispatch();
  const isMyRecommend = obj.uid === users.uid;

  useEffect(() => {
    const isHeart = users.favorite.find((el) => el.id === obj.id);
    isHeart ? setHeart(true) : setHeart(false);
  }, [users, obj]);

  const deleteRecommend = () => {};

  const heartHandler = async () => {
    const favArr = {
      id: obj.card.id,
      title: obj.card.title,
      author: obj.card.author,
      cover: obj.card.cover,
    };

    if (heart) {
      const filterObj = users.favorite.filter((el) => el.id !== obj.card.id);
      await userProfileUpdate(users.uid, { favorite: filterObj });
      dispatch(usersActions.favoriteF(obj.card.id));
    } else {
      const copyArr = [...users.favorite, favArr];
      await userProfileUpdate(users.uid, { favorite: copyArr });
      dispatch(usersActions.favoriteT(favArr));
    }
  };

  return (
    <Container>
      {!isMyRecommend && (
        <p>
          <span>{obj.userInfo.name}</span> 님이 책을 추천하셨습니다.
        </p>
      )}

      <BookImage>
        <img src={obj.card.cover} alt="책 커버" />
        <div className="title">{obj.card.title}</div>
        <div className="author">{obj.card.author}</div>
      </BookImage>
      <div className="review">" {obj.card.content} "</div>

      <div>
        {obj.card.bookmark?.map((bmk) => (
          <BookmarkCard key={bmk.id}>
            {bmk.text && <div className="content">{bmk.text}</div>}
            {bmk.image && <img src={bmk.image} alt="북마크 이미지" />}
            {bmk.page && <div className="page">p {bmk.page}</div>}
          </BookmarkCard>
        ))}
      </div>
      {isMyRecommend && <HeaderRight del onDelete={deleteRecommend} />}
      {!isMyRecommend && (
        <HeaderRight heart={heart} heartIcon onHeart={heartHandler} />
      )}
    </Container>
  );
};

export default RecommendDetail;

const Container = styled.div`
  font-size: 0.9rem;

  p {
    padding: 20px 0 30px 0;
    text-align: center;

    span {
      font-weight: 500;
    }
  }

  .review {
    padding: 30px 20px;
    line-height: 22px;
    text-align: center;
  }
`;

const BookImage = styled.div`
  text-align: center;

  img {
    width: 100px;
  }

  .title {
    padding-top: 20px;
    font-weight: 500;
  }

  .author {
    padding-top: 10px;
  }
`;

const BookmarkCard = styled.div`
  padding: 1rem;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.gray200};

  .content {
    line-height: 22px;
    white-space: pre-line;
  }

  img {
    width: 100%;
  }

  .page {
    padding-top: 10px;
    text-align: right;
  }
`;
