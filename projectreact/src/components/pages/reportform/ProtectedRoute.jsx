// @ts-nocheck
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthRedirect from "./useAuthRedirect";
import "./Modal.css";

const ProtectedRoute = ({ children }) => {
    const { showModal, handleConfirm, shouldRedirect, isLoggedIn } = useAuthRedirect();
    const location = useLocation(); // ✅ useLocation 훅 추가
    
    // 현재 경로가 로그인 또는 회원가입 페이지인지 확인
    const isLoginOrSignupPage = location.pathname === "/Login" || location.pathname === "/Signup";

    // 로그인이 확인되면 자식 컴포넌트(보호된 페이지)를 렌더링
    if (isLoggedIn) {
        return children;
    }

    // 모달이 닫히고 리디렉션이 필요할 때
    // 또는 현재 페이지가 로그인/회원가입 페이지일 때 리디렉션
    if (shouldRedirect || isLoginOrSignupPage) {
        return <Navigate to="/Login" replace />;
    }
    
    // 로그인이 안 되어있고, 모달이 떠있을 때
    if (showModal) {
        return (
            <>
                {children}
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p className="modal-message">로그인이 필요합니다.</p>
                        <button onClick={handleConfirm} className="btn-primary">
                            확인
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return null;
};

export default ProtectedRoute;