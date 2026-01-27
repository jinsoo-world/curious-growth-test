import { useState, useEffect } from 'react'
import './QuestionPage.css'

function QuestionPage({ questions, answers, onAnswer, onComplete, onBackToStart, onShowResult }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [nickname, setNickname] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const allAnswered = answers.every(answer => answer !== null)
  
  useEffect(() => {
    // 첫 번째 질문으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentQuestionIndex])
  
  const handleAnswerSelect = (answerIndex) => {
    onAnswer(currentQuestionIndex, answerIndex)
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
  
  const handleCompleteClick = () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    // 닉네임과 함께 결과 계산 및 저장
    onComplete(nickname)
    // 살짝 연출을 준 뒤 결과 페이지로 이동
    setTimeout(() => {
      onShowResult()
      setIsSubmitting(false)
    }, 900)
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
        
        {/* 마지막 질문에서만 닉네임 입력 */}
        {currentQuestionIndex === questions.length - 1 && (
          <div className="nickname-section">
            <label className="nickname-label">
              마지막으로, 결과에서 불리고 싶은 이름(닉네임)을 적어주세요.
            </label>
            <input
              type="text"
              className="nickname-input"
              placeholder="예: 홍길동, 길동님, 선생님, 닉네임 등"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <p className="nickname-hint">
              입력은 선택 사항이에요. 비워두시면 이름 없이 결과가 보여져요.
            </p>
          </div>
        )}
        
        {/* 네비게이션 버튼 */}
        <div className="navigation-buttons">
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              className="nav-button next-button"
              onClick={handleNext}
              disabled={answers[currentQuestionIndex] === null || isSubmitting}
            >
              다음
            </button>
          ) : (
            <button
              className="nav-button complete-button"
              onClick={handleCompleteClick}
              disabled={!allAnswered || isSubmitting}
            >
              결과 보기
            </button>
          )}
          
          <button
            className="nav-button prev-button"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0 || isSubmitting}
          >
            이전
          </button>
        </div>
        
        {/* 질문 인디케이터 */}
        <div className="question-indicators">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentQuestionIndex ? 'active' : ''} ${answers[index] !== null ? 'answered' : ''}`}
              onClick={() => !isSubmitting && setCurrentQuestionIndex(index)}
            />
          ))}
        </div>
      </div>
      
      {isSubmitting && (
        <div className="submit-overlay">
          <div className="submit-card">
            <div className="submit-check">✓</div>
            <p className="submit-text">응답을 정리하고 있어요...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionPage
