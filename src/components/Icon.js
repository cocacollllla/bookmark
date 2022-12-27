import React from "react";
import { AiOutlineCheck, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import styled from "styled-components";

const Icon = ({ save, edit, del, heart, heartIcon }) => {
  const icon = () => {
    if (save) {
      return <AiOutlineCheck className="icon" />;
    }
    if (edit) {
      return <AiFillEdit className="icon" />;
    }
    if (del) {
      return <AiFillDelete className="icon" />;
    }
    if (heartIcon) {
      const onHeart = heart ? "onHeart" : "offHeart";
      return <GoHeart className={`icon ${onHeart}`} />;
    }
  };
  return <HeaderRightContainer>{icon()}</HeaderRightContainer>;
};

export default Icon;

const HeaderRightContainer = styled.div`
  margin-left: 10px;
  font-size: 20px;

  .icon {
    font-size: 22px;
    color: ${(props) => props.theme.gray400};
  }

  .onHeart {
    color: red !important;
  }

  .offHeart {
    color: #aaa !important;
  }
`;
