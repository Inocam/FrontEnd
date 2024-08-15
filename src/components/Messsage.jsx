import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as S from "../styles/index.style.js";
import {
  massageopenHandler,
  massagecloseHandler,
} from "../store/module/Dashboard.js";

import { useQueryClient } from "@tanstack/react-query";

import styled from "styled-components";

import MessageBox from "./MessageBox.jsx";
import { Suspense } from "react";

const Message = () => {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const isMessageOpen = useSelector((state) => state.nav.ismassageOpen);

  return (
    <>
      <SMessageButton
        onClick={() => {
          queryClient.invalidateQueries(["getMmuser"]);
          dispatch(massageopenHandler());
        }}
      >
        Message
      </SMessageButton>
      {isMessageOpen && (
        <S.message.MessageOverlay
          onClick={() => dispatch(massagecloseHandler())}
        >
          <Suspense>
            <MessageBox></MessageBox>
          </Suspense>
        </S.message.MessageOverlay>
      )}
    </>
  );
};

export default Message;

//무한스크롤링
//s3 이미지처리
const SMessageButton = styled.button`
  position: fixed;
  bottom: 10px;
  left: 10px;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  border: none;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1000000;
`;
