import styled from "styled-components";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 35px;
  background-color: #0278ae;
  color: white;
  min-width: 1200px;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 5px;
  svg {
    width: 120px;
    height: 60px;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-left: 60px;
`;

export const NavItems = styled.div`
  display: flex;
  gap: 25px;
`;

export const NavItem = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const LogoutButton = styled.button`
  background-color: white;
  color: #000000;
  border: none;
  padding: 7px 17px;
  border-radius: 10px;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  svg{
    width: 30px;
    height: 30px;

  }
`;

export const ProjectDropdown = styled.div`
  position: absolute;
  top: 64px;
  left: 210px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
`;

export const TeamDropdown = styled.div`
  position: absolute;
  top: 64px;
  left: 320px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
`;

export const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
