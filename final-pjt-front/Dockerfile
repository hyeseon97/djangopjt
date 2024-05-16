# 단계 1: Node.js를 포함한 베이스 이미지 사용
FROM node:20.11.0-alpine as build-stage

# 단계 2: 작업 디렉토리 설정
WORKDIR /app

# 단계 3: package.json과 package-lock.json을 이미지로 복사
COPY package*.json ./

# 단계 4: 프로젝트 의존성 설치
RUN npm install

# 단계 5: 소스 코드를 작업 디렉토리로 복사
COPY . .

# 단계 6: 프로덕션 빌드 생성
RUN npm run build

# 단계 7: 간단한 웹 서버를 실행하기 위한 베이스 이미지 사용
FROM node:20.11.0-alpine

# 단계 8: 작업 디렉토리 설정
WORKDIR /app

# 단계 9: 빌드 단계에서 생성된 정적 파일을 작업 디렉토리로 복사
COPY --from=build-stage /app/dist /app

# 단계 11: Vue 프로젝트를 제공하기 위한 간단한 웹 서버 실행
CMD ["npx", "http-server", "-p", "5173"]