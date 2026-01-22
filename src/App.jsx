import { useState, useEffect } from 'react'
import StartPage from './components/StartPage'
import QuestionPage from './components/QuestionPage'
import UserInfoForm from './components/UserInfoForm'
import ResultPage from './components/ResultPage'
import AdminPage from './components/AdminPage'
import { questions, calculateScores, determineType } from './data/questions'
import { saveTestData } from './utils/storage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('start')
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null))
  const [resultType, setResultType] = useState(null)
  const [userData, setUserData] = useState(null)
  
  // URL 파라미터에서 결과 타입 읽기 (공유 링크용)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const sharedType = urlParams.get('type')
    if (sharedType && ['A', 'B', 'C', 'D'].includes(sharedType)) {
      setResultType(sharedType)
      setCurrentPage('result')
    }
  }, [])

  const handleStart = () => {
    setCurrentPage('questions')
  }

  const handleAnswer = (questionIndex, answerIndex) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = answerIndex
    setAnswers(newAnswers)
  }

  const handleComplete = () => {
    const { scores, bKeyAnswers } = calculateScores(answers)
    const type = determineType(scores, bKeyAnswers)
    setResultType(type)
    setCurrentPage('userinfo')
  }

  const handleUserInfoSubmit = async (data) => {
    setUserData(data)
    console.log('📝 사용자 정보 제출:', data);
    console.log('📝 답변:', answers);
    console.log('📝 결과 유형:', resultType);
    // 데이터 저장
    try {
      await saveTestData(data, answers, resultType);
      console.log('✅ saveTestData 완료');
    } catch (error) {
      console.error('❌ saveTestData 오류:', error);
    }
    setCurrentPage('result')
  }

  const handleUserInfoSkip = async () => {
    console.log('⏭️ 사용자 정보 건너뛰기');
    console.log('📝 답변:', answers);
    console.log('📝 결과 유형:', resultType);
    // 정보 없이도 결과 보기 가능하지만 데이터는 저장
    try {
      await saveTestData(null, answers, resultType);
      console.log('✅ saveTestData 완료');
    } catch (error) {
      console.error('❌ saveTestData 오류:', error);
    }
    setCurrentPage('result')
  }

  const handleRestart = () => {
    setAnswers(new Array(questions.length).fill(null))
    setResultType(null)
    setUserData(null)
    setCurrentPage('start')
  }

  const handleAdminAccess = () => {
    setCurrentPage('admin')
  }

  const handleBackFromAdmin = () => {
    setCurrentPage('start')
  }

  return (
    <div className="app">
      {currentPage === 'start' && (
        <StartPage 
          onStart={handleStart}
          onAdminAccess={handleAdminAccess}
        />
      )}
      {currentPage === 'questions' && (
        <QuestionPage
          questions={questions}
          answers={answers}
          onAnswer={handleAnswer}
          onComplete={handleComplete}
          onBackToStart={handleRestart}
        />
      )}
      {currentPage === 'userinfo' && resultType && (
        <UserInfoForm
          onSubmit={handleUserInfoSubmit}
          onSkip={handleUserInfoSkip}
        />
      )}
      {currentPage === 'result' && resultType && (
        <ResultPage 
          type={resultType} 
          onRestart={handleRestart}
          onBackToStart={handleRestart}
        />
      )}
      {currentPage === 'admin' && (
        <AdminPage onBack={handleBackFromAdmin} />
      )}
    </div>
  )
}

export default App
