import { useState } from "react";
import styled from "styled-components";
import { ChevronDown, ChevronUp } from "lucide-react";
import Tododetail from "../../components/Tododetail";

const Card = styled.div`
  width: 100%;
  margin: 20px auto;
  border-radius: 12px;
  background-color: white;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const CardHeader = styled.div`
  background-color: #f8f9fa;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const DueDate = styled.span`
  font-size: 14px;
  color: #666;
`;

const CardContent = styled.div`
  padding: 0 16px;
  max-height: ${(props) => (props.$isOpen ? "300px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
`;

const InfoItem = styled.p`
  margin: 12px 0;
  font-size: 14px;
  color: #444;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  font-weight: 600;
  color: #222;
`;

const ExpandableScheduleCard = ({ scheduleData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <Card>
        <CardHeader onClick={toggleOpen}>
          <Title>{scheduleData.title}</Title>
          <div style={{ display: "flex", alignItems: "center" }}>
            <DueDate>마감: {scheduleData.dueDate}</DueDate>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </CardHeader>
        <CardContent $isOpen={isOpen} onClick={() => setIsModalOpen(true)}>
          <InfoItem>
            <Label>설명:</Label> {scheduleData.description}
          </InfoItem>
          <InfoItem>
            <Label>상태:</Label> {scheduleData.status}
          </InfoItem>
          <InfoItem>
            <Label>시작일:</Label> {scheduleData.startDate}
          </InfoItem>
          <InfoItem>
            <Label>종료일:</Label> {scheduleData.endDate || "지정되지 않음"}
          </InfoItem>
        </CardContent>
      </Card>
      {isModalOpen && (
        <Tododetail
          data={scheduleData}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen} 
        />
      )}
    </div>
  );
};

export default ExpandableScheduleCard;
