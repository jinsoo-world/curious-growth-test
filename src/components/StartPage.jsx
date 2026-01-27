import './StartPage.css'

function StartPage({ onStart, onAdminAccess }) {
  return (
    <div className="start-page">
      <div className="start-container">
        <div className="logo-section">
          <a 
            href="https://curious-500.com/" 
            target="_blank" 
            rel="noreferrer"
            className="curious-logo-link"
          >
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
          </a>
        </div>
        
        <h1 className="main-title">인생 후반전, 나에게 맞는 성장 방향을 찾아보세요</h1>

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
