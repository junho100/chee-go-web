# 취Go Web

대학생 대상 교육 및 편의 기능 지원 서비스 [취Go] 웹 레포지토리

---

## 주요 기능

### 1. CS 강의

- 컴퓨터공학 기초 지식을 학습할 수 있는 강의 제공
- 강의 진도율 관리 기능

### 2. 학교 공지사항 알림

- 텔레그램 봇을 통한 학교 공지사항 알림 서비스
- 키워드 기반 필터링 기능
- 매일 오전 11시 알림 발송

### 3. 이력서 변환

- 하나의 이력서 정보로 다양한 구직 플랫폼 형식 지원
  - 링크드인
  - 프로그래머스
  - 원티드

## 기술 스택

- React 18.3.1
- Material-UI (MUI)
- React Router DOM
- Axios
- Formik & Yup

## 시작하기

### 환경 설정

1. 의존성 설치

```bash
npm install
```

2. 환경 변수 설정
   .env.local

```
REACT_APP_API_URL=SERVER_URL
```

### 실행

개발 환경

```bash
npm run start-local
```

프로덕션 환경

```bash
npm run start-prod
```

### 빌드

개발 환경

```bash
npm run build-local
```

프로덕션 환경

```bash
npm run build
```

## 프로젝트 구조

```
src/
├── components/                # 리액트 컴포넌트
│   ├── common/               # 공통 컴포넌트
│   │   ├── Header.js        # 네비게이션 헤더
│   │   └── Footer.js        # 푸터
│   ├── Courses/             # 강의 관련 컴포넌트
│   │   ├── CoursesMain.js   # 강의 목록 페이지
│   │   └── CoursePage.js    # 강의 상세 페이지
│   ├── ResumeForm/          # 이력서 관련 컴포넌트
│   │   ├── ResumeForm.js    # 이력서 작성 폼
│   │   ├── PersonalInfo.js  # 개인 정보 섹션
│   │   ├── Education.js     # 학력 섹션
│   │   ├── Projects.js      # 프로젝트 섹션
│   │   ├── Skills.js        # 기술 스택 섹션
│   │   └── WorkExperience.js # 경력 섹션
│   ├── Login/               # 로그인 관련 컴포넌트
│   ├── SignUp/              # 회원가입 관련 컴포넌트
│   └── Telegram/            # 텔레그램 알림 관련 컴포넌트
├── App.js                    # 앱 메인 컴포넌트
├── index.js                  # 앱 진입점
└── index.css                 # 전역 스타일
```
