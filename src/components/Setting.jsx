    import { useForm } from 'react-hook-form';
    import styled from 'styled-components';
    import SettingIcon from '../assets/icons/settingicon.svg?react'
    
    const Setting = () => {
        const { register, handleSubmit } = useForm({
        });
    
        const onSubmit = (data) => {
        console.log(data);
        };
    
        return (
        <SettingConatainer>
            <IconSection>
                <SwitchIconSection>
                    <SettingIcon/> 
                </SwitchIconSection>
            <IconButton>아이콘 변경</IconButton>
            </IconSection>
    
            <SettingForm onSubmit={handleSubmit(onSubmit)}>
            <Section>
                <SettingLabel htmlFor="name">이름</SettingLabel>
                <SettingInput id="name" {...register('name')} required />
            </Section>
    
            <Section>
                <SettingLabel htmlFor="key">키</SettingLabel>
                <SettingInput id="key" {...register('key')} required />
            </Section>
    
            <Section>
                <SettingLabel htmlFor="projectLeader">프로젝트 리더</SettingLabel>
                <SettingInput id="projectLeader" {...register('projectLeader')} />
            </Section>
    
            <ChargeSection>
                <SettingLabel htmlFor="defaultResponder">기본 담당자</SettingLabel>
                <SettingSelect id="defaultResponder" {...register('defaultResponder')}>
                <option name ="담당자" value="할당되지 않음">할당되지 않음</option>
                <option name ="담당자" value="프로젝트 리더">프로젝트 리더</option>
                </SettingSelect>
            </ChargeSection>
    
            <SubmitButton>저장</SubmitButton>
            </SettingForm>
        </SettingConatainer>
        );
    };
    
    export default Setting;

    const SettingConatainer = styled.div`
    max-width: 400px;
    margin: auto;
    margin-top: 35px;
    padding: 20px;
    `;

    const SettingForm = styled.div`
    display: flex;
    flex-direction: column;
    `;

const IconSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px; 
`;

const SwitchIconSection = styled.div`
    svg {
        width: 140px;
        height: 140px;
    }
`;

const IconButton  = styled.button`
    background-color: #fffafadd;
    cursor: pointer;
    padding: 3px 10px;
    vertical-align: middle;
    width: auto;
    justify-content: center;
    `;

const Section = styled.div`
    margin-bottom: 17px;
`;

const ChargeSection = styled.div`
    margin-bottom: 30px;
`

const SettingLabel = styled.div`
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
    color: #666;
`;

const SettingInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

const SettingSelect = styled.select`
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



const SubmitButton = styled.button`
    margin-left: 140px;
    margin-right: 140px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: #ffffff;
    border-radius: 4px;
    font-size: 16px;
    border: 3px solid #0278AE;
    
`;