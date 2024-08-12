import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';
import * as S from "../styles/index.style";

const Tododetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isExplainEditing, setIsExplainEditing] = useState(false);
    const [showTitleWarning, setShowTitleWarning] = useState(false);
    
    const [title, setTitle] = useState('Title');
    const [originalTitle, setOriginalTitle] = useState('Title');

    const [explain, setExplain] = useState('');
    const [originalExplain, setOriginalExplain] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

    const { register, handleSubmit, setValue, watch } = useForm();
    const dropdownRef = useRef(null);
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
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

    const onSubmit = (data) => {
        if (data.title.trim() === '') {
            setShowTitleWarning(true);
        } else {
            setTitle(data.title);
            setIsEditing(false);
            setShowTitleWarning(false);
        }
    };

    const handleCancel = () => {
        setValue('title', originalTitle);
        setIsEditing(false);
        setShowTitleWarning(false);
    };
    
    const onExplainSubmit = (data) => {
        setExplain(data.explain.trim() === '' ? '설명을 입력하려면 클릭하세요' : data.explain);
        setIsExplainEditing(false);
    };

    const handleExplainCancel = () => {
        setValue('explain', originalExplain);
        setIsExplainEditing(false);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setIsStatusDropdownOpen(false);
    };

    const statusOptions = ['진행전', '진행중', '완료', '지연'];

    const explainContent = watch('explain') || explain;


    const handleEdit = () => {
        console.log("수정 버튼이 클릭되었습니다.");
    };

    const handleDelete = () => {
        console.log("삭제 버튼이 클릭되었습니다.");
    };

    return (
        <>
            <button onClick={openModal}>모달창 open 버튼</button>

            {isModalOpen && ReactDOM.createPortal(
                <S.tododetail.TodoModalOverlay onClick={closeModal}>
                    <S.tododetail.TodoModalContent onClick={(e) => e.stopPropagation()}>
                        <S.tododetail.TodoHeader>
                            <S.tododetail.TitleContainer>
                                {isEditing ? (
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <S.tododetail.TitleInput
                                            {...register('title')}
                                            defaultValue={title}
                                            autoFocus
                                        />
                                        <S.tododetail.ButtonGroup>
                                            <S.tododetail.SaveButton type="submit">저장</S.tododetail.SaveButton>
                                            <S.tododetail.CancelButton type="button" onClick={handleCancel}>취소</S.tododetail.CancelButton>
                                        </S.tododetail.ButtonGroup>
                                        {showTitleWarning && <S.tododetail.WarningText>제목을 입력해주세요</S.tododetail.WarningText>}
                                    </form>
                                ) : (
                                    <S.tododetail.Title onClick={() => {
                                        setIsEditing(true);
                                        setOriginalTitle(title);
                                    }}>
                                        {title}
                                    </S.tododetail.Title>
                                )}
                            </S.tododetail.TitleContainer>
                        </S.tododetail.TodoHeader>

                        <S.tododetail.TodoContentWrapper>
                            <S.tododetail.LeftSection>
                                <S.tododetail.TodoExplainSection>
                                    <S.tododetail.ExplainTitle>설명</S.tododetail.ExplainTitle>
                                    {isExplainEditing ? (
                                        <form onSubmit={handleSubmit(onExplainSubmit)}>
                                            <S.tododetail.ExplainTextarea
                                                {...register('explain')}
                                                defaultValue={explain}
                                                placeholder="설명을 입력하세요"
                                                autoFocus
                                            />
                                            <S.tododetail.ButtonGroup>
                                                <S.tododetail.SaveButton type="submit">저장</S.tododetail.SaveButton>
                                                <S.tododetail.CancelButton type="button" onClick={handleExplainCancel}>취소</S.tododetail.CancelButton>
                                            </S.tododetail.ButtonGroup>
                                        </form>
                                    ) : (
                                        <S.tododetail.ExplainContent onClick={() => {
                                            setIsExplainEditing(true);
                                            setOriginalExplain(explain);
                                        }}>
                                            {explainContent || '설명 편집'}
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
                                        onChange={handleStartDateChange}
                                    />
                                </S.tododetail.DetailbarItem>
                                <S.tododetail.DetailbarItem>
                                    <S.tododetail.DetailbarTitle>마감 기한</S.tododetail.DetailbarTitle>
                                    <S.tododetail.DetailInput
                                        type="date" 
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                        style={{direction: 'rtl'}}
                                    />
                                </S.tododetail.DetailbarItem>
                            </S.tododetail.RightSection>
                        </S.tododetail.TodoContentWrapper>

                        <S.tododetail.ButtonContainer>

                            <S.tododetail.EditButton onClick={handleEdit}>수정</S.tododetail.EditButton>
                            <S.tododetail.DeleteButton onClick={handleDelete}>삭제</S.tododetail.DeleteButton>
                            <S.tododetail.BackButton onClick={closeModal}>취소</S.tododetail.BackButton>

                        </S.tododetail.ButtonContainer>
                    </S.tododetail.TodoModalContent>
                </S.tododetail.TodoModalOverlay>
                , document.body
            )}
        </>
    );
};

export default Tododetail;