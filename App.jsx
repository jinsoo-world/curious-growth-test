import { useState, useEffect } from 'react'
import StartPage from './components/StartPage'
import QuestionPage from './components/QuestionPage'
import ResultPage from './components/ResultPage'
import AdminPage from './components/AdminPage'
import { questions, calculateScores, determineType } from './data/questions'
import { saveTestData } from './utils/storage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('start')
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null))
  const [resultType, setResultType] = useState(null)
  const [nickname, setNickname] = useState('')
  
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

  const handleComplete = async (nicknameFromQuestion) => {
    const { scores, bKeyAnswers } = calculateScores(answers)
    const type = determineType(scores, bKeyAnswers)
    setResultType(type)
    setNickname(nicknameFromQuestion || '')
    
    // 닉네임(선택)을 포함해 데이터 저장
    try {
      const userInfo = nicknameFromQuestion ? { nickname: nicknameFromQuestion } : null
      await saveTestData(userInfo, answers, type);
      console.log('✅ saveTestData 완료');
    } catch (error) {
      console.error('❌ saveTestData 오류:', error);
    }
  }

  const handleRestart = () => {
    setAnswers(new Array(questions.length).fill(null))
    setResultType(null)
    setNickname('')
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
          onShowResult={() => setCurrentPage('result')}
        />
      )}
      {currentPage === 'result' && resultType && (
        <ResultPage 
          type={resultType}
          nickname={nickname}
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
