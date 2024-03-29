## 실행 방법

yarn install && yarn start

- 과제 제출을 위해 바로 실행하실 수 있도록, api키를 .env에 넣지 않고 변수 안에 넣어서 사용했습니다.
- http://localhost:3000 으로 확인 가능합니다.

## 구현 기능

- Home 화면
  - 기사 리스트 불러오기
    - 기사 스크랩
    - 기사 무한 스크롤
    - 홈화면 필터
      - 모달로 구현
      - 헤드라인 검색 / 날짜 검색 / 국가(복수선택 가능) 선택
- Scrap 화면
  - 기사 스크랩 하기
    - 스크랩 필터 (UI 똑같지만 필터링 선택 값은 Home과 별개)

## 사용한 기술 스택 및 라이브러리

### TypeScript

JavaScript에 타입을 추가하여 개발 시 실수를 줄이고, 가독성 및 유지보수성을 향상시키기 위해 사용했습니다.

### Styled-components

컴포넌트 스타일을 캡슐화하여 스타일 충돌을 방지하고, 동적 스타일링을 용이하게 하기 위해 사용했습니다.

### zustand

보일러플레이트 코드가 많지 않아 상태 관리를 위해 zustand를 사용했습니다. 네트워크 요청에 따른 필터링 선택 값 관리에 사용했습니다.

### React-Query

서버 상태 관리에는 react-query를 사용했습니다. 데이터 페칭, 캐싱, 동기화를 쉽게 관리할 수 있었습니다.

### react-intersection-observer

IntersectionObserver API를 react에서 간편하게 사용하기 쉽도록 구현된 라이브러리이기에 사용했습니다.

### LocalStorage

사용자의 로컬에 스크랩한 기사를 남기기 위해 사용했으나, LocalStorage의 용량이 5MB 한계가 있었습니다.

또한 zustand의 persist 미들웨어를 사용하면 상태를 LocalStorage에 자동으로 저장할 수 있으나, 이 프로젝트에서는 상태 관리를 위해 별도의 Context API를 구현하여 사용했습니다.

추후 리팩토링에서는 zustand persist와 함께 IndexedDB를 사용하여 더 큰 용량의 데이터를 효과적으로 관리하고자 합니다.

### Jest

테스팅 라이브러리로 사용하고자 설치하였으나, 기한 내에 구현을 먼저 완료하다보니 테스트 코드를 작성하지 못했습니다.
