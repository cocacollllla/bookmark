import { AiFillCamera } from "react-icons/ai";
import { MdFormatColorText } from "react-icons/md";

import styled from "styled-components";

const bgImgList = Array.from({ length: 12 }, (v, i) => i + 1);

const ratioList = [
  { type: "square", menu: "1 : 1" },
  { type: "rectangle", menu: "3 : 4" },
];

const textColorList = ["black", "white"];

const BookmarkSaveTab = ({
  tab,
  selectBackgroundImg,
  selectRatio,
  selectTextColor,
  selectFont,
  ratio,
  bgImg,
  textColor,
  onChangeBgImgHandler,
}) => {
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

  return (
    <Container mobile={isMobile} bg={tab === "배경"}>
      {tab === "크기" && (
        <ul>
          {ratioList.map((rat) => (
            <li
              key={rat.type}
              onClick={() => selectRatio(rat.type)}
              className={rat.type === ratio ? "on" : ""}
            >
              {rat.menu}
            </li>
          ))}
        </ul>
      )}
      {tab === "배경" && (
        <ul className="scroll">
          <li>
            <label htmlFor={`ex_file1`}>
              <AiFillCamera size={20} />
            </label>
            <input
              type="file"
              id={`ex_file1`}
              accept="image/*"
              onChange={onChangeBgImgHandler}
            />
          </li>

          {bgImgList.map((img) => (
            <li
              key={img}
              onClick={() =>
                selectBackgroundImg(`/assets/background${img}.jpg`)
              }
              className={`/assets/background${img}.jpg` === bgImg ? "on" : ""}
            >
              <img src={`/assets/background${img}.jpg`} alt="이미지" />
            </li>
          ))}
        </ul>
      )}

      {tab === "텍스트색상" && (
        <ul>
          {textColorList.map((color) => (
            <li
              key={color}
              onClick={() => selectTextColor(color)}
              className={`${color} ${color === textColor ? "on" : ""}`}
            >
              <MdFormatColorText size={18} />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default BookmarkSaveTab;

const Container = styled.div`
  ul {
    display: flex;
    align-items: center;
    padding: ${(props) =>
      !props.mobile && props.bg ? "0 10px 5px 10px" : "0 10px 10px 10px"};
  }
  li {
    flex-basis: 1;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    background-color: #ddd;
    box-sizing: content-box;
    border-radius: 8px;
    margin-right: 10px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
    font-family: ${(props) => props.font};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    input[type="file"] {
      display: none;
    }
  }

  .white {
    background-color: #555;
    color: white;
  }

  .scroll {
    overflow: auto;
  }

  .scroll::-webkit-scrollbar {
    display: ${(props) => (props.mobile ? "none" : "")};
    height: 5px;
  }

  .scroll::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 8px;
  }

  .on {
    border: 4px solid ${(props) => props.theme.mainColor};
  }
`;
