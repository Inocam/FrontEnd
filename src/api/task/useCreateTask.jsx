import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { http } from "../interceptor";
import styled from "styled-components";

const ToastContainer = styled.div`
  position: fixed;
  top: 8%;
  right: 50%;
  background-color: #0278ae;
  color: white;
  padding: 16px;
  border-radius: 4px;
  z-index: 1000;
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition: opacity 0.3s ease-in-out;
`;

const Toast = ({ message, show }) => {
  return <ToastContainer show={show}>{message}</ToastContainer>;
};

export const useCreateTask = () => {
  const URL = "/foot/task/create";
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
    mutationKey: ["TASK_CREATE"],
    mutationFn: async (body) => {
      const response = await http.post(URL, body);
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
    Toast: <Toast message="등록완료" show={showToast} />,
  };
};
