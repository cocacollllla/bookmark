import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}

  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
  }

  html, body{
    /* Prevent font scaling in landscape */
    -webkit-text-size-adjust: none; /*Chrome, Safari, newer versions of Opera*/
    -moz-text-size-adjust: none; /*Firefox*/
    -ms-text-size-adjust: none;  /*Ie*/
    -o-text-size-adjust: none; /*old versions of Opera*/
    font-family: 'NotoSansKR', sans-serif;
 
  }

	a{
    text-decoration: none;
    color: inherit;
  }

  input {
    &:focus {
      outline: none
    }
  }

  textarea {
    &:focus {
      outline: none
    }
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

  .alert-enter {
    opacity: 0;
  }

  .alert-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }

  .alert-exit {
    opacity: 1;
  }

  .alert-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }

.overlay-base {
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 0;
  z-index: 99;
  width: 100%;
  max-width: 420px;
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
  transition-property: background-color, opacity;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-after {
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
}

.overlay-before {
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
}

.modal-base {
  margin: 0 auto;
  border: 0;
  outline: 0;
  opacity: 0;
  transform: translateY(200px);
  background-color: transparent;
  transition-property: transform opacity;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}

.modal-after {
  transform: translateY(-50px);
  opacity: 1;
}

.modal-before {
  opacity: 0;
  transform: translateY(200px);
}

.bottom-modal-base {
  position: absolute;
  bottom: -200px;
  width: 100%;
  border: 0;
  outline: 0;
  background-color: transparent;
  transition-property: bottom;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}

.bottom-modal-after {
  bottom: 0
}

.bottom-modal-before {

  bottom: -200px;
}

`;

export default GlobalStyle;
