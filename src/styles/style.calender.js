import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  min-height: 30vh;
  width: 100%;
  margin-right: 160px;
  margin-left: 160px;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
  width: 65%;
`;
export const BCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
`;
export const InfoCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
  width: 34%;
`;

export const CardHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

export const CardContent = styled.div`
  padding: 1rem;
`;

export const ProgressContainer = styled.div`
  margin-bottom: 1rem;
`;

export const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

export const ProgressBar = styled.div`
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background-color: #3b82f6;
  width: ${(props) => props.$progress}%;
`;

export const CardFlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Taskcard = styled.div`
  p {
    font-size: small;
  }
`;

export const CalendarWrapper = styled.div`
  width: 100%;
`;

export const Fdiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  border: none;
  padding: 4px 15px;
  cursor: pointer;
`;

export const Title = styled.h2`
  font-size: 18px;
  width: 100%;
  font-weight: bold;
  display: flex;
  justify-content: space-around;
`;

export const CalendarGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1px;
`;

export const DayHeader = styled.div`
  text-align: center;
  font-weight: bold;
  width: 14%;
`;

export const Day = styled.div`
  text-align: start;
  width: 14%;
  height: 100px;
  padding-left: 1%;
  padding-top: 0.5%;
  border: 1px solid #e5e7eb;
  cursor: pointer;
`;
