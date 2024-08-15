import { useState } from "react";
import * as S from "../styles/index.style";
import UserIcon from "../assets/icons/user.svg";
import { useCreateTask } from "../api/task/useCreateTask.jsx";
import { useSelector } from "react-redux";
const AddSchedule = ({ onClickHandler, mutate }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("진행 전");
  const user = useSelector((state) => state.user);
  const handleSubmit = async () => {
    const payload = {
      teamId: user.TeamId,
      userId: user.Id,
      title: title,
      description: details,
      status:
        status == "진행 전"
          ? "todo"
          : status == "진행 중"
          ? "ongoing"
          : status == "완료"
          ? "done"
          : "delay",
      startDate: startDate,
      dueDate: endDate,
      endDate: "",
      parentTask: null,
    };
    mutate(payload);
    onClickHandler();
  };

  return (
    <S.addschedule.ModalOverlay>
      <S.addschedule.Container>
        <S.addschedule.Section>
          <S.addschedule.SectionItem>
            <S.addschedule.Label>일정 제목</S.addschedule.Label>
            <S.addschedule.Input
              type="text"
              placeholder="일정 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <S.addschedule.Image src={UserIcon} alt="작성자 이미지" />
          </S.addschedule.SectionItem>
        </S.addschedule.Section>
        <S.addschedule.Section>
          <S.addschedule.SectionItem>
            <S.addschedule.Label>시작일자</S.addschedule.Label>
            <S.addschedule.Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </S.addschedule.SectionItem>
        </S.addschedule.Section>
        <S.addschedule.Section>
          <S.addschedule.SectionItem>
            <S.addschedule.Label>마감일자</S.addschedule.Label>
            <S.addschedule.Input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </S.addschedule.SectionItem>
        </S.addschedule.Section>
        <S.addschedule.Section>
          <S.addschedule.SectionItem>
            <S.addschedule.Label>일정 상세</S.addschedule.Label>
            <S.addschedule.TextArea
              placeholder="일정 상세 내용을 입력하세요"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </S.addschedule.SectionItem>
        </S.addschedule.Section>
        <S.addschedule.Section>
          <S.addschedule.SectionItem>
            <S.addschedule.Label>진행 상황</S.addschedule.Label>
            {/* todo ongoing done delay */}
            <div>
              {["진행 전", "진행 중", "완료", "지연"].map((statusOption) => (
                <S.addschedule.Button
                  key={statusOption}
                  selected={status === statusOption}
                  onClick={() => setStatus(statusOption)}
                >
                  {statusOption}
                </S.addschedule.Button>
              ))}
            </div>
          </S.addschedule.SectionItem>
        </S.addschedule.Section>
        <S.addschedule.ButtonGroup>
          <S.addschedule.Button
            onClick={() => {
              onClickHandler();
            }}
          >
            취소
          </S.addschedule.Button>
          <S.addschedule.Button onClick={handleSubmit}>
            저장
          </S.addschedule.Button>
        </S.addschedule.ButtonGroup>
      </S.addschedule.Container>
    </S.addschedule.ModalOverlay>
  );
};

export default AddSchedule;
