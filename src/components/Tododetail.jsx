import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';
import * as S from "../styles/index.style";
import Xbutton from '../assets/icons/tododetailx.svg?react';

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
    const [manager, setManager] = useState('');

    const { register, handleSubmit, setValue, watch } = useForm();
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
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

    const handleManagerChange = (e) => {
        setManager(e.target.value);
    };

    const explainContent = watch('explain') || explain;

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
                            <S.tododetail.CloseButton onClick={closeModal}><Xbutton /></S.tododetail.CloseButton>
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
                                <S.tododetail.DetailbarItem>
                                    <S.tododetail.DetailbarTitle>담당자</S.tododetail.DetailbarTitle>
                                    <S.tododetail.DetailInput
                                        type="text"
                                        value={manager}
                                        onChange={handleManagerChange}
                                        placeholder="담당자를 입력하세요"
                                    />
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
                    </S.tododetail.TodoModalContent>
                </S.tododetail.TodoModalOverlay>
                , document.body
            )}
        </>
    );
};


export default Tododetail;