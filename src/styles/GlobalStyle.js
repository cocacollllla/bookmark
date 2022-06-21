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
    height: 100%;
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
