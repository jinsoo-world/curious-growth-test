import './StartPage.css'

function StartPage({ onStart, onAdminAccess }) {
  return (
    <div className="start-page">
      <div className="start-container">
        <div className="logo-section">
          <img 
            src="/curious-logo-text.png" 
            alt="큐리어스" 
            className="curious-logo-img"
            onError={(e) => {
              // 이미지가 없을 경우 텍스트로 대체
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <h2 className="curious-logo" style={{display: 'none'}}>큐리어스</h2>
        </div>
        
        <h1 className="main-title">인생 후반전, 나에게 맞는 성장 방향을 찾아보세요</h1>
        
        <div className="steps-section">
          <div className="step-card step-1">
            <div className="step-badge">1단계</div>
            <h3 className="step-title">테스트 진행하기</h3>
            <p className="step-description">
              정답은 없어요.<br />
              나와 가장 가까운 선택지를 골라주시면 돼요.
            </p>
          </div>
          
          <div className="step-card step-2">
            <div className="step-badge">2단계</div>
            <h3 className="step-title">상세 결과 보기</h3>
            <p className="step-description">
              내가 어떤 방식으로 살아왔는지,<br />
              그리고 앞으로 어떤 방향이 편안한지 살펴봐요.
            </p>
          </div>
          
          <div className="step-card step-3">
            <div className="step-badge">3단계</div>
            <h3 className="step-title">앞으로의 힌트 찾기</h3>
            <p className="step-description">
              지금까지의 삶에는<br />
              이미 충분한 이유와 이야기가 있어요.<br />
              그 안에서 앞으로의 힌트를 찾아드릴게요.
            </p>
          </div>
        </div>
        
        <button className="start-button" onClick={onStart}>
          테스트 시작하기
        </button>
        
        {/* 하단 아이콘 로고 (이스터에그 - 관리자 접근) */}
        <div className="footer-logo-section">
          <button
            onClick={onAdminAccess}
            className="footer-logo-link"
            title="관리자 페이지"
            type="button"
          >
            <img 
              src="/curious-logo-icon.png" 
              alt="큐리어스 아이콘" 
              className="curious-icon-logo"
              onError={(e) => {
                // 이미지가 없을 경우 CSS 아이콘으로 대체
                e.target.style.display = 'none';
                const placeholder = e.target.nextSibling;
                if (placeholder) {
                  placeholder.style.display = 'block';
                }
              }}
            />
            <div className="curious-icon-placeholder" style={{display: 'none'}}>
              <div className="icon-blob"></div>
              <div className="icon-question">?</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default StartPage
