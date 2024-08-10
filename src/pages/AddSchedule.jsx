import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "./components/Header";
import Sidenav from "./components/Sidenav";
import * as S from "./styles/index.style";
import UserIcon from "./assets/icons/user.svg";

const s = {};

s.Container = styled.div`
  padding: 44px 24px;
  display: flex; 
  flex-direction: column;
  width: 100%;
  max-width: 1040px;
  height: 100%;
  box-sizing: border-box;
`;

s.Section = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #EAEAEA;
  margin: 4px;
`;

s.SectionItem = styled.div`
  display: flex;
  align-items: center;
`;

s.Label = styled.label`
  flex: 1;
  font-weight: bold;
`;

s.Input = styled.input`
  padding: 5px;
  margin: 0px 20px;
  border: 0;
`;

s.TextArea = styled.textarea`
  padding: 12px;
  margin-left: 4px;
  height: 100px;
  border: 0;
`;

s.Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

s.Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => props.selected ? '#0278AE' : '#fff'};
  color: ${props => props.selected ? '#fff' : '#000'};
  border: 1px solid ${props => props.selected ? '#0278AE' : '#ccc'};

  &:hover {
    opacity: 0.8;
  }
`;

const AddSchedule = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    const payload = {
      title,
      startDate,
      endDate,
      details,
      status,
    };

    try {
      const response = await axios.post('/foot/task', payload);
      

      if (response.status === 200) {
        // 필드 초기화
        setTitle('');
        setStartDate('');
        setEndDate('');
        setDetails('');
        setStatus('');
      } 
    } catch (error) {
      console.error('Error:', error);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <S.GlobalCss />
      <Header />
      <Sidenav>
        <s.Container>
          <s.Section>
            <s.SectionItem>
              <s.Label>일정 제목</s.Label>
              <s.Input 
                type="text" 
                placeholder="일정 제목을 입력하세요" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <s.Label>작성자</s.Label>
              <s.Image src={UserIcon} alt="작성자 이미지" />
            </s.SectionItem>
          </s.Section>
          <s.Section>
            <s.Label>시작일자</s.Label>
            <s.Input 
              type="date" 
              placeholder="시작일자" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <s.Label>마감일자</s.Label>
            <s.Input 
              type="date" 
              placeholder="마감일자" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </s.Section>
          <s.Section>
            <s.Label>일정 상세</s.Label>
            <s.TextArea 
              placeholder="일정 상세 내용을 입력하세요" 
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </s.Section>
          <s.Section>
            <s.Label>진행 상황</s.Label>
            <s.Button
              selected={status === '진행 전'}
              onClick={() => setStatus('진행 전')}
            >
              진행 전
            </s.Button>
            <s.Button
              selected={status === '진행 중'}
              onClick={() => setStatus('진행 중')}
            >
              진행 중
            </s.Button>
            <s.Button
              selected={status === '완료'}
              onClick={() => setStatus('완료')}
            >
              완료
            </s.Button>
            <s.Button
              selected={status === '지연'}
              onClick={() => setStatus('지연')}
            >
              지연
            </s.Button>
          </s.Section>
          <s.Section className="no-background">
            <s.Button color="#F44336">삭제</s.Button>
            <s.Button color="#4CAF50" onClick={handleSubmit}>저장</s.Button>
          </s.Section>
        </s.Container>
      </Sidenav>
    </div>
  );
};

export default AddSchedule;
