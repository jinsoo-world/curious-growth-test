# 빠른 배포 가이드

## 배포 전 체크리스트

- [x] 코드 준비 완료
- [x] vercel.json 설정 완료
- [ ] GitHub 저장소 생성 필요
- [ ] Vercel 배포 필요

## 배포 단계

### 1단계: GitHub 저장소 생성

1. https://github.com/new 접속
2. 저장소 이름: `curious-growth-test` (또는 원하는 이름)
3. Public 또는 Private 선택
4. "Initialize this repository with a README" 체크 해제
5. "Create repository" 클릭

### 2단계: 코드 업로드

터미널에서 실행:

```bash
cd /Users/abca/Desktop/cursor/apps/curious-growth-test

# Git 초기화 (아직 안 했다면)
git init
git add .
git commit -m "큐리어스 성장유형 진단검사 배포"

# GitHub 저장소 URL 복사 후
git remote add origin https://github.com/YOUR_USERNAME/curious-growth-test.git
git branch -M main
git push -u origin main
```

### 3단계: Vercel 배포

1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. "Add New Project" 클릭
4. 방금 만든 저장소 선택
5. 설정 확인:
   - Framework Preset: **Vite** (자동 감지)
   - Root Directory: `.` (또는 `apps/curious-growth-test`가 루트면)
   - Build Command: `npm run build` (자동)
   - Output Directory: `dist` (자동)
6. "Deploy" 클릭

### 4단계: 완료!

배포된 URL에서 테스트:
- 진단검사 완료
- 관리자 페이지에서 데이터 확인

## 배포 후 확인사항

✅ 배포된 URL 접속 가능
✅ 진단검사 정상 작동
✅ 관리자 페이지에서 데이터 확인 가능

## 문제 해결

### 환경변수가 적용 안 됨
→ Redeploy 필요 (환경변수 추가 후)

### 빌드 실패
→ Vercel 로그 확인 (Deployments → 최신 배포 → Logs)

