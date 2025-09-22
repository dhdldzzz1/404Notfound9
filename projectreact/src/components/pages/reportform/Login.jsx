// @ts-nocheck
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import './login.css'; // 수정된 CSS 파일

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ loginId: "", password: "" });
  const [errors, setErrors] = useState({});

  // 모달 관련 상태
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!formData.loginId) newErrors.loginId = "아이디를 입력해주세요.";
    if (!formData.password) newErrors.password = "비밀번호를 입력해주세요.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const loggedInUser = await login(formData);
      setMessage(`환영합니다, ${loggedInUser.name}님!`);
      setShowModal(true);
    } catch (error) {
      setMessage(error.message || "로그인 실패");
      setShowModal(true);
    }
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setShowModal(false);
    // 로그인 성공 시에만 리다이렉트
    if (message.startsWith('환영합니다')) {
      // 변경된 부분: navigate에 { replace: true } 옵션을 추가하여 뒤로가기 기록을 대체합니다.
      navigate("/", { replace: true });
    }
  };

  /** Google OAuth */
  const handleGoogleLogin = () => {
    // 더미 버튼이므로 아무 동작도 하지 않습니다.
  };

  /** Kakao OAuth */
  const handleKakaoLogin = () => {
    // 더미 버튼이므로 아무 동작도 하지 않습니다.
  };

  return (

    <div className="bg-light min-vh-100 d-flex flex-column">
      <header>
        <section style={{
          height: 300,
          backgroundImage: "url('/Generated.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <h1 style={{ color: "#fff", fontSize: "44px", fontWeight: 800, letterSpacing: "2px", textShadow: "0 2px 12px rgba(0,0,0,0.35)", margin: 0 }}>로그인</h1>
          </div>
        </section>
      </header>
      <main className="container-xxl py-4 flex-grow-1 d-flex justify-content-center align-items-start">
        <div className="login-card">
          <h3 className="text-center mb-4">로그인</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>아이디</label>
              <input type="text" name="loginId" className="form-control" value={formData.loginId} onChange={handleChange} />
              {errors.loginId && <div className="text-danger small">{errors.loginId}</div>}
            </div>

            <div className="mb-3">
              <label>비밀번호</label>
              <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
              {errors.password && <div className="text-danger small">{errors.password}</div>}
            </div>

            {/* 원래 로그인 버튼 스타일 유지 */}
            <button type="submit" className="btn btn-primary w-100 mb-3">로그인</button>
          </form>

          <div className="social-login">
            <button className="google-btn" onClick={handleGoogleLogin}>
              <img src="/google-logo.png" alt="Google" className="social-logo" /> Google 로그인
            </button>
            <button className="kakao-btn" onClick={handleKakaoLogin}>
              <img src="/kakao-logo.png" alt="Kakao" className="social-logo" /> Kakao 로그인
            </button>
          </div>

          <div className="text-center mt-3">
            {/* 텍스트 색상을 검은색으로 변경 */}
            <Link to="/FindId" className="black-link">아이디 찾기</Link> | <Link to="/FindPassword" className="black-link">비밀번호 찾기</Link> | <Link to="/Signup" className="black-link">회원가입</Link>
          </div>
        </div>
      </main>

      {/* 모달 컴포넌트 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="modal-message">{message}</p>
            <button onClick={closeModal} className="btn-primary">
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



export default Login;