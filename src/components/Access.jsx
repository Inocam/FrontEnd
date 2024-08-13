import { useState } from "react";
import * as S from "../styles/index.style";
import SelectUser from "./SelectUser";
import {
  useInviteTeam,
  useDeleteTeam,
  useGetMTeamUserList,
} from "../api/Team/useTeam";
import { useSelector } from "react-redux";
import {} from "../api/Team/useTeam";

const Access = () => {
  const [isUserAddModalOpen, setIsUserAddModalOpen] = useState(false);
  const [serchname, setserchName] = useState(""); // State for the input value
  const { data: TeamUserList, doREfetch } = useGetMTeamUserList();
  const userinfo = useSelector((state) => state.user);
  const { mutate } = useDeleteTeam();
  const { mutate: InviteMutate } = useInviteTeam();
  const openUserAddModal = () => {
    setIsUserAddModalOpen(true);
  };
  const closeUserAddModal = () => setIsUserAddModalOpen(false);

  const handleRemoveUser = (id) => {
    mutate({ targetId: id });
    doREfetch();
  };

  const submitHandler = (e, selectedUser) => {
    e.preventDefault();
    console.log(selectedUser);
    InviteMutate({ targetId: selectedUser.id });
    closeUserAddModal();
  };
  return (
    <S.access.AccessContainer>
      <S.access.AccessTop>
        <S.access.Title>엑세스</S.access.Title>
        <S.access.Button onClick={openUserAddModal}>
          사용자 추가
        </S.access.Button>
      </S.access.AccessTop>
      {isUserAddModalOpen && (
        <SelectUser
          closeUserAddModal={closeUserAddModal}
          submitHandler={submitHandler}
        />
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
          {TeamUserList.filter((as) => as.userName.includes(serchname)).map(
            (user) => (
              <tr key={user.email}>
                <S.access.Td>
                  <S.access.NameCell>
                    <S.access.UserIcon color={user.color}>
                      {user.icon}
                    </S.access.UserIcon>
                    {user.userName}
                  </S.access.NameCell>
                </S.access.Td>
                <S.access.Td>{user.email}</S.access.Td>
                <S.access.Td>{"구성원"}</S.access.Td>
                <S.access.Td>{user.dateAdded}</S.access.Td>
                <S.access.Td>
                  {user.userId != userinfo.TeamLeader &&
                    user.userId != userinfo.Id && (
                      <S.access.ActionButton
                        onClick={() => handleRemoveUser(user.userId)}
                      >
                        제거
                      </S.access.ActionButton>
                    )}
                </S.access.Td>
              </tr>
            )
          )}
        </tbody>
      </S.access.Table>
    </S.access.AccessContainer>
  );
};

export default Access;
