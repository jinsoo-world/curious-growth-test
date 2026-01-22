import { useState, useEffect } from 'react'
import './QuestionPage.css'

function QuestionPage({ questions, answers, onAnswer, onComplete, onBackToStart }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showCover, setShowCover] = useState(true)
  
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const allAnswered = answers.every(answer => answer !== null)
  
  useEffect(() => {
    // 첫 번째 질문으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentQuestionIndex])
  
  const handleAnswerSelect = (answerIndex) => {
    onAnswer(currentQuestionIndex, answerIndex)
    
    // 다음 질문으로 자동 이동
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }
    }, 300)
  }
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }
  
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }
  
  const handleCoverStart = () => {
    setShowCover(false)
  }
  
  if (showCover) {
    return (
      <div className="cover-page">
        <div className="cover-content">
          <h2 className="cover-title">안내</h2>
          <p className="cover-text">
            다음 문항들은 공부·자기계발·새로운 시도 상황의 나를 떠올려 답해주세요!
          </p>
          <button className="cover-button" onClick={handleCoverStart}>
            시작하기
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="question-page">
      <div className="question-container">
        {/* 첫 화면으로 돌아가기 버튼 */}
        <div className="back-to-start-container">
          <button className="back-to-start-button" onClick={onBackToStart}>
            ← 첫 화면으로
          </button>
        </div>
        
        {/* 진행 바 */}
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
        
        {/* 질문 */}
        <div className="question-section">
          <h2 className="question-text">{currentQuestion.text}</h2>
          
          {/* 선택지 */}
          <div className="options-container">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestionIndex] === index
              
              return (
                <button
                  key={index}
                  className={`option-button ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  {option.text}
                </button>
              )
            })}
          </div>
        </div>
        
        {/* 네비게이션 버튼 */}
        <div className="navigation-buttons">
          <button
            className="nav-button prev-button"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            이전
          </button>
          
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              className="nav-button next-button"
              onClick={handleNext}
              disabled={answers[currentQuestionIndex] === null}
            >
              다음
            </button>
          ) : (
            <button
              className="nav-button complete-button"
              onClick={onComplete}
              disabled={!allAnswered}
            >
              결과 보기
            </button>
          )}
        </div>
        
        {/* 질문 인디케이터 */}
        <div className="question-indicators">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentQuestionIndex ? 'active' : ''} ${answers[index] !== null ? 'answered' : ''}`}
              onClick={() => setCurrentQuestionIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestionPage
