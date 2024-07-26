import styled from "styled-components";

export const SToggleButton = styled.button`
  position: absolute;
  cursor: pointer;
  left: 300px;
  top: 50px;
  z-index: 1000;
  border: none;
  background-color: #0278ae;
  color: white;
  font-weight: bold;
  width: 20px;
  height: 40px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const SNav = styled.nav`
  position: fixed;
  display: block;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "-300px")};
  width: 300px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  transition: left 0.5s ease-in-out;
  padding: 40px 30px;
`;

export const STitle = styled.h1`
  font-weight: bolder;
  font-size: 40px;
  margin-bottom: 20px;
`;

export const SSubtitle = styled.p`
  color: rgba(0, 0, 0, 0.2);
  font-size: 20px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  width: 80%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const SParagraph = styled.p`
  font-size: 20px;
  margin-left: 30px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const Sbody = styled.div`
  padding-left: ${({ $isOpen }) => ($isOpen ? "400px" : "0")};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
