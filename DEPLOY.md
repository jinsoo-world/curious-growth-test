# Vercel 배포 가이드

## 배포하면 해결되는 문제

✅ **데이터 통합**: 하나의 URL로 모든 사용자가 같은 데이터를 공유
✅ **슬랙 알림**: 배포된 URL에서 정상 작동
✅ **브라우저 호환성**: 모든 브라우저에서 동일한 경험

## 배포 방법

### 1단계: GitHub에 코드 업로드

```bash
cd /Users/abca/Desktop/cursor/apps/curious-growth-test

# Git 초기화 (아직 안 했다면)
git init
git add .
git commit -m "큐리어스 성장유형 진단검사 배포 준비"

# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/your-username/curious-growth-test.git
git branch -M main
git push -u origin main
```

### 2단계: Vercel 배포

1. https://vercel.com 접속
2. GitHub 계정으로 로그인
3. "Add New Project" 클릭
4. 방금 만든 저장소 선택
5. 설정:
   - **Framework Preset**: Vite
   - **Root Directory**: `apps/curious-growth-test` (또는 루트면 그대로)
   - **Build Command**: `npm run build` (자동 감지됨)
   - **Output Directory**: `dist` (자동 감지됨)
6. "Deploy" 클릭

### 3단계: 완료!

배포된 URL에서 테스트:
- 진단검사 완료
- 관리자 페이지에서 데이터 확인

## 주의사항

⚠️ **localStorage는 여전히 브라우저별로 분리됩니다**
- 같은 브라우저, 같은 도메인 = 데이터 공유 ✅
- 다른 브라우저 = 데이터 분리 ❌

실제 운영 시에는 서버 데이터베이스 사용을 권장합니다.

## 배포 후 확인

1. 배포된 URL 접속
2. 진단검사 완료
3. 관리자 페이지에서 데이터 확인
