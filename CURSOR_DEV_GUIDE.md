# Cursor 개발 가이드 (필수)

## 1. 목적

이 프로젝트는 큐리어스 서비스에 향후 통합 가능한 진단검사 MVP를 만드는 것이 목적이다.

- 빠른 구현이 목표
- 과한 구조 설계, 마이크로서비스, 복잡한 아키텍처는 금지
- 단, 나중에 큐리어스 DB와 합칠 수 있는 구조적 여지는 반드시 남긴다

## 2. 기술 스택 고정

다음 스택만 사용한다.

- Frontend: Next.js (App Router)
- Backend: Supabase (PostgreSQL)
- Auth: Supabase Auth (익명 + 로그인 둘 다 고려)
- DB: Supabase public schema
- 배포: Vercel

**새로운 프레임워크 제안 금지.**

## 3. 핵심 설계 원칙 (가장 중요)

### 3-1. 단일 책임 구조

- 하나의 진단 실행 = 하나의 session
- session은 결과와 답변을 모두 포함한다
- **1 session = 1 사람의 1회 진단**
- 재시도는 새 session으로 처리한다.

### 3-2. 결과 중심 저장

다음 정보는 반드시 컬럼으로 저장한다.

- `result_type` (유형)
- `total_score` (점수)
- `assessment_version` (버전)
- `created_at` (timestamptz)

`answers`는 jsonb로 저장 가능하나, 관리/통계에 필요한 값은 반드시 컬럼화한다.

### 3-3. 큐리어스 연동을 고려한 설계

아래 필드는 반드시 포함한다.

- `user_id` (uuid, nullable)
- `curious_user_id` (nullable, future use)

현재는 사용하지 않아도 반드시 컬럼은 존재해야 한다.

### 3-4. DB 변경 원칙

- 기존 컬럼 삭제 금지
- 구조 변경 시 version 필드로 분기
- 과거 데이터는 재계산하지 않는다

## 4. 필수 테이블

### assessment_sessions

필수 컬럼:

- `id` (uuid, pk)
- `created_at` (timestamptz, default now())
- `user_id` (uuid, nullable)
- `curious_user_id` (uuid, nullable)
- `assessment_version` (text)
- `answers` (jsonb)
- `result_type` (text)
- `total_score` (int)
- `utm_source` (text, nullable)
- `referrer` (text, nullable)

### assessment_events (권장)

- `id`
- `session_id` (fk)
- `type` (STARTED / COMPLETED / ERROR)
- `payload` (jsonb)
- `created_at`

이 테이블은 슬랙 알림 및 운영 자동화를 위해 사용한다.

## 5. 보안 규칙 (중요)

- Supabase Row Level Security(RLS)는 반드시 활성화한다
- 프론트에서는 anon key만 사용한다
- service_role key는 서버(api route)에서만 사용한다
- **service_role key를 클라이언트에 노출하지 않는다**

## 6. 관리자 페이지 원칙

- 관리자 페이지는 별도 로그인 화면을 가진다
- Supabase Auth 기반 이메일 로그인
- `admin_users` 테이블로 권한을 구분한다
  - owner / admin / viewer
- 일반 유저는 관리자 데이터 접근 불가.

## 7. 슬랙 알림 정책

다음 시점에만 슬랙 알림을 보낸다.

- 진단 완료(COMPLETED)
- 오류 발생(ERROR)

알림은 다음 정보만 포함한다.

- `session_id`
- `result_type`
- `total_score`
- `created_at`

**개인정보(이름, 전화번호 등)는 포함하지 않는다.**

## 8. 개발 우선순위

1. 진단 플로우 정상 작동
2. 데이터 정확히 저장
3. 관리자페이지에서 리스트 조회 가능
4. 슬랙 알림 연결
5. UI 개선

**UI 완성도보다 데이터 구조 안정성을 우선한다.**

## 9. 하지 말 것 (중요)

❌ 마이크로서비스 구조  
❌ 복잡한 추상화  
❌ GraphQL 도입  
❌ 자체 인증 시스템 구현  
❌ 과한 폴더 구조  
❌ 필요 없는 공통 컴포넌트화

**"지금 필요한 만큼만" 구현한다.**

## 10. 개발 기준 한 문장

**빠르게 만들되, 버리지 않아도 되는 구조로 만든다.**
