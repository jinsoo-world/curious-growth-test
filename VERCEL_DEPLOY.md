# Vercel 배포 단계별 가이드

## 현재 상태
✅ GitHub에 코드 업로드 완료
⏳ Vercel 배포 필요

## Vercel 배포 방법

### 1단계: Vercel 접속 및 로그인

1. https://vercel.com 접속
2. "Sign Up" 또는 "Log In" 클릭
3. **"Continue with GitHub"** 클릭
4. GitHub 계정으로 로그인

### 2단계: 프로젝트 Import

1. 대시보드에서 **"Add New Project"** 클릭
2. **"Import Git Repository"** 클릭
3. GitHub 저장소 목록에서 **`jinsoo-world/curious-growth-test`** 선택
4. **"Import"** 클릭

### 3단계: 프로젝트 설정

자동으로 감지되지만 확인:

- **Project Name**: `curious-growth-test-new` (기존 프로젝트와 구분하려면)
- **Framework Preset**: `Vite` (자동 감지됨)
- **Root Directory**: `./` (그대로)
- **Build Command**: `npm run build` (자동)
- **Output Directory**: `dist` (자동)
- **Install Command**: `npm install` (자동)

### 4단계: Deploy

1. 설정 확인 후 **"Deploy"** 버튼 클릭
2. 배포 진행 중... (1-2분 소요)
3. 배포 완료!

### 5단계: 배포 확인

1. 배포 완료 후 **배포된 URL** 클릭
2. 진단검사 테스트
3. 관리자 페이지에서 데이터 확인

## 배포 후 확인사항

✅ 배포된 URL 접속 가능
✅ 진단검사 정상 작동
✅ 관리자 페이지 접근 가능
✅ 데이터 저장 및 CSV 내보내기 작동

## 문제 해결

### 빌드 실패
→ Vercel 대시보드 → Deployments → 최신 배포 → Logs 확인

### 페이지가 안 열림
→ Vercel 대시보드 → Settings → General → 확인

### 데이터가 안 저장됨
→ 브라우저 콘솔 확인 (F12)
