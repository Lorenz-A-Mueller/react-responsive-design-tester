/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const headerContainerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

const titleContainerStyles = css`
  font-size: 1.3em;
  text-align: center;
`;

const logoStyles = css`
  left: 30px; /* same as body padding */
  top: 30px;
  position: absolute;
  width: 20%;
  height: auto;
`;

export default function HeaderArea() {
  return (
    <div className="header-container" css={headerContainerStyles}>
      <div>
        <img src="./upleveled_logo.svg" alt="Upleveled-Logo" css={logoStyles} />
      </div>
      <div className="title-container" css={titleContainerStyles}>
        <h1>Responsive Design Tester</h1>
      </div>
    </div>
  );
}
