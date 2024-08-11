import { useState } from "react";
import * as S from "../styles/index.style";
import ReactDOM from "react-dom";
import { throttle } from "lodash";
import { useCallback } from "react";
import { useRef } from "react";
// import {
//   useGetMTeamUserList,
//   useGetUsersprefix,
//   useInviteTeam,
// } from "../api/Team/useTeam";
const Access = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "a12345",
      email: "aㅁㄴㅇㅁㄴㅇ@aㅁㄴㅇ.com",
      role: "관리자",
      icon: "AA",
      color: "#3366FF",
      dateAdded: "2024-08-10",
      lastLogin: "2024-08-11",
    },
    {
      id: 2,
      name: "b12345",
      email: "-",
      role: "구성원",
      icon: "bb",
      color: "#00A3FF",
      dateAdded: "2024-08-09",
      lastLogin: "2024-08-10",
    },
    {
      id: 3,
      name: "cc12345",
      email: "-",
      role: "관리자",
      icon: "cc",
      color: "#6666FF",
      dateAdded: "2024-08-08",
      lastLogin: "2024-08-09",
    },
    {
      id: 4,
      name: "dd12345",
      email: "-",
      role: "구성원",
      icon: "dd",
      color: "#FF9900",
      dateAdded: "2024-08-07",
      lastLogin: "2024-08-08",
    },
  ]);
  const [isUserAddModalOpen, setIsUserAddModalOpen] = useState(false);
  const Nameinput = useRef();
  const [name, setName] = useState(""); // State for the input value
  const [serchname, setserchName] = useState(""); // State for the input value
  const [nameList, setNameList] = useState([]);
  const [Info, setInfo] = useState([]);
  // const { data: Usersprefix } = useGetUsersprefix();
  // const { data: TeamUserList } = useGetMTeamUserList();
  // const { mutate } = useInviteTeam();
  //api 연결돼서 값 가져오면 연결
  const fetchSuggestions = useCallback(
    throttle((newname) => {
      setNameList(names.filter((name) => name.includes(newname)));
    }, 300), // Throttle interval (in milliseconds)
    []
  );

  const handleChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (newName.trim() == "") return;
    fetchSuggestions(newName); // Call the throttled function with new name
  };

  const submitHandler = async () => {
    console.log();
  };

  const openUserAddModal = () => {
    setNameList([]);
    setInfo([]);
    setName("");
    setIsUserAddModalOpen(true);
  };
  const closeUserAddModal = () => setIsUserAddModalOpen(false);

  const handleRemoveUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleKeyDown = (e) => {
    // Prevent form submission on Enter key
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <S.access.AccessContainer>
      <S.access.AccessTop>
        <S.access.Title>엑세스</S.access.Title>
        <S.access.Button onClick={openUserAddModal}>
          사용자 추가
        </S.access.Button>
      </S.access.AccessTop>
      {isUserAddModalOpen &&
        ReactDOM.createPortal(
          <S.access.ModalOverlay>
            <S.access.ModalContent
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleKeyDown}
              tabIndex="0"
            >
              <h2>프로젝트에 사용자 추가</h2>

              <form onSubmit={(e) => e.preventDefault()}>
                <S.access.ModalSection>
                  <S.access.ModalLabel htmlFor="name">이름</S.access.ModalLabel>
                  <S.access.ModalInput
                    onChange={handleChange} // Handle input change
                    type="text"
                    id="name"
                    placeholder="닉네임"
                    value={name} // Controlled input
                    ref={Nameinput}
                  />
                  {Info && <p>초대받을사람 : {Info}</p>}
                  <div style={{ maxHeight: "200px", overflow: "auto" }}>
                    {nameList.map((name) => (
                      <S.access.nameSpace
                        key={name}
                        onClick={() => setInfo(name)}
                      >
                        {name}
                      </S.access.nameSpace>
                    ))}
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
        )}

      <S.access.SearchContainer>
        <S.access.SearchInput
          onChange={(e) => setserchName(e.target.value)}
          type="text"
          placeholder="이름 검색"
        />
        <S.access.Select>
          <option value="">역할</option>
          <option value="관리자">관리자</option>
          <option value="구성원">구성원</option>
          <option value="조회자">조회자</option>
        </S.access.Select>
      </S.access.SearchContainer>

      <S.access.Table>
        <thead>
          <tr>
            <S.access.Th>이름</S.access.Th>
            <S.access.Th>이메일</S.access.Th>
            <S.access.Th>역할</S.access.Th>
            <S.access.Th>날짜 추가됨</S.access.Th>
            <S.access.Th>작업</S.access.Th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((as) => as.name.includes(serchname))
            .map((user) => (
              <tr key={user.id}>
                <S.access.Td>
                  <S.access.NameCell>
                    <S.access.UserIcon color={user.color}>
                      {user.icon}ㅋㅋ
                    </S.access.UserIcon>
                    {user.name}
                  </S.access.NameCell>
                </S.access.Td>
                <S.access.Td>{user.email}</S.access.Td>
                <S.access.Td>{user.role}</S.access.Td>
                <S.access.Td>{user.dateAdded}</S.access.Td>
                <S.access.Td>
                  <S.access.ActionButton
                    onClick={() => handleRemoveUser(user.id)}
                  >
                    제거
                  </S.access.ActionButton>
                </S.access.Td>
              </tr>
            ))}
        </tbody>
      </S.access.Table>
    </S.access.AccessContainer>
  );
};

export default Access;

const names = [
  "김민준",
  "이서연",
  "박지훈",
  "정하늘",
  "최영수",
  "유지민",
  "강서준",
  "조민아",
  "임동현",
  "오은비",
  "류지호",
  "한지혜",
  "장재훈",
  "송유나",
  "김도영",
  "김가희",
  "이찬혁",
  "박소연",
  "한민호",
  "배진우",
  "장수진",
  "이서진",
  "조현우",
  "문지영",
  "유동규",
  "윤지수",
  "강현빈",
  "이채원",
  "박상훈",
  "서지은",
  "김상철",
  "정미래",
  "홍서준",
  "임수현",
  "오지호",
  "이승호",
  "최은지",
  "조성훈",
  "한지훈",
  "배서연",
  "장민규",
  "유진아",
  "김예린",
  "이영호",
  "박혜리",
  "정우진",
  "송민재",
  "한지연",
  "오성민",
  "이정현",
];
