import * as S from "../styles/index.style";
import * as L from "../assets/icons/index.Logo";


const Team = () => {
    return (
        <S.team.Container>

            <S.team.CreateContainer>
                <h3>팀 생성하기</h3>
                <S.team.CreateBox>

                    <S.team.LeftIcon>
                        <L.TeamIcon/>
                        <S.team.AddButton>프로필 사진 추가</S.team.AddButton>
                    </S.team.LeftIcon>

                    <S.team.RightBox>
                        <S.team.TeamNameBox>
                            <S.team.Label>팀 이름</S.team.Label>
                            <S.team.TeamNameInput placeholder={"팀 이름을 입력해 주세요"}/>
                        </S.team.TeamNameBox>

                        <S.team.ExplainBox>
                            <S.team.Label>설명</S.team.Label>
                            <S.team.ExplainInput placeholder={"설명을 입력해 주세요"}/>
                        </S.team.ExplainBox>

                        <S.team.ButtonSet>
                            <S.team.ResetButton>초기화</S.team.ResetButton>
                            <S.team.ConfirmButton>확인</S.team.ConfirmButton>
                        </S.team.ButtonSet>
                    </S.team.RightBox>

                </S.team.CreateBox>
            </S.team.CreateContainer>

            <S.team.ListContainer>
                <h3>팀 목록</h3>
                <S.team.ListBox>
                    <S.team.FindInputContainer>
                        <S.team.IconLeft><L.TeamBarIcon/></S.team.IconLeft>                  
                    <S.team.FindInput placeholder={"원하는 팀 찾기"}/>
                        <S.team.IconRight><L.TeamLensIcon/></S.team.IconRight>
                    </S.team.FindInputContainer> 

                    <S.team.TeamExampleContainer>
                        <S.team.ExampleBox>
                            <S.team.ExampleIcon><L.TeamIcon/></S.team.ExampleIcon>
                            <S.team.TeamInfo>
                                <S.team.TeamName>팀 이름</S.team.TeamName>
                                <S.team.TeamExplain>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea itaque temporibalskdjf;sdfsdfasdfsadfaalskdjf;</S.team.TeamExplain>
                                <S.team.TeamLeader>팀 소유자 이름</S.team.TeamLeader>
                            </S.team.TeamInfo>
                        </S.team.ExampleBox>     

                        <S.team.ExampleBox>
                        <S.team.ExampleIcon><L.TeamIcon/></S.team.ExampleIcon>
                            <S.team.TeamInfo>
                                <S.team.TeamName>팀 이름</S.team.TeamName>
                                <S.team.TeamExplain>팀 설명</S.team.TeamExplain>
                                <S.team.TeamLeader>팀 소유자 이름</S.team.TeamLeader>
                            </S.team.TeamInfo>
                        </S.team.ExampleBox>  

                        <S.team.ExampleBox>
                        <S.team.ExampleIcon><L.TeamIcon/></S.team.ExampleIcon>
                            <S.team.TeamInfo>
                                <S.team.TeamName>팀 이름</S.team.TeamName>
                                <S.team.TeamExplain>팀 설명</S.team.TeamExplain>
                                <S.team.TeamLeader>팀 소유자 이름</S.team.TeamLeader>
                            </S.team.TeamInfo>
                        </S.team.ExampleBox>  

                        <S.team.ExampleBox>
                        <S.team.ExampleIcon><L.TeamIcon/></S.team.ExampleIcon>
                            <S.team.TeamInfo>
                                <S.team.TeamName>팀 이름</S.team.TeamName>
                                <S.team.TeamExplain>팀 설명</S.team.TeamExplain>
                                <S.team.TeamLeader>팀 소유자 이름</S.team.TeamLeader>
                            </S.team.TeamInfo>
                        </S.team.ExampleBox>  
                    </S.team.TeamExampleContainer>              
                    
                </S.team.ListBox>
            </S.team.ListContainer>

        </S.team.Container>
    )
}

export default Team

