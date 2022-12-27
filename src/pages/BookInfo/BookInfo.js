import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookApi, getBook, userProfileUpdate } from "../../api/axios";
import BookInfoTop from "../../components/BookInfoTop";

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import HeaderRight from "../../components/HeaderRight";
import { usersActions } from "../../store/users/users-slice";
import Loading from "../../components/Loading";

const BookInfo = () => {
  const [bookInfo, setBookInfo] = useState({});
  const [myBook, setMyBook] = useState(null);
  const [heart, setHeart] = useState(false);
  const [loading, setLoading] = useState(true);
  const users = useSelector((state) => state.users);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = params.id;

  useEffect(() => {
    const getBookInfo = async () => {
      const book = await bookApi.info(id);
      const mybook = await getBook(users.uid, id);
      setBookInfo(...book.data.item);
      setMyBook(mybook);
      setLoading(false);
    };
    getBookInfo();
  }, [id, users]);

  useEffect(() => {
    if (Object.keys(bookInfo).length !== 0) {
      const isHeart = users.favorite.find((el) => el.id === bookInfo.isbn);

      isHeart ? setHeart(true) : setHeart(false);
    }
  }, [users, bookInfo]);

  const heartHandler = async () => {
    const favArr = {
      id: bookInfo.isbn,
      title: bookInfo.title,
      author: bookInfo.author,
      cover: bookInfo.cover,
    };
    if (heart) {
      const filterObj = users.favorite.filter((el) => el.id !== bookInfo.isbn);
      await userProfileUpdate(users.uid, { favorite: filterObj });
      dispatch(usersActions.favoriteF(bookInfo.isbn));
    } else {
      const copyArr = [...users.favorite, favArr];
      await userProfileUpdate(users.uid, { favorite: copyArr });
      dispatch(usersActions.favoriteT(favArr));
    }
  };

  const bookInfoObj = {
    author: bookInfo.author,
    title: bookInfo.title,
    cover: bookInfo.cover,
    publisher: bookInfo.publisher,
    id: bookInfo.id,
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <BookInfoWrap>
      {Object.keys(bookInfo).length !== 0 && (
        <Box>
          <BookInfoBox>
            <BookInfoTop bookInfo={bookInfoObj} />

            <InfoBottom>
              <Category>
                <div>분류</div>
                <div>{bookInfo.categoryName}</div>
              </Category>
              <Description>
                <div>책 소개</div>
                <div>{bookInfo.description}</div>
              </Description>
            </InfoBottom>
          </BookInfoBox>
          <div
            className="btn uploadBtn"
            onClick={() =>
              myBook.length !== 0
                ? navigate(`/view/${myBook[0].docId}`)
                : navigate(`/write/${id}`, {
                    state: {
                      bookInfo: {
                        id,
                        author: bookInfo.author,
                        cover: bookInfo.cover,
                        title: bookInfo.title,
                        publisher: bookInfo.publisher,
                      },
                    },
                  })
            }
          >
            {myBook.length !== 0 ? "내 기록 보기" : "독서 기록하기"}
          </div>
        </Box>
      )}

      <HeaderRight heart={heart} heartIcon onHeart={heartHandler} />
    </BookInfoWrap>
  );
};

export default BookInfo;

const BookInfoWrap = styled.div`
  height: 100%;
  padding-bottom: 20px;
`;

const Box = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookInfoBox = styled.div`
  border-radius: 5px;
`;

const InfoBottom = styled.div`
  font-size: 0.9rem;
`;

const Category = styled.div`
  margin-bottom: 30px;
  div:first-child {
    margin-bottom: 10px;
  }
`;

const Description = styled.div`
  div:first-child {
    margin-bottom: 10px;
  }

  div:last-child {
    line-height: 20px;
  }
`;
