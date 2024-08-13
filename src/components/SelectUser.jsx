import { useState, useRef, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import * as S from "../styles/index.style";
import { useGetUsersprefix } from "../api/Team/useTeam";

const SelectUser = ({ closeUserAddModal, submitHandler }) => {
  const [name, setName] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [debouncedName, setDebouncedName] = useState("");
  const nameInput = useRef();
  const {
    data: usersPrefix,
    isLoading,
    error,
  } = useGetUsersprefix(debouncedName);

  // 디바운스 처리
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedName(name), 300);
    return () => clearTimeout(timer);
  }, [name]);

  const handleChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleUserSelect = useCallback((user) => {
    setSelectedUser(user);
    setName(user.email);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return ReactDOM.createPortal(
    <S.access.ModalOverlay>
      <S.access.ModalContent
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex="0"
      >
        <h2>사용자 초대</h2>

        <form onSubmit={(e) => submitHandler(e, selectedUser)}>
          <S.access.ModalSection>
            <S.access.ModalLabel htmlFor="name">이름</S.access.ModalLabel>
            <S.access.ModalInput
              onChange={handleChange}
              type="text"
              id="name"
              placeholder="닉네임"
              value={name}
              ref={nameInput}
            />
            {selectedUser && <p>초대받을사람 : {selectedUser.email}</p>}
            <div style={{ maxHeight: "200px", overflow: "auto" }}>
              {isLoading && <p>검색 중...</p>}
              {error && <p>오류가 발생했습니다: {error.message}</p>}
              {!isLoading && !error && usersPrefix ? (
                usersPrefix.map((user) => (
                  <S.access.nameSpace
                    key={user.email}
                    onClick={() => handleUserSelect(user)}
                  >
                    {user.email}
                  </S.access.nameSpace>
                ))
              ) : (
                <p>검색 결과가 없습니다.</p>
              )}
            </div>
          </S.access.ModalSection>
          <S.access.ModalButtonSet>
            <S.access.ModalCancelButton onClick={closeUserAddModal}>
              취소
            </S.access.ModalCancelButton>
            <S.access.ModalAddButton>추가</S.access.ModalAddButton>
          </S.access.ModalButtonSet>
        </form>
      </S.access.ModalContent>
    </S.access.ModalOverlay>,
    document.body
  );
};

export default SelectUser;
