import { useState } from 'react'
import './UserInfoForm.css'

function UserInfoForm({ onSubmit, onSkip }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({})

  const validatePhone = (phoneNumber) => {
    // 휴대폰 번호 형식 검증 (010-1234-5678 또는 01012345678)
    const phoneRegex = /^010-?\d{4}-?\d{4}$/
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''))
  }

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '')
    if (value.length > 11) value = value.slice(0, 11)
    
    // 자동 하이픈 추가
    if (value.length > 7) {
      value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7)
    } else if (value.length > 3) {
      value = value.slice(0, 3) + '-' + value.slice(3)
    }
    
    setPhone(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = '이름을 입력해주세요.'
    }

    if (!phone.trim()) {
      newErrors.phone = '휴대폰번호를 입력해주세요.'
    } else if (!validatePhone(phone)) {
      newErrors.phone = '올바른 휴대폰번호 형식이 아닙니다. (예: 010-1234-5678)'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({ name: name.trim(), phone: phone.trim() })
  }

  return (
    <div className="user-info-form-container">
      <div className="user-info-form">
        <h2 className="form-title">정보 입력</h2>
        <p className="form-description">
          결과 확인을 위해 아래 정보를 입력해주세요.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">이름</label>
            <input
              type="text"
              id="name"
              className={`form-input ${errors.name ? 'error' : ''}`}
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors({ ...errors, name: '' })
              }}
              placeholder="이름을 입력해주세요"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">휴대폰번호</label>
            <input
              type="tel"
              id="phone"
              className={`form-input ${errors.phone ? 'error' : ''}`}
              value={phone}
              onChange={handlePhoneChange}
              placeholder="010-1234-5678"
              maxLength="13"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="skip-button" onClick={onSkip}>
              건너뛰기
            </button>
            <button type="submit" className="submit-button">
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserInfoForm
