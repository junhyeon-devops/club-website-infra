# 1. Node 이미지 기반
FROM node:18-alpine

# 2. 앱 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 lock 파일 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm ci --omit=dev  # ✅ 프로덕션 환경에선 devDependencies 제거

# 5. 전체 소스 복사
COPY . .

# 6. 환경 설정
ENV NODE_ENV=production

# 7. 포트 노출 (명시적)
EXPOSE 5000

# 8. 서버 실행
CMD ["npm", "start"]
