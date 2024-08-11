import React from "react";
import { useForm } from "react-hook-form";
import * as S from "../styles/index.style";
import * as L from "../assets/icons/index.Logo";

const Setting = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <S.setting.SettingConatainer>
      <S.setting.IconSection>
        <S.setting.SwitchIconSection>
          <L.SettingIcon />
        </S.setting.SwitchIconSection>
        <S.setting.IconButton>아이콘 변경</S.setting.IconButton>
      </S.setting.IconSection>

      <S.setting.SettingForm onSubmit={handleSubmit(onSubmit)}>
        <S.setting.Section>
          <S.setting.SettingLabel htmlFor="name">이름</S.setting.SettingLabel>
          <S.setting.SettingInput
            id="name"
            {...register("name", { required: "이름은 필수입니다." })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </S.setting.Section>

        <S.setting.Section>
          <S.setting.SettingLabel htmlFor="description">
            Description
          </S.setting.SettingLabel>
          <S.setting.SettingInput
            id="description"
            {...register("description", { required: "팀설명은 필수입니다." })}
          />
        </S.setting.Section>

        <S.setting.ChargeSection>
          <S.setting.SettingLabel htmlFor="defaultResponder">
            기본 담당자
          </S.setting.SettingLabel>
          <S.setting.SettingSelect
            id="defaultResponder"
            {...register("defaultResponder")}
          >
            <S.setting.Option value="할당되지 않음">
              할당되지 않음
            </S.setting.Option>
            <S.setting.Option value="프로젝트 리더">
              프로젝트 리더
            </S.setting.Option>
          </S.setting.SettingSelect>
        </S.setting.ChargeSection>

        <S.setting.SubmitButton type="submit">저장</S.setting.SubmitButton>
      </S.setting.SettingForm>
    </S.setting.SettingConatainer>
  );
};

export default Setting;
