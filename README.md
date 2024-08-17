# [FOOT👣] 8조  

- **🧷 [FE GitHub 바로가기](https://github.com/Inocam/FrontEnd)**
- **🧷 [BE GitHub 바로가기](https://github.com/Inocam/BackEnd)** <br/>
- **🧷 [서비스 주소](https://foot.o-r.kr/)**

---

# **FOOT👣**

<aside>
💡FOCUS 목표와 핵심 작업에 집중 <br/>
💡ORGANIZE 작업과 자원을 체계적으로 정리 <br/>
💡OPTIMIZE 최대 효율을 위해 프로세스 개선 <br/>
💡TASK 작업을 정의하고 관리하여 목표달성

</aside>


---
## **🩵** 팀원 소개

| 이름 | 역할 | MBTI  | GitHub | email |
| --- | --- | --- | --- | --- |
| 김지수  | BE / 팀장 | ENTP |https://github.com/k-jisoo | boy7442@gmail.com |
| 박광열 | FE / 부팀장 | INFP |https://github.com/VG20-s| pkll31311@gmail.com |
| 안유진 | FE  |ISTP |https://github.com/yujin-4n | sk1ptr4cer@gmail.com |
| 추수민 | FE | INTP | https://github.com/suminchu | shelly7370@naver.com  |
| 김동욱  | BE | ISTP |https://github.com/kdu9369 | kdu9369@gmail.com |
| 김세영 | BE | INFP |https://github.com/zzzinghi | tpth0@naver.com |
| 정동원  | BE | ENFJ |https://github.com/DongWonJeong | januse159@naver.com |

---
## ⚙️ 서비스 아키텍쳐

[![image](https://github.com/user-attachments/assets/2693bd88-6629-4990-a2c0-b71a7027986e)](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F99c3148c-204e-46d3-9eee-7c4cb3b49cba%2Fimage.png?table=block&id=5bb38cb8-ded0-4bf4-929b-792e971e36d1&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=2000&userId=5a09fe9e-b55a-4f85-8ed7-d17eac9877fd&cache=v2)

---

## **🌟** 주요 기능 소개

---
## **📃** 기술적 의사결정

| 사용 기술 | 채택 이유 |
  | --- | --- |
  | pnpm | - 설치 속도가 빠르고 패키지를 효율적으로 저장하여 중복 설치를 방지함 |
  |Redux | 	- 전역 객체 관리 프레임워크 <br/> - 복잡한 상태를 효과적으로 관리할 수 있어 대규모 어플리케이션에 적합하여 채택 |
  | React Query | - 자동으로 JSON 데이터로 변환하여 개발 효율 증가<br/>  - 로딩, 에러 등의 상태를 쉽게 처리 할 수 있음 <br/> - 데이터를 자동을 갱신해 항상 최신 데이터를 볼 수 있고 같은 데이터에 대하여 여러 번 요청이 있을 시 중복 요청을 제거하기에 채택 |
  |Axios | - 다양한 환경에서 일관된 API 사용 가능하며, JSON 데이터를 자동으로 처리하여 개발 효율성이 증가하기에 채택 |
  |React-Router | 	- JSX를 사용하여 쉽게 라우트 정의가 가능하고, 복잡한 어플리케이션 구조를 효과적으로 구현 가능 하기에 사용 |
  | Styled-components |- CSS를 컴포넌트로 정의하여 재사용성이 뛰어남<br/> - props를 기반으로 스타일을 동적으로 변경 가능하여 유연한 UI 구현이 가능하기에 채택 |
  
---
## **🏷️ 설계 중점 포인트**

---

## **🚀 Trouble Shooting**

> Unsupported Media Type

<details> 
  <summary> Problem </summary>
  이미지 포함 요청 시 “Unsupported Media Type” 반환 <br/>
팀 스페이스 생성 API를 호출하는 과정에서 서버로부터 "형식에 맞지 않다"는 응답이 발생
  
  
</details>
<br/>
<details> 
  <summary> Solution </summary>
  요청데이터 재구성 <br/>
이 문제를 해결하기 위해 요청 데이터를 재구성하는 방식으로 코드를 변경
</details>



