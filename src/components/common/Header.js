import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  styled,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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

// 서비스 소개 버튼을 위한 새로운 스타일 컴포넌트
const IntroButton = styled(Button)({
  backgroundColor: "rgba(255, 255, 255, 0.1)", // 반투명한 흰색
  color: "#ffffff",
  fontSize: "0.8rem",
  fontWeight: "normal",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // 호버 시 약간 더 불투명한 흰색
  },
  padding: "2px 8px",
  marginLeft: "8px",
  borderRadius: "4px",
  textTransform: "none", // 대문자 변환 방지
});

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // 로그인이 필요하지 않은 경로들을 정의합니다.
  const publicPaths = [
    "/",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/service-intro",
  ];

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
      setIsLoggedIn(false);
      // 현재 경로가 publicPaths에 포함되지 않은 경우에만 리다이렉트합니다.
      if (!publicPaths.includes(location.pathname)) {
        navigate("/");
      }
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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
        >
          취Go
        </Typography>
        {!isMobile && (
          <IntroButton component={RouterLink} to="/service-intro">
            서비스 소개
          </IntroButton>
        )}
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/service-intro"
              >
                서비스 소개
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/resume"
              >
                이력서
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/linkedin"
              >
                링크드인 형식
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/programmers"
              >
                프로그래머스 형식
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/wanted"
              >
                원티드 형식
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
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
          </>
        )}
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
