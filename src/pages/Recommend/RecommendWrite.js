import { useState } from "react";
import Modal from "../../components/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addRecommend } from "../../api/axios";
import BottomSheetModal from "../../components/BottomSheetModal";
import HeaderRight from "../../components/HeaderRight";
import useModal from "../../hooks/useModal";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { authorSlice } from "../../util/util";

const RecommendWrite = () => {
  const [modalOption, showShowModal] = useModal();
  const [content, setContent] = useState("");
  const [checkItems, setCheckItems] = useState([]);
  const [checkBookmark, setCheckBookmark] = useState([]);
  const [onModal, setOnModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const users = useSelector((state) => state.users);
  const location = useLocation();
  const book = location?.state;

  const navigate = useNavigate();

  const checkHandler = (idx) => {
    const isChecked = checkItems.includes(idx);
    if (isChecked) {
      setCheckItems(checkItems.filter((el) => el !== idx));
    } else {
      setCheckItems((prev) => [...prev, idx]);
    }
  };

  const addBookmarkHandler = () => {
    if (book.bookmark) {
      setOnModal(true);
    } else {
      showShowModal(
        true,
        "넣을 수 있는 북마크가 없습니다.",
        "북마크 생성 후 다시 시도해주세요.",
        "",
        () => {}
      );
    }
  };

  const bookmarkSubmitHandler = () => {
    let bookmark = [];
    checkItems.forEach((idx) => {
      bookmark.push(book.bookmark[idx]);
    });
    setCheckBookmark(bookmark);
    setOnModal(false);
  };

  const onSubmit = async () => {
    setLoading(true);
    const obj = {
      id: book.id,
      title: book.title,
      author: book.author,
      cover: book.cover,
      uid: book.uid,
      name: users.name,
      photoUrl: users.photoUrl,
      bookmark: checkBookmark,
      content,
    };
    await addRecommend(obj);
    setLoading(false);
    navigate(-1);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <BookImage>
        <img src={book.cover} alt="책 커버" />
        <div className="title">{book.title}</div>
        <div className="author">{authorSlice(book.author)}</div>
      </BookImage>
      <Textarea
        placeholder="책 추천 이유 한마디를 적어주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></Textarea>
      <div className="button" onClick={addBookmarkHandler}>
        {checkBookmark.length === 0
          ? "추천글에 북마크 넣기"
          : "북마크 다시 선택하기"}
      </div>
      <div>
        {checkBookmark.map((bmk) => (
          <BookmarkCard key={bmk.id}>
            {bmk.text && <div className="content">{bmk.text}</div>}
            {bmk.image && <img src={bmk.image} alt="북마크 이미지" />}
          </BookmarkCard>
        ))}
      </div>

      <BottomSheetModal
        isModalOpen={onModal}
        closeModal={() => setOnModal(false)}
      >
        <BottomSheetInner>
          <p>넣고 싶은 북마크를 선택해 주세요.</p>
          <BookmarkList>
            {book.bookmark?.map((bmk, idx) => (
              <BookmarkCard
                key={bmk.id}
                onClick={() => checkHandler(idx)}
                isChecked={checkItems.includes(idx)}
              >
                {bmk.text && <div className="content">{bmk.text}</div>}
                {bmk.image && <img src={bmk.image} alt="북마크 이미지" />}
              </BookmarkCard>
            ))}
          </BookmarkList>
          <BookmarkSubmitButton onClick={bookmarkSubmitHandler}>
            선택 완료
          </BookmarkSubmitButton>
        </BottomSheetInner>
      </BottomSheetModal>

      <Modal modalOption={modalOption} />
      <HeaderRight save onsubmitHandler={onSubmit} />
    </Container>
  );
};

export default RecommendWrite;

const Container = styled.div`
  padding-bottom: 3rem;
  font-size: 0.9rem;

  .button {
    padding: 1rem 0;
    text-align: center;
    font-weight: 500;
    color: ${(props) => props.theme.mainColor};
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
    font-size: 0.8rem;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  margin-top: 30px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
`;

const BookmarkList = styled.div`
  height: calc(80vh - 40px);
  padding: 10px 5px 70px 5px;
  overflow: auto;
`;

const BottomSheetInner = styled.div`
  padding: 20px;
  max-height: 80vh;

  p {
    padding-bottom: 20px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const BookmarkCard = styled.div`
  padding: 1rem;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.gray200};
  outline: ${(props) =>
    props.isChecked && `3px solid ${props.theme.mainColor}`};

  .content {
    line-height: 22px;
    white-space: pre-line;
  }

  img {
    width: 100%;
  }
`;

const BookmarkSubmitButton = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 0 20px 0;
  background-color: white;
  text-align: center;
  font-weight: 600;
  color: ${(props) => props.theme.mainColor};
`;
