import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPlusCircleFill, BsPeople } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import { BiBarChart, BiUser } from "react-icons/bi";

import styled from "styled-components";

const bottomList = [
  {
    title: "booklist",
    icon: <FiList className="icon" />,
    url: "/booklist",
  },
  { title: "chart", icon: <BiBarChart className="icon" />, url: "/chart" },
  {
    title: "search",
    icon: (
      <div className="searchIcon">
        <BsPlusCircleFill />
      </div>
    ),
    url: "/search",
  },
  {
    title: "recommend",
    icon: <BsPeople className="icon" />,
    url: "/recommend/view",
  },
  { title: "mypage", icon: <BiUser className="icon" />, url: "/mypage" },
];

const Bottom = () => {
  const navigate = useNavigate();

  return (
    <BottomContainer>
      <BottomList>
        {bottomList.map((list) => (
          <div key={list.title} onClick={() => navigate(list.url)}>
            {list.icon}
          </div>
        ))}
      </BottomList>
    </BottomContainer>
  );
};

export default Bottom;

const BottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: inherit;
  max-width: inherit;
  padding: 15px 0;
  background-color: white;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const BottomList = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: relative;

  .icon {
    font-size: 24px;
    color: #333;
  }

  .searchIcon {
    font-size: 45px;
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translate(-50%, 0);
    color: ${(props) => props.theme.mainColor};
  }
`;
