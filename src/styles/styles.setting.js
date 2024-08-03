import styled from "styled-components";

export const SettingConatainer = styled.div`
max-width: 400px;
margin: auto;
margin-top: 35px;
padding: 20px;
`;

export const SettingForm = styled.div`
display: flex;
flex-direction: column;
`;

export const IconSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 20px; 
`;

export const SwitchIconSection = styled.div`
svg {
    width: 140px;
    height: 140px;
}
`;

export const IconButton  = styled.button`
background-color: #f1f1f189;
cursor: pointer;
padding: 8px 10px;
vertical-align: middle;
width: auto;
justify-content: center;
border: none;

&:hover{
background-color: #F1F1F1;
}
`;

export const Section = styled.div`
margin-bottom: 17px;
`;

export const ChargeSection = styled.div`
margin-bottom: 30px;
`

export const SettingLabel = styled.div`
display: block;
margin-bottom: 8px;
font-size: 16px;
color: #666;
`;

export const SettingInput = styled.input`
width: 100%;
padding: 10px;
border: 1px solid #ddd;
border-radius: 4px;
font-size: 16px;
`;

export const SettingSelect = styled.select`
width: 100%;
padding: 10px;
font-size: 16px;
border: 1px solid #ccc;
border-radius: 4px;
background-color: white;
cursor: pointer;
outline: none;

&:hover {
border-color: #888;
}
`;

export const Option = styled.option`
padding: 10px;
cursor: pointer;
&:hover {
background-color: #f0f0f0;
}
`

export const SubmitButton = styled.button`
margin-left: 140px;
margin-right: 140px;
padding: 5px 10px;
cursor: pointer;
background-color: white;
border-radius: 4px;
font-size: 16px;
border: 3px solid #0278AE;

&:hover{
    background-color: #0278AE;
    color: white
}
`;