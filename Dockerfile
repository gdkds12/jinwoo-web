# 1. Builder Stage: 애플리케이션 빌드
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 파일 복사 및 설치
COPY package.json package-lock.json* ./
RUN npm install

# 애플리케이션 전체 복사 및 빌드
COPY . .
RUN npm run build

# 2. Runner Stage: 빌드된 앱만 추출해서 가볍게 실행
FROM node:20-alpine AS runner

# 작업 디렉토리 설정
WORKDIR /app

# 환경 변수 설정
ENV NODE_ENV=production
ENV PORT=3001

# 빌드 결과물 복사 (Next.js standalone 실행을 위해)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# 외부에 노출할 포트
EXPOSE 3001

# 컨테이너 실행 시 명령어 (Next.js standalone 모드 실행)
CMD ["node", "server.js"]
