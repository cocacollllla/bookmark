import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import reset from 'styled-reset';


const GlobalStyle = createGlobalStyle`
${reset}

  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body{
    font-family: 'Noto Sans KR', sans-serif;
  }

	a{
    text-decoration: none;
    color: inherit;
  }

  input[type='text'] {
    width: 100%;
    padding: .5rem;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  .btn {
    margin-top: 20px;
    padding: 15px 0;
    border-radius: 10px;
    text-align: center;
    color: white;
    font-weight: 500;
  }

  .uploadBtn {
    background-color: #666BDB;
  }

  .deleteBtn {
    margin-top: 10px;
    background-color: #EC8787;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : 'column')};
  align-items: center;
  justify-content: center;
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr);
  justify-content: center;
  grid-gap: 30px;
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
`;


export default GlobalStyle;
