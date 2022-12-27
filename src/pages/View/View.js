import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookInfoTop from "../../components/BookInfoTop";
import styled from "styled-components";
import {
  deleteBookData,
  deleteStorageBook,
  deleteStorage,
  updateBookData,
} from "../../api/axios";
import { AiFillStar } from "react-icons/ai";
import { BsFillBookmarksFill } from "react-icons/bs";
import HeaderRight from "../../components/HeaderRight";
import Modal from "../../components/Modal";
import BottomSheetModal from "../../components/BottomSheetModal";
import Bookmark from "./Bookmark";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/keys";
import useModal from "../../hooks/useModal";
import Loading from "../../components/Loading";
import CropControl from "../../components/CropControl.js";
import BookmarkSave from "./BookmarkSave";

const View = () => {
  const [modalOption, showShowModal] = useModal();
  const [book, setBook] = useState({});
  const [bookmark, setBookmark] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bottomModalShow, setBottomModalShow] = useState(false);

  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [cropVisible, setCropVisible] = useState(false);
  const [bookmarkMode, setBookmarkMode] = useState(null);
  const [bookmarkEditMode, setBookmarkEditMode] = useState(null);
  const [bookmarkSaveShow, setBookmarkSaveShow] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  const docId = params.id;

  useEffect(() => {
    setLoading(true);
    const getBookData = onSnapshot(doc(db, "books", docId), (doc) => {
      setBook(doc.data());
    });
    setLoading(false);
    return () => {
      getBookData();
    };
  }, [docId]);

  const onEditBook = () => {
    navigate(`/write/${docId}`, { state: { edit: true, bookInfo: book } });
  };

  const onDeleteBook = async () => {
    setLoading(true);
    try {
      await deleteBookData(docId);
      if (book.bookmark) await deleteStorageBook(book.bookmark);
      navigate("/");
    } catch (error) {
      setLoading(false);
    }
  };

  const onDeleteBookmark = async (id, image) => {
    setLoading(true);
    try {
      let bookmarkArr = [];
      const copyArr = book.bookmark.filter((el) => el.id !== id);
      bookmarkArr = copyArr;
      await updateBookData(docId, { bookmark: bookmarkArr });
      if (image) {
        await deleteStorage(image);
      }
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const delBookModal = () => {
    showShowModal(
      true,
      "해당 독서기록을 삭제하시겠습니까?",
      "삭제시 복구되지 않습니다.",
      "삭제",
      onDeleteBook
    );
  };

  const delBookmarkModal = (id, image) => {
    showShowModal(
      true,
      "해당 북마크를 삭제하시겠습니까?",
      "삭제시 복구되지 않습니다.",
      "삭제",
      () => onDeleteBookmark(id, image)
    );
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropVisible(false);
      const cropImage = cropper.getCroppedCanvas().toDataURL();
      navigate(`/addbookmark/${docId}`, {
        state: {
          cropImage,
          book,
          mode: bookmarkMode,
          bookmark: bookmarkEditMode ? bookmark : null,
        },
      });
    }
  };

  const upload = async (file) => {
    setBottomModalShow(false);
    setCropVisible(true);
    setCropData(URL.createObjectURL(file));
  };

  const bookmarkEditHandler = (bookmark, mode) => {
    setBottomModalShow(true);
    setBookmarkEditMode(mode);
    setBookmark(bookmark);
  };

  const bookmarkSaveHandler = (bookmark) => {
    setBookmarkSaveShow(true);
    setBookmark(bookmark);
  };

  const goToRecommendHandler = () => {
    navigate("/recommend/write", { state: book });
  };

  if (loading || Object.keys(book).length === 0) {
    return <Loading />;
  }

  return (
    <>
      <ViewContainer>
        {book && (
          <>
            <BookInfoTop bookInfo={book}>
              <RecommendBox>
                <StarRating>
                  {[1, 2, 3, 4, 5].map((el) => (
                    <div
                      key={el}
                      className={book.starRating >= el ? "onStar" : ""}
                    >
                      <AiFillStar />
                    </div>
                  ))}
                </StarRating>
                <div className="recommendButton" onClick={goToRecommendHandler}>
                  추천하기
                </div>
              </RecommendBox>
            </BookInfoTop>
            <DateContainer>
              <Title>독서 날짜</Title>
              <DateBox>
                <div>{book.startDate}</div>
                <div className="dash">{book.endDate}</div>
              </DateBox>
            </DateContainer>
            <MemoContainer>
              <Title>메모</Title>
              <Memo>{book.memo}</Memo>
            </MemoContainer>

            {book.bookmark?.map((bookmark) => (
              <Bookmark
                key={bookmark.id}
                bookmark={bookmark}
                docId={docId}
                book={book}
                bookmarkEditHandler={bookmarkEditHandler}
                delBookmarkModal={delBookmarkModal}
                bookmarkSaveHandler={bookmarkSaveHandler}
              />
            ))}
            {bookmarkSaveShow && (
              <BookmarkSave
                bookmarkSaveClose={() => setBookmarkSaveShow(false)}
                bookmark={bookmark}
                title={book.title}
                author={book.author}
              />
            )}

            <Modal modalOption={modalOption} />

            <BottomSheetModal
              isModalOpen={bottomModalShow}
              closeModal={() => setBottomModalShow(false)}
              bookmarkEditMode={bookmarkEditMode}
              enterText={() =>
                navigate(`/addbookmark/${docId}`, {
                  state: {
                    mode: "text",
                    book,
                    bookmark: bookmarkEditMode ? bookmark : null,
                  },
                })
              }
              imageUpload={(e) => {
                upload(e.target.files[0]);
                setBookmarkMode("image");
              }}
              imageToTextUpload={(e) => {
                upload(e.target.files[0]);
                setBookmarkMode("ocr");
              }}
            />
            {cropVisible && (
              <CropControl
                cropData={cropData}
                setCropper={setCropper}
                getCropData={getCropData}
                cropVisible={() => setCropVisible(false)}
              />
            )}

            <HeaderRight edit del onEdit={onEditBook} onDelete={delBookModal} />
          </>
        )}
      </ViewContainer>
      <BookmarkAddIcon
        onClick={() => {
          setBottomModalShow(true);
          setBookmarkEditMode(null);
        }}
      >
        <div className="icon">
          <BsFillBookmarksFill />
        </div>
      </BookmarkAddIcon>
    </>
  );
};

export default View;

const ViewContainer = styled.div`
  padding-bottom: 80px;
`;

const StarRating = styled.div`
  display: flex;

  div {
    font-size: 1.5rem;
    color: #ddd;
  }

  .onStar {
    color: ${(props) => props.theme.yellow};
  }
`;

const RecommendBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  align-items: center;

  .recommendButton {
    color: ${(props) => props.theme.mainColor};
    font-weight: 500;
    font-size: 0.85rem;

    &:after {
      content: "";
      display: block;
      width: 25px;
      height: 1px;
      margin-top: 3px;
      margin-left: 25px;
      background-color: ${(props) => props.theme.mainColor};
    }
  }
`;

const DateContainer = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 0.9rem;
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  font-size: 0.9rem;

  div {
    display: flex;
    align-items: center;
  }

  .dash:before {
    content: "ㅡ";
    padding: 0 10px;
    color: ${(props) => props.theme.gray400};
  }
`;

const MemoContainer = styled.div`
  width: 100%;
  height: auto;
`;

const Memo = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  line-height: 21px;
  font-size: 0.9rem;
`;

const BookmarkAddIcon = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.theme.mainColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    color: ${(props) => props.theme.white};
    font-size: 26px;
  }
`;
