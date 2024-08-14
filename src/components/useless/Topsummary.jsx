import * as S from "../../styles/index.style";
import * as L from "../../assets/icons/index.Logo";


const Topsummary = () => {
  return (
    <div>
      <S.dashboard.Sdiv>
        <S.dashboard.Ssdiv>
          <S.dashboard.SLogo>
            <L.LogoIcon />
          </S.dashboard.SLogo>
          <div>
            <p>[ ] 최근 7일 이내에</p>
            <p>[]개 완료</p>
          </div>
        </S.dashboard.Ssdiv>
        <S.dashboard.Ssdiv>
          <S.dashboard.SLogo>
            <L.BellIcon />
          </S.dashboard.SLogo>
          <div>
            <p>[ ] 최근 7일 이내에</p>
            <p>[]개 업데이트</p>
          </div>
        </S.dashboard.Ssdiv>
        <S.dashboard.Ssdiv>
          <S.dashboard.SLogo>
            <L.UserIcon />
          </S.dashboard.SLogo>
          <div>
            <p>[ ] 최근 7일 이내에</p>
            <p>[]개 기한만료</p>
          </div>
        </S.dashboard.Ssdiv>
        <S.dashboard.Ssdiv>
          <S.dashboard.SLogo>
            <L.ArrowIcon />
          </S.dashboard.SLogo>
          <div>
            <p>[ ] 최근 7일 이내에</p>
            <p>[]개 만듬</p>
          </div>
        </S.dashboard.Ssdiv>
      </S.dashboard.Sdiv>
    </div>
  );
};

export default Topsummary;
