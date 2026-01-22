# GitHub에 코드 푸시하기

## 문제
GitHub 저장소가 비어있어서 Vercel이 연결할 수 없습니다.

## 해결 방법

### 방법 1: GitHub 웹에서 직접 업로드 (가장 쉬움)

1. https://github.com/jinsoo-world/curious-growth-test 접속
2. "uploading an existing file" 클릭 (또는 "Add file" → "Upload files")
3. 프로젝트 폴더의 모든 파일을 드래그 앤 드롭
4. "Commit changes" 클릭

### 방법 2: GitHub Desktop 사용

1. GitHub Desktop 다운로드: https://desktop.github.com
2. GitHub 계정으로 로그인
3. File → Add Local Repository
4. `/Users/abca/Desktop/cursor/apps/curious-growth-test` 선택
5. "Publish repository" 클릭

### 방법 3: 터미널에서 푸시 (인증 필요)

```bash
cd /Users/abca/Desktop/cursor/apps/curious-growth-test
git push -u origin main
```

GitHub 인증이 필요합니다:
- Personal Access Token 사용 (권장)
- 또는 GitHub CLI 사용

## Personal Access Token 만들기

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" 클릭
3. 권한 선택: `repo` 체크
4. 토큰 생성 후 복사
5. 푸시할 때 비밀번호 대신 토큰 사용
