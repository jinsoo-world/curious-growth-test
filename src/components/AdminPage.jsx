import { useState, useEffect } from 'react'
import { getStoredData, clearAllData, exportToCSV, checkAdminPassword } from '../utils/storage'
import './AdminPage.css'

function AdminPage({ onBack }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [data, setData] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const loadData = () => {
    const storedData = getStoredData()
    setData(storedData)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (checkAdminPassword(password)) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('비밀번호가 올바르지 않습니다.')
    }
  }

  const handleExport = () => {
    const csv = exportToCSV()
    if (!csv) {
      alert('내보낼 데이터가 없습니다.')
      return
    }

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `curious_test_data_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleClear = () => {
    if (window.confirm('정말로 모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      clearAllData()
      setData([])
      setSelectedItem(null)
      alert('모든 데이터가 삭제되었습니다.')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-form">
          <h2 className="login-title">관리자 로그인</h2>
          <form onSubmit={handleLogin}>
            <div className="login-group">
              <label htmlFor="password" className="login-label">비밀번호</label>
              <input
                type="password"
                id="password"
                className="login-input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="관리자 비밀번호를 입력하세요"
                autoFocus
              />
              {error && <span className="login-error">{error}</span>}
            </div>
            <button type="submit" className="login-button">로그인</button>
          </form>
          <button className="back-button" onClick={onBack}>뒤로 가기</button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">관리자 페이지</h1>
        <div className="admin-actions">
          <button className="export-button" onClick={handleExport}>
            CSV 내보내기
          </button>
          <button className="clear-button" onClick={handleClear}>
            전체 삭제
          </button>
          <button className="back-button" onClick={onBack}>뒤로 가기</button>
        </div>
      </div>

      <div className="admin-content">
        <div className="data-summary">
          <p className="summary-text">총 <strong>{data.length}</strong>개의 진단 결과</p>
        </div>

        {data.length === 0 ? (
          <div className="empty-state">
            <p>저장된 데이터가 없습니다.</p>
          </div>
        ) : (
          <div className="data-list">
            {data.map((item) => (
              <div
                key={item.id}
                className={`data-item ${selectedItem?.id === item.id ? 'selected' : ''}`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="data-item-header">
                  <span className="data-name">{item.userName || '이름 없음'}</span>
                  <span className="data-type">{item.resultType} 유형</span>
                </div>
                <div className="data-item-meta">
                  <span className="data-phone">{item.phoneNumber || '번호 없음'}</span>
                  <span className="data-date">{formatDate(item.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedItem && (
          <div className="data-detail">
            <div className="detail-header">
              <h3 className="detail-title">상세 정보</h3>
              <button className="close-button" onClick={() => setSelectedItem(null)}>×</button>
            </div>
            <div className="detail-content">
              <div className="detail-section">
                <h4 className="detail-label">기본 정보</h4>
                <div className="detail-info">
                  <p><strong>이름:</strong> {selectedItem.userName || '이름 없음'}</p>
                  <p><strong>휴대폰번호:</strong> {selectedItem.phoneNumber || '번호 없음'}</p>
                  <p><strong>결과 유형:</strong> {selectedItem.resultType} 유형</p>
                  <p><strong>진단 일시:</strong> {formatDate(selectedItem.timestamp)}</p>
                </div>
              </div>

              <div className="detail-section">
                <h4 className="detail-label">점수</h4>
                <div className="scores-grid">
                  <div className="score-item">
                    <span className="score-label">A</span>
                    <span className="score-value">{selectedItem.scores?.A || 0}</span>
                  </div>
                  <div className="score-item">
                    <span className="score-label">B</span>
                    <span className="score-value">{selectedItem.scores?.B || 0}</span>
                  </div>
                  <div className="score-item">
                    <span className="score-label">C</span>
                    <span className="score-value">{selectedItem.scores?.C || 0}</span>
                  </div>
                  <div className="score-item">
                    <span className="score-label">D</span>
                    <span className="score-value">{selectedItem.scores?.D || 0}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4 className="detail-label">문항별 답변</h4>
                <div className="answers-list">
                  {selectedItem.answers.map((answer, index) => (
                    <div key={index} className="answer-item">
                      <div className="answer-question">
                        <strong>Q{answer.questionId}.</strong> {answer.questionText}
                      </div>
                      <div className="answer-text">
                        {answer.answerText || '답변 없음'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage
