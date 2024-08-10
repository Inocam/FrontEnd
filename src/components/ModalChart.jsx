import { useState, useEffect } from "react";
import styled from "styled-components";

const DashboardContainer = styled.div`
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
const EnhancedTeamOverview = ({ isLoading }) => {
  const [isVisible, setIsVisible] = useState(false);

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
                <StatValue>12</StatValue>
                <StatLabel>Active Teams</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>48</StatValue>
                <StatLabel>Team Members</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>8</StatValue>
                <StatLabel>Ongoing Projects</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>92%</StatValue>
                <StatLabel>Team Productivity</StatLabel>
              </StatItem>
            </GridContainer>
          </CardContent>
        </HeaderCard>

        <GridContainer>
          <Card>
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Composition</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </GridContainer>

        {/* KPI 및 Upcoming Milestones 카드도 유사한 방식으로 구현 */}
      </DashboardContainer>
    </>
  );
};

// 부모 컴포넌트
const MDashboard = ({ isLoading, setItemHandler }) => {
  return (
    <>
      {isLoading && <LoadingOverlay>Loading...</LoadingOverlay>}
      <LoadingOverlay onClick={()=>setItemHandler()}>
        <EnhancedTeamOverview isLoading={isLoading} />
      </LoadingOverlay>
    </>
  );
};

export default MDashboard;
