/** @jsxImportSource @emotion/react */ // is not read by react, but by the compiler

import { css, Global } from '@emotion/react';
import FooterArea from './FooterArea.js';
import HeaderArea from './HeaderArea.js';
import MainArea from './MainArea.js';

export default function App() {
  const globalStyles = css`
    html {
      height: 100vh;
      width: 100vw;
    }
    body {
      font-family: 'Averta Standard', -apple-system, BlinkMacSystemFont,
        Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
        Helvetica Neue, sans-serif;
      width: 100vw;
      height: 100vh;
      padding: 30px;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: linear-gradient(
          -45deg,
          rgba(0, 0, 0, 0.4) 30%,
          rgba(0, 0, 0, 0)
        ),
        linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 255, 0.7));
      background-attachment: fixed;

      //background: linear-gradient(-45deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
      background-repeat: no-repeat;
      background-size: cover;
    }
  `;

  const footerStyles = css`
    position: fixed;
    width: 100vw;
  `;

  return (
    <div>
      <Global styles={globalStyles} />
      <HeaderArea />
      <MainArea />
      <FooterArea styles={footerStyles} />
    </div>
  );
}
