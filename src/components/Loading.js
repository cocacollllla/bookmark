import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = ({ mini }) => {
  return (
    <LoadingWrap mini={mini}>
      <div>
        <div className="dot dot-a" />
        <div className="dot dot-b" />
        <div className="dot dot-c" />
      </div>
    </LoadingWrap>
  );
};

export default Loading;

const load = keyframes`
  0%,80%,100%{
    opacity:0;
    transform:scale(0);
  }
  40%{
    opacity:1;
    transform:scale(1);
  }
`;

const LoadingWrap = styled.div`
  width:100%;
  height: ${(props) => (props.mini ? "auto" : "100%")};
  display:flex;
  align-items: center;
  justify-content: center;
  text-align:center;

  .dot {
    display:inline-block;
    width:10px;
    height:10px;
    background-color: ${(props) => props.theme.mainColor};
    border-radius:100%;
    transition:all ease 0.5s;
    animation: ${load} 1.4s infinite ease-in-out;
    
  }
  .dot-a {
    animation-delay:-0.32s;
  }
  .dot-b {
    animation-delay:-0.16s;
  }
}
  

`;
