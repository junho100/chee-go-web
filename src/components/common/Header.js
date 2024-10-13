import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, styled } from "@mui/material";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";

// 스타일링된 로그인 버튼 컴포넌트 생성
const LoginButton = styled(Button)({
  backgroundColor: "#4CAF50", // 초록색
  color: "#ffffff",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#45a049", // 호버 시 약간 어두운 초록색
  },
  padding: "6px 16px",
  marginLeft: "16px",
});

// 스타일링된 로그아웃 버튼 컴포넌트 생성
const LogoutButton = styled(Button)({
  backgroundColor: "#f44336", // 붉은색
  color: "#ffffff",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#d32f2f", // 호버 시 약간 어두운 붉은색
  },
  padding: "6px 16px",
  marginLeft: "16px",
});

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.post("/users/me", {
          token: token,
        });
        if (response.status === 201) {
          setIsLoggedIn(true);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error("로그인 상태 확인 중 오류 발생:", error);
        handleLogout();
      }
    } else {
      handleLogout();
    }
  };

  useEffect(() => {
    checkLoginStatus();

    const handleLoginStateChanged = () => {
      checkLoginStatus();
    };

    window.addEventListener("loginStateChanged", handleLoginStateChanged);

    return () => {
      window.removeEventListener("loginStateChanged", handleLoginStateChanged);
    };
  }, [location]); // location이 변경될 때마다 실행

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          이력서 생성기
        </Typography>
        <Button color="inherit" component={RouterLink} to="/resume">
          이력서
        </Button>
        <Button color="inherit" component={RouterLink} to="/linkedin">
          링크드인 형식
        </Button>
        <Button color="inherit" component={RouterLink} to="/programmers">
          프로그래머스 형식
        </Button>
        <Button color="inherit" component={RouterLink} to="/wanted">
          원티드 형식
        </Button>
        {isLoggedIn ? (
          <LogoutButton onClick={handleLogout} variant="contained">
            로그아웃
          </LogoutButton>
        ) : (
          <LoginButton component={RouterLink} to="/" variant="contained">
            로그인
          </LoginButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
