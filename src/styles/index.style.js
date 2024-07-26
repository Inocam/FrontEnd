import { createGlobalStyle } from "styled-components";
export * as header from "./styles.header";
export * as login from "./styles.login";
export * as signup from "./styles.signup";
export * as message from "./styles.message";

export const GlobalCss = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`;
