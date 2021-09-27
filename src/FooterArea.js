/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const footerContainerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  margin-left: -30px;
  margin-bottom: -30px;
  margin-top: 20px;
  margin-right: -30px;
  padding: 0;
  width: 100%;
  height: 9vh;
  background-color: black;
  color: white;
`;

export default function FooterArea() {
  return (
    <div className="footer" css={footerContainerStyles}>
      <h1>@ Lorenz Müller, 2021</h1>
    </div>
  );
}
