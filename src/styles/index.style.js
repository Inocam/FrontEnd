import { createGlobalStyle } from "styled-components";
export * as header from "./styles.header";
export * as login from "./styles.login";
export * as message from "./styles.message";
export * as sidenav from "./styles.sidenav";
export * as dashboard from "./styles.dashboard";
export * as calender from "./style.calender";
export * as team from "./styles.team";
export * as access from "./styles.access";
export * as setting from "./styles.setting";

export const GlobalCss = createGlobalStyle`
*{
  font-family:'Pretendard-Regular' ;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
body{
  min-width: 1200px;
}
`;
