import { useState, useEffect } from 'react'
import { typeResults } from '../data/questions'
import './ResultPage.css'

function ResultPage({ type, onRestart }) {
  const result = typeResults[type]
  const [shareUrl, setShareUrl] = useState('')
  
  useEffect(() => {
    // 현재 URL에 결과 타입 파라미터 추가
    const url = new URL(window.location.href)
    url.searchParams.set('type', type)
    setShareUrl(url.toString())
  }, [type])
  
  if (!result) {
    return <div>결과를 찾을 수 없습니다.</div>
  }
  
  const handleShare = async () => {
    const shareData = {
      title: `나의 성장유형: ${result.emoji} ${result.name}`,
      text: `중장년 성장유형 진단검사 결과를 확인해보세요!`,
      url: shareUrl
    }
    
    try {
      if (navigator.share) {
        // 모바일에서 네이티브 공유 기능 사용
        await navigator.share(shareData)
      } else {
        // 데스크톱에서 URL 클립보드 복사
        await navigator.clipboard.writeText(shareUrl)
        alert('링크가 클립보드에 복사되었습니다!')
      }
    } catch (error) {
      // 사용자가 공유를 취소한 경우 또는 에러 발생
      if (error.name !== 'AbortError') {
        // 클립보드 복사로 대체
        try {
          await navigator.clipboard.writeText(shareUrl)
          alert('링크가 클립보드에 복사되었습니다!')
        } catch (clipboardError) {
          // 클립보드 복사 실패 시 수동 복사 안내
          prompt('링크를 복사하세요:', shareUrl)
        }
      }
    }
  }
  
  return (
    <div className="result-page">
      <div className="result-container">
        {/* 헤더 */}
        <div className="result-header">
          <div className="result-emoji">{result.emoji}</div>
          <h1 className="result-title">
            {result.emoji} {result.name}
          </h1>
        </div>
        
        {/* 현재 상태 */}
        <section className="result-section">
          <h2 className="section-title">당신의 현재 상태</h2>
          <div className="section-content">
            {result.currentState.map((line, index) => (
              <p 
                key={index} 
                className="state-text"
                dangerouslySetInnerHTML={{ 
                  __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                }}
              />
            ))}
          </div>
        </section>
        
        {/* 고민 */}
        <section className="result-section">
          <h2 className="section-title">
            혹시 이런 {type === 'B' ? '생각을 해본 적 있나요?' : type === 'C' ? '상황이 익숙하지 않나요?' : '고민이 있지 않으신가요?'}
          </h2>
          <div className="section-content">
            <ul className="concerns-list">
              {result.concerns.map((concern, index) => (
                <li 
                  key={index} 
                  className="concern-item"
                  dangerouslySetInnerHTML={{ 
                    __html: concern.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                  }}
                />
              ))}
            </ul>
          </div>
        </section>
        
        {/* 필요한 것 */}
        <section className="result-section">
          <h2 className="section-title">지금 가장 필요한 것</h2>
          <div className="section-content">
            <ul className="needs-list">
              {result.needs.map((need, index) => (
                <li 
                  key={index} 
                  className="need-item"
                  dangerouslySetInnerHTML={{ 
                    __html: need.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                  }}
                />
              ))}
            </ul>
          </div>
        </section>
        
        {/* 추천 프로그램 */}
        <section className="result-section recommendation-section">
          <div className="recommendation-box">
            <span className="recommendation-label">👉 추천 프로그램:</span>
            <span className="recommendation-text">{result.recommendation}</span>
          </div>
        </section>
        
        {/* 액션 버튼 */}
        <div className="result-actions">
          <button className="share-button" onClick={handleShare}>
            📤 친구에게 공유하기
          </button>
          <button className="restart-button" onClick={onRestart}>
            다시 테스트하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
