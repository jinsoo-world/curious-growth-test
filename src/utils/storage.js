// 데이터 저장 및 관리 유틸리티
import { questions, calculateScores as calcScores } from '../data/questions';
// import { sendSlackNotification } from './slack'; // 웹훅 기능 제거

const STORAGE_KEY = 'curious_growth_test_data';
const ADMIN_PASSWORD = 'curious2025'; // 관리자 비밀번호 (실제 운영 시 환경변수로 관리)

// 진단 데이터 저장
export async function saveTestData(userData, answers, resultType) {
  const { scores } = calcScores(answers);
  
  const testData = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    userName: userData?.name || userData?.nickname || null,
    phoneNumber: userData?.phone || null,
    answers: answers.map((answer, index) => {
      const question = questions[index];
      return {
        questionId: question.id,
        questionText: question.text,
        answerIndex: answer,
        answerText: answer !== null ? question.options[answer].text : null
      };
    }),
    resultType: resultType,
    scores: scores
  };
  
  const existingData = getStoredData();
  existingData.push(testData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
  
  // 슬랙 알림 기능 제거됨
  console.log('💾 데이터 저장 완료:', testData);
  
  return testData;
}

// 저장된 데이터 가져오기
export function getStoredData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// 모든 데이터 삭제 (관리자용)
export function clearAllData() {
  localStorage.removeItem(STORAGE_KEY);
}

// 관리자 비밀번호 확인
export function checkAdminPassword(password) {
  return password === ADMIN_PASSWORD;
}


// CSV로 내보내기
export function exportToCSV() {
  const data = getStoredData();
  
  if (data.length === 0) {
    return '';
  }
  
  const headers = ['ID', '날짜/시간', '이름', '휴대폰번호', '결과유형', '문항별 답변'];
  const rows = data.map(item => {
    const answersStr = item.answers
      .map(a => `Q${a.questionId}:${a.answerIndex + 1}`)
      .join('; ');
    return [
      item.id,
      item.timestamp,
      item.userName,
      item.phoneNumber,
      item.resultType,
      answersStr
    ];
  });
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  return csvContent;
}
