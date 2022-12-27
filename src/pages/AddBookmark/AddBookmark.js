import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { callGoogleVisionAsync, updateBookData } from "../../api/axios";
import imageCompression from "browser-image-compression";
import styled from "styled-components";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Loading from "../../components/Loading";
import HeaderRight from "../../components/HeaderRight";

const AddBookmark = () => {
  const [text, setText] = useState("");
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const image = location.state?.cropImage;
  const mode = location.state?.mode;
  const book = location.state?.book;
  const currentBookmark = location.state?.bookmark;

  const isEditing = !!currentBookmark;

  const params = useParams();
  const docId = params.id;

  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      mode === "text" && setText(currentBookmark.text);
      setPage(currentBookmark.page);
    }
  }, [isEditing, currentBookmark, mode]);

  useEffect(() => {
    if (mode === "ocr") {
      const base64 = image.replace("data:image/png;base64,", "");
      setLoading(true);
      const getText = async () => {
        const textResult = await callGoogleVisionAsync(base64);
        setText(textResult);
        setLoading(false);
      };
      getText();
    }
  }, [image, mode]);

  const onSubmit = async () => {
    if (text === "" && image === undefined) return;
    setLoading(true);
    const imageURL = await uploadImage();
    const obj = {
      id: Date.now(),
      image: imageURL ? imageURL : null,
      text: text ? text : null,
      page,
    };
    let bookmark = [];
    if (book.bookmark !== undefined) {
      // 북마크 추가
      if (isEditing) {
        // 북마크 수정일 때
        const currentIndex = book.bookmark.findIndex((el) => {
          return el.id === currentBookmark.id;
        });
        let copyBookmarks = [...book.bookmark];
        if (currentIndex !== -1) {
          copyBookmarks[currentIndex] = obj;
        }
        bookmark = copyBookmarks;
      } else {
        // 북마크 수정아니고 그냥 추가일 때
        bookmark = [...book.bookmark, obj];
      }
    } else {
      // 북마크 첫등록
      const con = bookmark.concat(obj);
      bookmark = con;
    }
    await updateBookData(docId, { bookmark });
    setLoading(false);
    navigate(-1);
  };

  const uploadImage = async () => {
    if (mode !== "image") return;

    const options = {
      maxSizeMB: 0.7,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const storage = getStorage();
    const img = await fetch(image);
    const blob = await img.blob();
    const compressedFile = await imageCompression(blob, options);
    const filename = image.substring(image.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `bookmark/${filename}`);

    await uploadBytes(storageRef, compressedFile);
    const fileURL = await getDownloadURL(ref(storage, storageRef));
    return fileURL;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AddBookmarkContainer>
      <PageContainer>
        <span>p</span>
        <input
          type="number"
          value={page}
          onChange={(e) => setPage(e.target.value)}
        />
      </PageContainer>
      <Container>
        {mode === "image" && <img src={image} alt="북마크이미지" />}

        {mode !== "image" && (
          <textarea
            placeholder="기록하고싶은 구절을 입력해보세요."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        )}
      </Container>
      <HeaderRight save onsubmitHandler={onSubmit} />
    </AddBookmarkContainer>
  );
};

export default AddBookmark;

const AddBookmarkContainer = styled.div`
  height: 100%;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;

  input {
    width: 45px;
    height: 25px;
    margin-left: 10px;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    font-size: 1rem;
    text-align: center;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 90%;

  img {
    width: 100%;
  }

  textarea {
    width: 100%;
    height: 100%;
    border: none;
    font-size: 0.9rem;
  }
`;
