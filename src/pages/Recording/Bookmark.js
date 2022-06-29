import React from 'react';
import {FiPlus } from "react-icons/fi";
import styled from 'styled-components';
import "react-datepicker/dist/react-datepicker.css";

const BookMark = ({bookmark, trans, addToList, handleChange, onFileChange}) => {

  return (

    <BookmarkWrap>
      <CateTitle>책갈피</CateTitle>
      <div>
        {bookmark.map((el, idx) => (
          <BookmarkBox key={el.id}>
            <div className="textChange" onClick={() => trans(el.id)}><span>{el.string ? '이미지' : '텍스트'}</span></div>
            {el.string ? (
              <div className="textBox"><textarea onChange={(e) => handleChange(e, el.id)} name="text" defaultValue={el.text}></textarea></div>
            ) : (
              <ImageUpload>
                <div className="imageBox">{el.image !== '' && <img src={el.image} alt="" />}</div>
                <ImageUploadBtn>
                  <label htmlFor={`ex_file${el.id}`}>이미지 업로드</label>
                  <input type="file" id={`ex_file${el.id}`} onChange={(e) => onFileChange(e, el.id)} />
                </ImageUploadBtn>
                
              </ImageUpload>
            )}

            <Page>
              <span>p</span>
              <input type="text" name="page" onChange={(e) => handleChange(e, el.id)} defaultValue={el.page} />
            </Page>
            
          </BookmarkBox>
        ))}
        <AddBookmark onClick={addToList}><FiPlus /><span>책갈피 추가</span></AddBookmark>
      </div>
    </BookmarkWrap>

  )
}

export default BookMark;


const CateTitle = styled.div`
  margin-bottom: 15px;
  font-size: 0.9rem;
`;



const BookmarkWrap = styled.div`
  margin-top: 20px;
`;


const BookmarkBox = styled.div`
  margin-bottom: 30px;
  position: relative;
  
  .textBox {
    height: 150px;

    textarea {
      width: 100%;
      height: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      resize: none;
      
  
      &:focus {
        outline: none
      }
  
    }
  }

  .textChange {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;

    span {
      color: #666;
      font-size: 0.9rem;
    }
  }

`;

const Page = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 5px;
  height: 35px;

  input {
    width: 50px;
    margin-left: 5px;

    &:focus {
      outline: none
    }
  }
`;

const AddBookmark = styled.div`
  width: 110px;
  padding: 10px;
  margin: 0 auto;
  background-color: #ededed;
  display: flex;
  justify-content:center;
  align-items: center;
  border-radius: 10px;

  span {
    font-size: 0.9rem;
  }
`;


const ImageUpload = styled.div`
  .imageBox {
    width: 100%;
    height: auto;
    min-height: 150px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;

    img {
      width: 100%;
    }
  }


`;

const ImageUploadBtn = styled.div`
  position: absolute;
  bottom: 0;

  label {
    display: inline-block;
    padding: 3px 10px;
    color: #666;
    line-height: normal;
    vertical-align: middle;
    background-color: #eee;
    cursor: pointer;
    border-radius: 5px;
    font-size: 0.9rem;
  }

  input[type="file"] {
    display: none;
  }
`;