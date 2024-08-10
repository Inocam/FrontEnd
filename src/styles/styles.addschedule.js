import styled from "styled-components";

export const Container = styled.div`
  padding: 44px 24px;
  display: flex; 
  flex-direction: column;
  width: 100%;
  max-width: 1040px;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Section = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #EAEAEA;
  margin: 4px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &.no-background {
    background-color: transparent;
    box-shadow: none;
  }
`;

export const SectionItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Label = styled.label`
  flex: 1;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  padding: 5px;
  margin: 0px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #0278AE;
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  padding: 12px;
  margin-left: 4px;
  height: 100px;
  min-height: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;

  &:focus {
    border-color: #0278AE;
    outline: none;
  }
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const Button = styled.bus.Container = styled.div`
padding: 44px 24px;
display: flex; 
flex-direction: column;
width: 100%;
max-width: 1040px;
height: 100%;
box-sizing: border-box;
`;

s.Section = styled.div`
padding: 20px;
height: 100%;
display: flex;
align-items: center;
background-color: #EAEAEA;
margin: 4px;
`;

s.SectionItem = styled.div`
display: flex;
align-items: center;
`;

s.Label = styled.label`
flex: 1;
font-weight: bold;
`;

s.Input = styled.input`
padding: 5px;
margin: 0px 20px;
border: 0;
`;

s.TextArea = styled.textarea`
padding: 12px;
margin-left: 4px;
height: 100px;
border: 0;
`;

s.Image = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`;

s.Button = styled.button`
padding: 10px 20px;
margin: 5px;
border: none;
border-radius: 5px;
cursor: pointer;
background-color: ${props => props.selected ? '#0278AE' : '#fff'};
color: ${props => props.selected ? '#fff' : '#000'};
border: 1px solid ${props => props.selected ? '#0278AE' : '#ccc'};

&:hover {
  opacity: 0.8;
}
`;tton`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => props.color ? 'transparent' : (props.selected ? '#0278AE' : '#fff')};
  color: ${props => props.color ? props.color : (props.selected ? '#fff' : '#000')};
  border: 1px solid ${props => props.color ? props.color : (props.selected ? '#0278AE' : '#ccc')};

  &:hover {
    opacity: 0.8;
  }
`;
