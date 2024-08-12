import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import * as S from "../styles/index.style";

const Tododetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isExplainEditing, setIsExplainEditing] = useState(false);
    const [showTitleWarning, setShowTitleWarning] = useState(false);
    
    const [title, setTitle] = useState('Title');
    const [explain, setExplain] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

    const INITIAL_STATE = {
        title: 'Title',
        explain: '',
        startDate: '',
        endDate: '',
        status: ''
    };

    const [originalData, setOriginalData] = useState({});

    const dropdownRef = useRef(null);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsStatusDropdownOpen(false);
            }
        };

        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);


    useEffect(() => {
        if (isModalOpen) {
            setOriginalData({ title, explain, startDate, endDate, status });
        }
    }, [isModalOpen]);


    const onSubmit = (e) => {
        e.preventDefault();
        const newTitle = e.target.title.value.trim();
        if (newTitle === '') {
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
        setExplain(newExplain === '' ? '설명을 입력하려면 클릭하세요' : newExplain);
        setIsExplainEditing(false);
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setIsStatusDropdownOpen(false);
    };

    const statusOptions = ['진행전', '진행중', '완료', '지연'];

    // 삭제 버튼 
    const handleDelete = () => {
        setTitle(INITIAL_STATE.title);
        setExplain(INITIAL_STATE.explain);
        setStartDate(INITIAL_STATE.startDate);
        setEndDate(INITIAL_STATE.endDate);
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
        setStatus(originalData.status);
        setIsModalOpen(false);
    };

    // 수정 버튼 
    const handleEdit = () => {
        console.log("수정된 데이터가 저장되었습니다.", { title, explain, startDate, endDate, status });
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>모달창 open 버튼</button>

            {isModalOpen && ReactDOM.createPortal(
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
                                            <S.tododetail.SaveButton type="submit">저장</S.tododetail.SaveButton>
                                            <S.tododetail.CancelButton type="button" onClick={() => setIsEditing(false)}>취소</S.tododetail.CancelButton>
                                        </S.tododetail.ButtonGroup>
                                        {showTitleWarning && <S.tododetail.WarningText>제목을 입력해주세요</S.tododetail.WarningText>}
                                    </form>
                                ) : (
                                    <S.tododetail.Title onClick={() => setIsEditing(true)}>
                                        {title}
                                    </S.tododetail.Title>
                                )}
                            </S.tododetail.TitleContainer>
                            <S.tododetail.DeleteButton onClick={handleDelete}>삭제</S.tododetail.DeleteButton>
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
                                                <S.tododetail.SaveButton type="submit">저장</S.tododetail.SaveButton>
                                                <S.tododetail.CancelButton type="button" onClick={() => setIsExplainEditing(false)}>취소</S.tododetail.CancelButton>
                                            </S.tododetail.ButtonGroup>
                                        </form>
                                    ) : (
                                        <S.tododetail.ExplainContent onClick={() => setIsExplainEditing(true)}>
                                            {explain || '설명 편집'}
                                        </S.tododetail.ExplainContent>
                                    )}
                                </S.tododetail.TodoExplainSection>
                            </S.tododetail.LeftSection>

                            <S.tododetail.RightSection>
                                <S.tododetail.DetailbarItem ref={dropdownRef}>
                                    <S.tododetail.DetailbarTitle>현재상태</S.tododetail.DetailbarTitle>
                                    <S.tododetail.DropdownButton 
                                        onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                                    >
                                        {status || '-'}
                                        <S.tododetail.ArrowIcon $isOpen={isStatusDropdownOpen}>▼</S.tododetail.ArrowIcon>
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
                                    <S.tododetail.DetailbarTitle>시작 날짜</S.tododetail.DetailbarTitle>
                                    <S.tododetail.DetailInput
                                        type="date" 
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </S.tododetail.DetailbarItem>
                                <S.tododetail.DetailbarItem>
                                    <S.tododetail.DetailbarTitle>마감 기한</S.tododetail.DetailbarTitle>
                                    <S.tododetail.DetailInput
                                        type="date" 
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        style={{direction: 'rtl'}}
                                    />
                                </S.tododetail.DetailbarItem>
                            </S.tododetail.RightSection>
                        </S.tododetail.TodoContentWrapper>

                        <S.tododetail.ButtonContainer>
                            <S.tododetail.EditButton onClick={handleEdit}>수정</S.tododetail.EditButton>
                            <S.tododetail.BackButton onClick={handleCancel}>취소</S.tododetail.BackButton>
                        </S.tododetail.ButtonContainer>
                    </S.tododetail.TodoModalContent>
                </S.tododetail.TodoModalOverlay>
                , document.body
            )}
        </>
    );
};

export default Tododetail;