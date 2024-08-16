import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { http } from "../interceptor";
import * as ReactDOM from "react-dom";

const ToastContainer = styled.div`
  position: fixed;
  top: 8%;
  right: 50%;
  background-color: ${({ $red }) => ($red ? "#fa3447" : "#0278ae")};
  color: white;
  padding: 16px;
  border-radius: 4px;
  z-index: 1000;
  opacity: ${({ $show }) => ($show ? "1" : "0")};
  transition: opacity 0.3s ease-in-out;
`;

const Toast = ({ message, $red, $show }) => {
  return ReactDOM.createPortal(
    <ToastContainer $red={$red} $show={$show}>
      {message}
    </ToastContainer>,
    document.body
  );
};

export const useTaskupDate = () => {
  const URL = "/foot/task/update/";
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);
  const mutation = useMutation({
    mutationKey: ["TaskupDate"],
    mutationFn: async (body) => {
      const response = await http.put(URL + body.taskId, body);
      return response;
    },
    onSuccess: () => {
      setShowToast(true);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
  return {
    ...mutation,
    Toast: <Toast message="수정완료" $red={false} $show={showToast} />,
  };
};
export const useTaskDelete = () => {
  const URL = "/foot/task/delete/";
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const mutation = useMutation({
    mutationKey: ["TaskDelete"],
    mutationFn: async (body) => {
      const response = await http.delete(URL + body);
      return response;
    },
    onSuccess: () => {
      setShowToast(true);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
  return {
    ...mutation,
    Toast: <Toast message="삭제완료" $red={true} $show={showToast} />,
  };
};
