
    import { useForm } from 'react-hook-form';

    import * as S from "../styles/index.style";
    import * as L from "../assets/icons/index.Logo";
    
    const Setting = () => {
        const { register, handleSubmit } = useForm({
        });
    
        const onSubmit = (data) => {
        console.log(data);
        };
    
        return (
        <S.setting.SettingConatainer>
            <S.setting.IconSection>
                <S.setting.SwitchIconSection>
                    <L.SettingIcon/> 
                </S.setting.SwitchIconSection>
            <S.setting.IconButton>아이콘 변경</S.setting.IconButton>
            </S.setting.IconSection>
    
            <S.setting.SettingForm onSubmit={handleSubmit(onSubmit)}>
            <S.setting.Section>
                <S.setting.SettingLabel htmlFor="name">이름</S.setting.SettingLabel>
                <S.setting.SettingInput id="name" {...register('name')} required />
            </S.setting.Section>
    
            <S.setting.Section>s
                <S.setting.SettingLabel htmlFor="key">키</S.setting.SettingLabel>
                <S.setting.SettingInput id="key" {...register('key')} required />
            </S.setting.Section>
    
            <S.setting.Section>
                <S.setting.SettingLabel htmlFor="projectLeader">프로젝트 리더</S.setting.SettingLabel>
                <S.setting.SettingInput id="projectLeader" {...register('projectLeader')} />
            </S.setting.Section>
    
            <S.setting.ChargeSection>
                <S.setting.SettingLabel htmlFor="defaultResponder">기본 담당자</S.setting.SettingLabel>
                <S.setting.SettingSelect id="defaultResponder" {...register('defaultResponder')}>
                <S.setting.Option name ="담당자" value="할당되지 않음">할당되지 않음</S.setting.Option>
                <S.setting.Option name ="담당자" value="프로젝트 리더">프로젝트 리더</S.setting.Option>
                </S.setting.SettingSelect>
            </S.setting.ChargeSection>
    
            <S.setting.SubmitButton>저장</S.setting.SubmitButton>
            </S.setting.SettingForm>
        </S.setting.SettingConatainer>
        );
    };
    
    export default Setting;

