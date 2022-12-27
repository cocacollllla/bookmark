import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const BottomSheetModal = ({
  isModalOpen,
  closeModal,
  bookmarkEditMode,
  enterText,
  imageUpload,
  imageToTextUpload,
  profile,
  deleteProfilePic,
  children,
}) => {
  return (
    <ModalContainer>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-after",
          beforeClose: "overlay-before",
        }}
        className={{
          base: "bottom-modal-base",
          afterOpen: "bottom-modal-after",
          beforeClose: "bottom-modal-before",
        }}
        closeTimeoutMS={300}
      >
        <ModalContent>
          {bookmarkEditMode === null && (
            <ul>
              <li onClick={enterText}>텍스트로 입력</li>
              <li>
                <label htmlFor={`ex_file1`}>이미지로 넣기</label>
                <input type="file" id={`ex_file1`} onChange={imageUpload} />
              </li>
              <li>
                <label htmlFor={`ex_file2`}>이미지에서 텍스트 추출</label>
                <input
                  type="file"
                  id={`ex_file2`}
                  onChange={imageToTextUpload}
                />
              </li>
            </ul>
          )}
          {bookmarkEditMode === "text" && (
            <ul>
              <li onClick={enterText}>텍스트 수정</li>
              <li>
                <label htmlFor={`ex_file1`}>이미지로 변경</label>
                <input type="file" id={`ex_file1`} onChange={imageUpload} />
              </li>
              <li>
                <label htmlFor={`ex_file2`}>이미지에서 텍스트 추출</label>
                <input
                  type="file"
                  id={`ex_file2`}
                  onChange={imageToTextUpload}
                />
              </li>
            </ul>
          )}
          {bookmarkEditMode === "image" && (
            <ul>
              <li onClick={enterText}>텍스트로 입력</li>
              <li>
                <label htmlFor={`ex_file1`}>이미지 변경</label>
                <input type="file" id={`ex_file1`} onChange={imageUpload} />
              </li>
              <li>
                <label htmlFor={`ex_file2`}>
                  새로운 이미지에서 텍스트 추출
                </label>
                <input
                  type="file"
                  id={`ex_file2`}
                  onChange={imageToTextUpload}
                />
              </li>
            </ul>
          )}
          {profile && (
            <ul>
              <li>
                <label htmlFor={`ex_file1`}>프로필사진 수정</label>
                <input type="file" id={`ex_file1`} onChange={imageUpload} />
              </li>
              <li onClick={deleteProfilePic}>프로필사진 삭제</li>
            </ul>
          )}
          {children}
        </ModalContent>
      </Modal>
    </ModalContainer>
  );
};

export default BottomSheetModal;

const ModalContainer = styled.div`
  width: 100%;
`;

const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 100%;
  min-height: 100px;
  max-height: 90vh;
  transform: translate(-50%, 0);
  padding: 10px 0;
  background-color: ${(props) => props.theme.white};
  border-radius: 15px 15px 0 0;

  li {
    height: 60px;
    padding-left: 20px;
    line-height: 60px;
  }

  label {
    display: block;
    height: 60px;
    line-height: 60px;
    vertical-align: middle;
    cursor: pointer;
  }

  input[type="file"] {
    display: none;
  }
`;
