import styled from "styled-components";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineSaveAlt } from "react-icons/md";

const Bookmark = ({
  bookmark,
  bookmarkEditHandler,
  delBookmarkModal,
  bookmarkSaveHandler,
}) => {
  return (
    <BookmarkContainer key={bookmark.id}>
      <BookmarkContent>
        {bookmark.text !== null && <div>{bookmark.text}</div>}
        {bookmark.text === null && (
          <img src={bookmark.image} alt="bookmark" style={{ width: "100%" }} />
        )}
      </BookmarkContent>
      <PageButtonWrap>
        <Page>{bookmark.page && <span>p {bookmark.page}</span>}</Page>
        <Buttons>
          {bookmark.text !== null && (
            <div onClick={() => bookmarkSaveHandler(bookmark)}>
              <MdOutlineSaveAlt />
            </div>
          )}
          <div
            onClick={() =>
              bookmarkEditHandler(
                bookmark,
                bookmark.text !== null ? "text" : "image"
              )
            }
          >
            <AiFillEdit />
          </div>
          <div onClick={() => delBookmarkModal(bookmark.id, bookmark.image)}>
            <AiFillDelete />
          </div>
        </Buttons>
      </PageButtonWrap>
    </BookmarkContainer>
  );
};

export default Bookmark;

const BookmarkContainer = styled.div`
  width: 100%;
  padding: 15px;
  background-color: ${(props) => props.theme.gray200};
  border-radius: 8px;
  margin-top: 20px;
`;

const BookmarkContent = styled.div`
  font-size: 0.9rem;
  line-height: 22px;
  white-space: pre-line;
`;

const PageButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const Page = styled.div`
  padding-left: 5px;
  font-size: 0.9rem;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-left: 5px;
    font-size: 1.1rem;
    color: ${(props) => props.theme.gray400};
  }
`;
