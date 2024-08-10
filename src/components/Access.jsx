import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as S from "../styles/index.style";
import axios from "axios";

const Access = () => {
    const [isUserAddModalOpen, setIsUserAddModalOpen] = useState(false);
    const { reset } = useForm();
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [name, setName] = useState("")
    const [nameList, setNameList] = useState([])

    const roles = ["관리자", "구성원", "조회자"];

    const [users, setUsers] = useState([]);

    const openUserAddModal = () => setIsUserAddModalOpen(true);
    const closeUserAddModal = () => {
        setIsUserAddModalOpen(false);
        reset();
    };
    
    const CloseUserAddModal = (e) => {
        if (e.target === e.currentTarget) {
            closeUserAddModal();
        }
    };

    const handleRoleToggle = (role) => {
        setSelectedRoles(prevRoles => 
            prevRoles.includes(role)
                ? prevRoles.filter(r => r !== role)
                : [...prevRoles, role]
        );
    };

    const fetchData = async () => {
        try {
            const response = await axios.get("https://footapi.o-r.kr/foot/teams/3/members");
            setUsers(response.data);
        } catch (error) {
            console.error("There was an error fetching the users!", error);
        }
    };
    const fetchNameData = async () => {
        try {
            const response = await axios.get(`https://footapi.o-r.kr/api/user/users?prefix=${name}`);
            setUsers(response.data);
        } catch (error) {
            console.error("There was an error fetching the users!", error);
        }
    };
    
    useEffect(()=>{
        setNameList(fetchNameData(name))
    },[name]);


    const  submitHandler  = async () => {
        try {
            const response = await axios.post("https://footapi.o-r.kr/foot/teams/invite",{
                status: "안받음",
                teamId: 0,
                userId: 0,//위 api로 받아오는데이터 
                requesterId: 0
            });
            console.log(response)
        } catch(error) {
            console.error("There was an error adding the user!", error);
        }
        
    };





    return (
        <S.access.AccessContainer>
            <div>
                <S.access.AccessTop>
                    <h1>엑세스</h1>
                    <S.access.UserAddButton onClick={openUserAddModal}>사용자 추가</S.access.UserAddButton>
                </S.access.AccessTop>

                {isUserAddModalOpen &&
                    ReactDOM.createPortal(
                        <S.access.ModalOverlay onClick={CloseUserAddModal}>
                            <S.access.ModalContent onClick={(e) => e.stopPropagation()}>
                                <h2>프로젝트에 사용자 추가</h2>

                                <form >
                                    
                                <S.access.ModalSection>
                                    <S.access.ModalLabel htmlFor="name">이름</S.access.ModalLabel>
                                    <S.access.ModalInput onChange={(e)=>setName(e.target.value)} type="text" id="name" placeholder="A" />
                                </S.access.ModalSection>
                                <div>
                                    {nameList.map((data)=>{
                                        <p onClick={onclickHandler}>{data}</p>
                                    })}
                                </div>

                
                                <S.access.ModalButtonSet>
                                    <S.access.ModalCancelButton onClick={closeUserAddModal}>취소</S.access.ModalCancelButton>
                                    <S.access.ModalAddButton>추가</S.access.ModalAddButton>
                                </S.access.ModalButtonSet>

                                </form>

                            </S.access.ModalContent>
                        </S.access.ModalOverlay>,
                        document.body
                    )
                }
            </div>

            <S.access.SearchContainer>
                <S.access.SearchInput placeholder="역할 검색" />
                <S.access.DropdownContainer>
                    <S.access.DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        {selectedRoles.length > 0 ? selectedRoles.join(", ") : "역할"}
                        <S.access.ArrowIcon $isOpen={isDropdownOpen}>▼</S.access.ArrowIcon>
                    </S.access.DropdownButton>
                    {isDropdownOpen && (
                        <S.access.DropdownMenu>
                            {roles.map((role) => (
                                <S.access.DropdownItem key={role} onClick={() => handleRoleToggle(role)}>
                                    <S.access.Checkbox 
                                        type="checkbox" 
                                        checked={selectedRoles.includes(role)} 
                                        onChange={() => {}} 
                                    />
                                    {role}
                                </S.access.DropdownItem>
                            ))}
                        </S.access.DropdownMenu>
                    )}
                </S.access.DropdownContainer>
            </S.access.SearchContainer>

            <S.access.TableContainer>
                <S.access.Table>
                    <thead>
                        <tr>
                            <S.access.Th>이름</S.access.Th>
                            <S.access.Th>이메일</S.access.Th>
                            <S.access.Th>역할</S.access.Th>
                            <S.access.Th>작업</S.access.Th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                        <tr key={user.userId}>
                            <S.access.Td>
                                <S.access.NameCell>
                                    <S.access.UserIcon color="#b2d367">{user.teamId}</S.access.UserIcon>
                                    {user.userId}
                                </S.access.NameCell>
                            </S.access.Td>
                            <S.access.Td>{user.userName}</S.access.Td>
                            <S.access.Td>
                                <S.access.RoleSelect defaultValue="관리자">
                                    <option value="관리자">관리자</option>
                                    <option value="구성원">구성원</option>
                                    <option value="조회자">조회자</option>
                                </S.access.RoleSelect>
                            </S.access.Td>
                            <S.access.Td><S.access.ActionButton>제거</S.access.ActionButton></S.access.Td>
                        </tr>
                        ))}
                    </tbody>
                </S.access.Table>
            </S.access.TableContainer>
        </S.access.AccessContainer>
    );
};

export default Access;