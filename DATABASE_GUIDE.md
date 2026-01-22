# 서버 데이터베이스 사용 가이드

## 현재 상태
- **localStorage 사용**: 브라우저별로 데이터가 분리됨
- **문제**: 다른 브라우저/기기에서 데이터 공유 불가

## 서버 데이터베이스로 전환하면?

✅ **모든 사용자가 같은 데이터베이스 공유**
✅ **어떤 브라우저/기기에서든 데이터 접근 가능**
✅ **데이터 영구 보관**
✅ **관리자 페이지에서 모든 데이터 확인 가능**

## 추천 데이터베이스 옵션

### 1. Supabase (가장 추천 - 무료, 쉬움)
- PostgreSQL 기반
- 무료 티어 제공
- 실시간 기능
- 인증 기능 내장

### 2. Firebase (Google)
- NoSQL 데이터베이스
- 무료 티어 제공
- 실시간 동기화
- 인증 기능 내장

### 3. MongoDB Atlas
- NoSQL 데이터베이스
- 무료 티어 제공
- 유연한 스키마

### 4. Vercel Postgres
- Vercel과 통합
- 간단한 설정
- 유료 (무료 티어 제한적)

## Supabase 사용 예시 (가장 추천)

### 1. Supabase 프로젝트 생성
1. https://supabase.com 접속
2. 무료 계정 생성
3. 새 프로젝트 생성

### 2. 테이블 생성
```sql
CREATE TABLE test_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name TEXT,
  phone_number TEXT,
  result_type TEXT,
  answers JSONB,
  scores JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. 코드 수정
```javascript
// utils/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_KEY'
export const supabase = createClient(supabaseUrl, supabaseKey)

// 데이터 저장
export async function saveTestData(userData, answers, resultType) {
  const { data, error } = await supabase
    .from('test_results')
    .insert([
      {
        user_name: userData?.name,
        phone_number: userData?.phone,
        result_type: resultType,
        answers: answers,
        scores: calculateScores(answers)
      }
    ])
  
  if (error) {
    console.error('데이터 저장 실패:', error)
  } else {
    console.log('데이터 저장 성공:', data)
  }
}
```

## 현재는?

**지금은 localStorage로 충분합니다!**
- 배포 후 같은 브라우저에서는 데이터가 공유됩니다
- 나중에 필요하면 서버 데이터베이스로 전환하면 됩니다

## 언제 서버 데이터베이스가 필요한가?

- ✅ 여러 브라우저/기기에서 데이터 공유 필요
- ✅ 데이터 백업 필요
- ✅ 많은 사용자 (수백~수천 명)
- ✅ 데이터 분석 필요

**현재는 배포만 해도 충분합니다!**
