# Pitch Finder 
부를 노래 추천을 위한 음역대 측정 기반 노래 필터링 서비스

> ‘들을’ 노래가 아닌 ‘부를’ 노래를 찾기 위해 <br/>
> 개인 음역대를 측정하고 측정된 음역대를 기반으로 <br/>
> 노래를 필터링하는 서비스, 피치파인더

<br/>

## 🧑‍🤝‍🧑 Team
|<img src="https://avatars.githubusercontent.com/u/79985974?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/75469131?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/89910703?v=4" width="150" height="150"/>|
|:-:|:-:|:-:|
|[@chaeri93](https://github.com/chaeri93)|[@seondal](https://github.com/seondal)|[@CSE-pebble](https://github.com/CSE-pebble)|
|데이터 수집 & 백엔드 개발|프론트엔드 개발|팀장 & 프론트엔드 개발|

<br/>

## 📚 Stack
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white"/> <img src="https://img.shields.io/badge/Styled Components-DB7093?style=for-the-badge&logo=Styled Components&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=Recoil&logoColor=white"/>

- Typescript & React 기반 Single Page Application
- Tailwind CSS : 전반적인 레이아웃 스타일링
- Styled Components : 음정 그래프 표현을 위한 조건부 스타일링
- Recoil : 사용자가 선택한 성별 정보를 포함한 사용자 정보 전역 저장

<br/>

## 📰 Manual

- 동작 환경 :
  - AudioContext API를 지원하는 웹 브라우저 (Chrome 42, Safari 14.1 이상)
- 실행 방법 :
  - 서비스 바로가기 ([https://pitch-finder.vercel.app](https://pitch-finder.vercel.app))
- How to install/build/test :
  1. 본 레포 clone `git clone https://github.com/K-CoB/pitch-finder-frontend`
  2. 클론한 프로젝트 폴더를 연다
  3. 터미널을 열어 `npm install`을 입력하여 프로젝트에 필요한 패키지를 작성한다
  4. `npm start`를 입력하여 빌드 및 테스트 시작

<br/>

## ⚙️ Open Source

```json
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.20.1",
"react-scripts": "5.0.1",
"recoil": "^0.7.7",
"styled-components": "^6.1.8",
"typescript": "^4.9.5",
```

<br/>

## 🏗️ Folder Structure
- 🗃️ src
    - App.css : 전반적인 스타일링 정의
    - App.tsx : 라우팅 정의
    - 📁 page
        - Home.tsx
        - Music.tsx
        - Result.tsx
        - Test.tsx
    - 📁 assets : 서비스 내에서 사용하는 모든 에셋 파일
    - 📁 audio : 음정 측정 관련 코드들
        - context.ts : 오디오 컨텍스트 정의
        - correlate.ts : 음성 데이터 주파수 변환 함수
        - playSound.ts : 샘플음 재생 관련 함수
        - utils.ts : 음정값을 활용한 모든 유틸 함수 정의
    - 📂 componets : 각 화면에서 사용되는 모든 컴포넌트 정의
        - common
        - home
        - result
        - test
    - 📁 constants : 서비스 내에서 사용되는 모든 상수값 관리
        - env.ts : 환경변수
        - value.ts : 성별 음역 평균값, 테스트 한계값 등
    - 📁 store : 전역 변수 관리를 위한 아톰 정의
    - 📁 hook : useAudio를 포함한 훅 정의
    - 📁 interface : 개발에 필요한 각종 타입 정의

⬇️ 전체 폴더 구조 및 파일
```
├── README.md
├── craco.config.js
├── package-lock.json
├── package.json
├── public
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   ├── bgBlur.svg
│   │   ├── bottom.png
│   │   └── microphone.svg
│   ├── audio
│   │   ├── context.ts
│   │   ├── correlate.ts
│   │   ├── playSound.tsx
│   │   └── utils.ts
│   ├── components
│   │   ├── common
│   │   │   ├── Header.tsx
│   │   │   ├── PitchButton.tsx
│   │   │   ├── ResultButton.tsx
│   │   │   └── SelectButton.tsx
│   │   ├── home
│   │   │   └── MikeButton.tsx
│   │   ├── result
│   │   │   └── ResultBar.tsx
│   │   └── test
│   │       └── Pitchbar.tsx
│   ├── constants
│   │   ├── env.ts
│   │   └── value.ts
│   ├── context
│   │   └── userAtom.tsx
│   ├── custom.d.ts
│   ├── hooks
│   │   └── useAudio.tsx
│   ├── index.tsx
│   ├── interface
│   │   └── SongI.ts
│   ├── mock
│   │   ├── songs copy.ts
│   │   └── songs.ts
│   ├── page
│   │   ├── Home.tsx
│   │   ├── Music.tsx
│   │   ├── Result.tsx
│   │   └── Test.tsx
│   └── store
│       └── atom.ts
├── tailwind.config.js
└── tsconfig.json
```
