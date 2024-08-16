import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import * as S from "../styles/index.style";
import _ from "lodash";
import { useTaskupDate } from "../api/task/useTask";
const Tododetail = ({ data, setIsModalOpen, isModalOpen }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExplainEditing, setIsExplainEditing] = useState(false);
  const [showTitleWarning, setShowTitleWarning] = useState(false);

  const [title, setTitle] = useState(data.title);
  const [explain, setExplain] = useState(data.description);
  const [startDate, setStartDate] = useState(data.startDate);
  const [dueDate, setDueDate] = useState(data.dueDate);
  const [endDate, setEndDate] = useState(data.endDate);
  const [status, setStatus] = useState(data.status);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const { mutate } = useTaskupDate();
  const INITIAL_STATE = {
    title: data.title,
    explain: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    dueDate: data.dueDate,
    status: data.status,
  };
  console.log(data);
  const [originalData, setOriginalData] = useState({});

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newTitle = e.target.title.value.trim();
    if (newTitle === "") {
      setShowTitleWarning(true);
    } else {
      setTitle(newTitle);
      setIsEditing(false);
      setShowTitleWarning(false);
    }
  };

  const onExplainSubmit = (e) => {
    e.preventDefault();
    const newExplain = e.target.explain.value.trim();
    setExplain(newExplain === "" ? "설명을 입력하려면 클릭하세요" : newExplain);
    setIsExplainEditing(false);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsStatusDropdownOpen(false);
  };

  const statusOptions = ["todo", "ongoing", "done", "delay"];

  // 삭제 버튼
  const handleDelete = () => {
    setTitle(INITIAL_STATE.title);
    setExplain(INITIAL_STATE.explain);
    setStartDate(INITIAL_STATE.startDate);
    setEndDate(INITIAL_STATE.endDate);
    setDueDate(INITIAL_STATE.dueDate);
    setStatus(INITIAL_STATE.status);
    setIsModalOpen(false);
    console.log("모든 정보가 초기화되었습니다.");
  };

  // 취소 버튼
  const handleCancel = () => {
    setTitle(originalData.title);
    setExplain(originalData.explain);
    setStartDate(originalData.startDate);
    setEndDate(originalData.endDate);
    setDueDate(INITIAL_STATE.dueDate);
    setStatus(originalData.status);
    setIsModalOpen(false);
  };

  // 수정 버튼
  const handleEdit = () => {
    const beforeData = { ...data };
    const afterData = {
      ...data,
      title: title,
      description: explain,
      startDate: startDate,
      endDate: endDate,
      dueDate: dueDate,
      status: status,
    };
    if (_.isEqual(beforeData, afterData)) {
      console.log("같음");
      setIsModalOpen("false");
    } else {
      console.log("다름");
      mutate(afterData);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {isModalOpen &&
        ReactDOM.createPortal(
          <S.tododetail.TodoModalOverlay onClick={() => setIsModalOpen(false)}>
            <S.tododetail.TodoModalContent onClick={(e) => e.stopPropagation()}>
              <S.tododetail.TodoHeader>
                <S.tododetail.TitleContainer>
                  {isEditing ? (
                    <form onSubmit={onSubmit}>
                      <S.tododetail.TitleInput
                        name="title"
                        defaultValue={title}
                        autoFocus
                      />
                      <S.tododetail.ButtonGroup>
                        <S.tododetail.SaveButton type="submit">
                          저장
                        </S.tododetail.SaveButton>
                        <S.tododetail.CancelButton
                          type="button"
                          onClick={() => setIsEditing(false)}
                        >
                          취소
                        </S.tododetail.CancelButton>
                      </S.tododetail.ButtonGroup>
                      {showTitleWarning && (
                        <S.tododetail.WarningText>
                          제목을 입력해주세요
                        </S.tododetail.WarningText>
                      )}
                    </form>
                  ) : (
                    <S.tododetail.Title onClick={() => setIsEditing(true)}>
                      {title}
                    </S.tododetail.Title>
                  )}
                </S.tododetail.TitleContainer>
                <S.tododetail.DeleteButton onClick={handleDelete}>
                  삭제
                </S.tododetail.DeleteButton>
              </S.tododetail.TodoHeader>

              <S.tododetail.TodoContentWrapper>
                <S.tododetail.LeftSection>
                  <S.tododetail.TodoExplainSection>
                    <S.tododetail.ExplainTitle>설명</S.tododetail.ExplainTitle>
                    {isExplainEditing ? (
                      <form onSubmit={onExplainSubmit}>
                        <S.tododetail.ExplainTextarea
                          name="explain"
                          defaultValue={explain}
                          placeholder="설명을 입력하세요"
                          autoFocus
                        />
                        <S.tododetail.ButtonGroup>
                          <S.tododetail.SaveButton type="submit">
                            저장
                          </S.tododetail.SaveButton>
                          <S.tododetail.CancelButton
                            type="button"
                            onClick={() => setIsExplainEditing(false)}
                          >
                            취소
                          </S.tododetail.CancelButton>
                        </S.tododetail.ButtonGroup>
                      </form>
                    ) : (
                      <S.tododetail.ExplainContent
                        onClick={() => setIsExplainEditing(true)}
                      >
                        {explain || "설명 편집"}
                      </S.tododetail.ExplainContent>
                    )}
                  </S.tododetail.TodoExplainSection>
                </S.tododetail.LeftSection>

                <S.tododetail.RightSection>
                  <S.tododetail.DetailbarItem ref={dropdownRef}>
                    <S.tododetail.DetailbarTitle>
                      현재상태
                    </S.tododetail.DetailbarTitle>
                    <S.tododetail.DropdownButton
                      onClick={() =>
                        setIsStatusDropdownOpen(!isStatusDropdownOpen)
                      }
                    >
                      {status || "-"}
                      <S.tododetail.ArrowIcon $isOpen={isStatusDropdownOpen}>
                        ▼
                      </S.tododetail.ArrowIcon>
                    </S.tododetail.DropdownButton>
                    {isStatusDropdownOpen && (
                      <S.tododetail.DropdownContent>
                        {statusOptions.map((option) => (
                          <S.tododetail.DropdownItem
                            key={option}
                            onClick={() => handleStatusChange(option)}
                          >
                            {option}
                          </S.tododetail.DropdownItem>
                        ))}
                      </S.tododetail.DropdownContent>
                    )}
                  </S.tododetail.DetailbarItem>

                  <S.tododetail.DetailbarItem>
                    <S.tododetail.DetailbarTitle>
                      시작 날짜
                    </S.tododetail.DetailbarTitle>
                    <S.tododetail.DetailInput
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </S.tododetail.DetailbarItem>
                  <S.tododetail.DetailbarItem>
                    <S.tododetail.DetailbarTitle>
                      마감 기한
                    </S.tododetail.DetailbarTitle>
                    <S.tododetail.DetailInput
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      style={{ direction: "rtl" }}
                    />
                  </S.tododetail.DetailbarItem>
                  <S.tododetail.DetailbarItem>
                    <S.tododetail.DetailbarTitle>
                      완료날짜
                    </S.tododetail.DetailbarTitle>
                    <S.tododetail.DetailInput
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      style={{ direction: "rtl" }}
                    />
                  </S.tododetail.DetailbarItem>
                </S.tododetail.RightSection>
              </S.tododetail.TodoContentWrapper>

              <S.tododetail.ButtonContainer>
                <S.tododetail.EditButton onClick={handleEdit}>
                  수정
                </S.tododetail.EditButton>
                <S.tododetail.BackButton onClick={handleCancel}>
                  취소
                </S.tododetail.BackButton>
              </S.tododetail.ButtonContainer>
            </S.tododetail.TodoModalContent>
          </S.tododetail.TodoModalOverlay>,
          document.body
        )}
    </>
  );
};

export default Tododetail;
