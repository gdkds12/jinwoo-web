# Dockerfile

# 1. Builder Stage: 애플리케이션 빌드
FROM node:20-alpine AS builder
WORKDIR /app

# 종속성 설치
COPY package.json package-lock.json* ./
RUN npm install

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 2. Runner Stage: 빌드된 애플리케이션 실행
FROM node:20-alpine AS runner
WORKDIR /app

# 프로덕션 환경 설정
ENV NODE_ENV=production
ENV PORT=3001   # ✅ Next.js 서버 포트를 명시적으로 3001로 설정

# 빌더 스테이지에서 필요한 파일 복사
COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# 노출할 포트 설정
EXPOSE 3001

# 컨테이너 시작 시 실행될 명령어
CMD ["node", "server.js"]
