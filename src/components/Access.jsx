import ReactDOM from "react-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

import * as S from "../styles/index.style";


const Access = () => {
    const [isUserAddModalOpen, setIsUserAddModalOpen] = useState(false);
    const { reset } = useForm();

    const [selectedRoles, setSelectedRoles] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const roles = ["관리자", "구성원", "조회자"];

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
                                <S.access.ModalSection>
                                    <S.access.ModalLabel htmlFor="이름 또는 이메일">이름 또는 이메일</S.access.ModalLabel>
                                    <S.access.alInput type="text" placeholder="ex) A, a@a.com" />
                                </S.access.ModalSection>

                                <S.access.ModalSection>
                                    <S.access.ModalLabel>Role</S.access.ModalLabel>
                                    <S.access.ModalSelect placeholder="역할">
                                        <option value="관리자">관리자</option>
                                        <option value="구성원">구성원</option>
                                        <option value="조회자">조회자</option>
                                    </S.access.ModalSelect>
                                </S.access.ModalSection>
                
                                <S.access.ModalButtonSet>
                                    <S.access.ModalCancelButton onClick={closeUserAddModal}>취소</S.access.ModalCancelButton>
                                    <S.access.ModalAddButton>추가</S.access.ModalAddButton>
                                </S.access.ModalButtonSet>
                            </S.access.ModalContent>
                        </S.access.ModalOverlay>
                    ,document.body
                )}
            </div>

            <S.access.SearchContainer>
                <S.access.SearchInput placeholder="역할 검색" />
                <S.access.DropdownContainer>
                    <S.access.DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        {selectedRoles.length > 0 ? selectedRoles.join(", ") : "역할"}
                        <S.access.ArrowIcon isOpen={isDropdownOpen}>▼</S.access.ArrowIcon>
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
                        <tr>
                            <S.access.Td>
                                <S.access.NameCell>
                                    <S.access.UserIcon color="#3366FF">AA</S.access.UserIcon>
                                    a12345
                                </S.access.NameCell>
                            </S.access.Td>
                            <S.access.Td>a@a.com</S.access.Td>
                            <S.access.Td>
                                <S.access.RoleSelect defaultValue="관리자">
                                    <option value="관리자">관리자</option>
                                    <option value="구성원">구성원</option>
                                    <option value="조회자">조회자</option>
                                </S.access.RoleSelect>
                            </S.access.Td>
                            <S.access.Td><S.access.ActionButton>제거</S.access.ActionButton></S.access.Td>
                        </tr>
                        <tr>
                            <S.access.Td>
                                <S.access.NameCell>
                                    <S.access.UserIcon color="#00A3FF">bb</S.access.UserIcon>
                                    b12345
                                </S.access.NameCell>
                            </S.access.Td>
                            <S.access.Td>-</S.access.Td>
                            <S.access.Td>
                                <S.access.RoleSelect defaultValue="구성원">
                                    <option value="관리자">관리자</option>
                                    <option value="구성원">구성원</option>
                                    <option value="조회자">조회자</option>
                                </S.access.RoleSelect>
                            </S.access.Td>
                            <S.access.Td><S.access.ActionButton>제거</S.access.ActionButton></S.access.Td>
                        </tr>
                        <tr>
                            <S.access.Td>
                                <S.access.NameCell>
                                    <S.access.UserIcon color="#6666FF">cc</S.access.UserIcon>
                                    cc12345
                                </S.access.NameCell>
                            </S.access.Td>
                            <S.access.Td>-</S.access.Td>
                            <S.access.Td>
                                <S.access.RoleSelect defaultValue="관리자">
                                    <option value="관리자">관리자</option>
                                    <option value="구성원">구성원</option>
                                    <option value="조회자">조회자</option>
                                </S.access.RoleSelect>
                            </S.access.Td>
                            <S.access.Td><S.access.ActionButton>제거</S.access.ActionButton></S.access.Td>
                        </tr>
                        <tr>
                            <S.access.Td>
                                <S.access.NameCell>
                                    <S.access.UserIcon color="#FF9900">dd</S.access.UserIcon>
                                    dd12345
                                </S.access.NameCell>
                            </S.access.Td>
                            <S.access.Td>-</S.access.Td>
                            <S.access.Td>
                                <S.access.RoleSelect defaultValue="구성원">
                                    <option value="관리자">관리자</option>
                                    <option value="구성원">구성원</option>
                                    <option value="조회자">조회자</option>
                                </S.access.RoleSelect>
                            </S.access.Td>
                            <S.access.Td><S.access.ActionButton>제거</S.access.ActionButton></S.access.Td>
                        </tr>
                    </tbody>
                </S.access.Table>
            </S.access.TableContainer>
        </S.access.AccessContainer>
    );
};

export default Access;