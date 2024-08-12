import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "./Header";
import Sidenav from "./Sidenav";
import * as S from "../styles/index.style";
import UserIcon from "../assets/icons/user.svg";
import { useCreateTask } from "../api/task/useCreateTask";
import { useSelector } from "react-redux";

const s = {};

s.Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

s.Section = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  margin-bottom: 1rem;
  border-radius: 4px;
`;

s.SectionItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

s.Label = styled.label`
  font-weight: bold;
  width: 120px;
  margin-right: 1rem;
`;

s.Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  flex: 1;
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

s.TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 100%;
  height: 100px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

s.Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 1rem;
`;

s.Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  background-color: ${(props) => (props.selected ? "#007bff" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#007bff")};
  border: 1px solid #007bff;

  &:hover {
    opacity: 0.8;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(199, 214, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

s.ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const AddSchedule = ({ onClickHandler }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("진행 전");
  const { mutate ,isSuccess,isError } = useCreateTask();
  const user = useSelector((state) => state.user);
  const handleSubmit = async () => {
    const payload = {
      teamId: user.TeamId,
      userId: user.Id,
      title: title,
      description: details,
      status: status,
      startDate: startDate,
      dueDate: endDate,
      endDate: "",
      parentTask: null,
    };
    mutate(payload);
    onClickHandler()
  };
  if(isSuccess){
    
  }

  return (
    <ModalOverlay>
      <s.Container>
        <s.Section>
          <s.SectionItem>
            <s.Label>일정 제목</s.Label>
            <s.Input
              type="text"
              placeholder="일정 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <s.Image src={UserIcon} alt="작성자 이미지" />
          </s.SectionItem>
        </s.Section>
        <s.Section>
          <s.SectionItem>
            <s.Label>시작일자</s.Label>
            <s.Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </s.SectionItem>
        </s.Section>
        <s.Section>
          <s.SectionItem>
            <s.Label>마감일자</s.Label>
            <s.Input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </s.SectionItem>
        </s.Section>
        <s.Section>
          <s.SectionItem>
            <s.Label>일정 상세</s.Label>
            <s.TextArea
              placeholder="일정 상세 내용을 입력하세요"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </s.SectionItem>
        </s.Section>
        <s.Section>
          <s.SectionItem>
            <s.Label>진행 상황</s.Label>
            <div>
              {["진행 전", "진행 중", "완료", "지연"].map((statusOption) => (
                <s.Button
                  key={statusOption}
                  selected={status === statusOption}
                  onClick={() => setStatus(statusOption)}
                >
                  {statusOption}
                </s.Button>
              ))}
            </div>
          </s.SectionItem>
        </s.Section>
        <s.ButtonGroup>
          <s.Button
            onClick={() => {
              onClickHandler();
            }}
          >
            취소
          </s.Button>
          <s.Button onClick={handleSubmit}>저장</s.Button>
        </s.ButtonGroup>
      </s.Container>
    </ModalOverlay>
  );
};

export default AddSchedule;
