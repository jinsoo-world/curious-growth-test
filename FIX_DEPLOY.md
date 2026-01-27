# 배포 실패 해결 방법

## 문제
Vercel 배포가 `npm install` 단계에서 실패했습니다.

## 해결 방법

### 방법 1: GitHub에 수정된 코드 푸시 후 재배포

1. GitHub 저장소에 수정된 코드 업로드
2. Vercel 대시보드에서 "Redeploy" 클릭

### 방법 2: Vercel에서 직접 수정

1. Vercel 대시보드 → 프로젝트 → Settings
2. General 탭에서:
   - **Node.js Version**: `18.x` 또는 `20.x` 선택
   - **Build Command**: `npm run build` 확인
   - **Output Directory**: `dist` 확인
3. 저장 후 "Redeploy"

### 방법 3: 빌드 로그 확인

1. Vercel 대시보드 → Deployments
2. 실패한 배포 클릭
3. "Inspect Deployment" 클릭
4. "Build Logs" 확인
5. 에러 메시지 확인

## 일반적인 문제

### 문제 1: Node 버전
→ Vercel Settings → General → Node.js Version 설정

### 문제 2: 의존성 설치 실패
→ package.json 확인, package-lock.json 확인

### 문제 3: 빌드 명령어 오류
→ vercel.json 또는 Settings에서 확인

## 빠른 해결

1. GitHub에 수정된 코드 업로드
2. Vercel에서 "Redeploy" 클릭
3. 빌드 로그 확인
