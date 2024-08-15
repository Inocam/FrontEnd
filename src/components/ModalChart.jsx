import { useState, useEffect } from "react";
import styled from "styled-components";
import * as C from "./chart/index.chart";
import { useGetMTeamUserList } from "../api/Team/useTeam";
import { useGetTaskstatuscount } from "../api/task/useTask";
const DashboardContainer = styled.div`
  height: 80%;
  overflow-y: auto;
  position: absolute;
  top: 10%;
  right: 0;
  padding: 2rem;
  transition: all 0.5s ease-in-out;
  transform: ${({ $isVisible }) =>
    $isVisible ? "translateX(0)" : "translateX(100%)"};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  background-color: aliceblue;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;
const HeaderCard = styled(Card)`
  width: 620px;
`;

const CardHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eaeaea;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  color: #0066cc;
`;

const StatLabel = styled.p`
  margin: 0;
  color: #666;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #333;
`;
const EnhancedTeamOverview = ({ isLoading, TeamId, createDate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { data } = useGetMTeamUserList(TeamId);
  const { TaskStatuscount } = useGetTaskstatuscount({
    TeamId,
    createDate: createDate.split("T")[0],
  });
  const sum = Object.values(TaskStatuscount).reduce(
    (acc, value) => acc + value,
    0
  );
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isLoading]);

  return (
    <>
      <DashboardContainer $isVisible={isVisible}>
        <HeaderCard>
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <GridContainer>
              <StatItem>
                <StatValue>{TaskStatuscount["delay"] || 0}</StatValue>
                <StatLabel>Delay Projects</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{data.length}</StatValue>
                <StatLabel>팀 멤버수</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{TaskStatuscount["ongoing"] || 0}</StatValue>
                <StatLabel>Ongoing Projects</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  {parseInt((TaskStatuscount["done"] / sum) * 100) || 0}%
                </StatValue>
                <StatLabel>project Complete</StatLabel>
              </StatItem>
            </GridContainer>
          </CardContent>
        </HeaderCard>

        <GridContainer>
          <Card>
            <CardHeader>
              <CardTitle>이번달 요약</CardTitle>
            </CardHeader>
            <CardContent>
              <C.BarChart TeamId={TeamId}></C.BarChart>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>전체프로젝트 상황</CardTitle>
            </CardHeader>
            <CardContent>
              <C.DonutChart data={TaskStatuscount}></C.DonutChart>
            </CardContent>
          </Card>
        </GridContainer>

        <HeaderCard>
          <CardHeader>
            <CardTitle>달별 일정 갯수</CardTitle>
          </CardHeader>
          <CardContent>
            <C.Lastweek TeamId={TeamId}></C.Lastweek>
          </CardContent>
        </HeaderCard>
      </DashboardContainer>
    </>
  );
};

// 부모 컴포넌트
const MDashboard = ({ TeamId, isLoading, setItemHandler, createDate }) => {
  console.log(createDate);
  return (
    <>
      {isLoading && <LoadingOverlay>Loading...</LoadingOverlay>}
      <LoadingOverlay onClick={setItemHandler}>
        <div onClick={(e) => e.stopPropagation()}>
          <EnhancedTeamOverview
            createDate={createDate}
            TeamId={TeamId}
            isLoading={isLoading}
          />
        </div>
      </LoadingOverlay>
    </>
  );
};

export default MDashboard;
