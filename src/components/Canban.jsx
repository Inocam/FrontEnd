// import React from 'react';
import styled from "styled-components";

// Styled components
const Container = styled.div`
  height: 80%;
  width: 80%;
  min-width: 800px;
  margin: 0 auto;
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const SearchContainer = styled.div`
  position: relative;
  flex-grow: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 16px 8px 40px;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
`;

const BoardContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 16px;
`;

const Column = styled.div`
  flex: 1;
  min-width: 200px;
  background-color: #f7fafc;
  border-radius: 8px;
  padding: 16px;
`;

const ColumnTitle = styled.h2`
  font-weight: bold;
  margin-bottom: 16px;
  color: ${(props) => props.color};
  font-size: 18px;
`;

const TaskCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
`;

const TaskTitle = styled.h3`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
`;

const TaskDescription = styled.p`
  font-size: 14px;
  color: #718096;
  margin-bottom: 8px;
`;

const TaskTime = styled.span`
  font-size: 12px;
  color: #a0aec0;
  display: block;
  text-align: right;
`;
const TaskDiv = styled.div`
  height: 72vh;
`;

// Component definitions
const Task = ({ title, description, time }) => (
  <TaskCard>
    <TaskTitle>{title}</TaskTitle>
    <TaskDescription>{description}</TaskDescription>
    <TaskTime>{time}</TaskTime>
  </TaskCard>
);

const ColumnComponent = ({ title, tasks, color }) => (
  <Column>
    <ColumnTitle color={color}>{title}</ColumnTitle>
    <TaskDiv>
      {tasks?.map((task, index) => (
        <Task key={index} {...task} />
      ))}
    </TaskDiv>
  </Column>
);

const Canbancom = () => {
  const columns = [
    {
      title: "진행중",
      color: "#3182ce",
      tasks: [
        { title: "Task 1", description: "Description...", time: "9:41 AM" },
        { title: "Task 2", description: "Description...", time: "10:30 AM" },
      ],
    },
    {
      title: "보류",
      color: "#d69e2e",
      tasks: [
        { title: "Task 3", description: "Description...", time: "11:15 AM" },
      ],
    },
    {
      title: "중단",
      color: "#e53e3e",
      tasks: [
        { title: "Task 4", description: "Description...", time: "2:00 PM" },
      ],
    },
    {
      title: "완료",
      color: "#38a169",
      tasks: [
        { title: "Task 5", description: "Description...", time: "4:30 PM" },
        { title: "Task 6", description: "Description...", time: "5:45 PM" },
      ],
    },
  ];

  return (
    <Container>
      <Header>
        <SearchContainer>
          <SearchInput placeholder="검색" />
          <SearchIcon>돋보기</SearchIcon>
        </SearchContainer>
      </Header>
      <BoardContainer>
        {columns.map((column, index) => (
          <ColumnComponent key={index} {...column} />
        ))}
      </BoardContainer>
    </Container>
  );
};

export default Canbancom;
