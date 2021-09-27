/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const mainAreaStyles = css`
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .control-div {
    height: 9vh;
    display: flex;
    align-items: center;

    input {
      width: 400px;
      height: 40px;
      font-size: 2em;
      border: solid black 2px;
    }
  }

  .big-button {
    width: 200px;
    height: 46px; /* why not the same height as input??? */
    font-size: 2em;
    border: solid black 2px;
    margin-left: 20px;
    &:hover {
      box-shadow: 10px 10px;
      margin-top: -6px;
      margin-bottom: 6px;
    }
  }

  .share-div {
    height: 9vh;
    display: flex;
    align-items: center;

    input {
      width: 400px;
      height: 40px;
      font-size: 1em;
      font-style: italic;
      border: solid black 2px;
    }
  }
  .stretch-button-container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    margin-left: auto;
    margin-right: 5%;
    width: max-content;
    text-align: center;
  }

  .slots {
    display: flex;
    flex-wrap: nowrap;
    margin-top: 5%;
  }
`;
