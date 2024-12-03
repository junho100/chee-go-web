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
  Divider,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// 스타일링된 로그인 버튼 컴포넌트 생성
const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#4CAF50",
  color: "#ffffff",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#45a049",
  },
  padding: "6px 16px",
  [theme.breakpoints.down("md")]: {
    marginLeft: theme.spacing(2), // 모바일에서 왼쪽 마진 추가
  },
}));

// 스타일링된 로그아웃 버튼 컴포넌트 생성
const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f44336",
  color: "#ffffff",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
  padding: "6px 16px",
  [theme.breakpoints.down("md")]: {
    marginLeft: theme.spacing(2), // 모바일에서 왼쪽 마진 추가
  },
}));

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
  const [resumeAnchorEl, setResumeAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  // 로그인이 필요하지 않은 경로들을 정의합니다.
  const publicPaths = [
    "/",
    "/login",
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

      if (
        !publicPaths.includes(location.pathname) &&
        !/^\/courses\/\w+$/.test(location.pathname) &&
        !/^\/notification\/[\w-]+$/.test(location.pathname)
      ) {
        navigate("/login");
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

  const handleResumeMenu = (event) => {
    setResumeAnchorEl(event.currentTarget);
  };

  const handleResumeClose = () => {
    setResumeAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  // resumeItems 정의
  const resumeItems = [
    { text: "이력서 쓰기", path: "/resume" },
    { text: "링크드인 형식", path: "/linkedin" },
    { text: "프로그래머스 형식", path: "/programmers" },
    { text: "원티드 형식", path: "/wanted" },
  ];

  // courseItems 추가
  const courseItems = [{ text: "강의 듣기", path: "/" }];

  const renderMenuItems = () => {
    return [
      <MenuItem
        key="service-intro"
        onClick={handleClose}
        component={RouterLink}
        to="/service-intro"
      >
        서비스 소개
      </MenuItem>,
      <Divider key="divider-1" />,
      ...resumeItems.map((item) => (
        <MenuItem
          key={item.path}
          onClick={handleClose}
          component={RouterLink}
          to={item.path}
        >
          {item.text}
        </MenuItem>
      )),
      <Divider key="divider-2" />,
      ...courseItems.map((item) => (
        <MenuItem
          key={item.path}
          onClick={handleClose}
          component={RouterLink}
          to={item.path}
        >
          {item.text}
        </MenuItem>
      )),
      <MenuItem
        key="telegram"
        onClick={() => {
          handleClose();
          navigate("/notifications/telegram");
        }}
      >
        텔레그램으로 받기
      </MenuItem>,
      <MenuItem
        key="discord"
        onClick={() => {
          handleClose();
          navigate("/notifications/discord");
        }}
      >
        디스코드로 받기
      </MenuItem>,
      <Divider key="divider-3" />,
      // 로그인 상태에 따라 다른 버튼 표시
      isLoggedIn ? (
        <MenuItem
          key="logout"
          onClick={() => {
            handleClose();
            handleLogout();
          }}
          sx={{ color: "error.main" }}
        >
          로그아웃
        </MenuItem>
      ) : (
        <MenuItem
          key="login"
          onClick={handleClose}
          component={RouterLink}
          to="/login"
          sx={{ color: "primary.main" }}
        >
          로그인
        </MenuItem>
      ),
    ].flat();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
          >
            취Go
          </Typography>
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
                {renderMenuItems()}
              </Menu>
            </>
          ) : (
            <>
              <IntroButton component={RouterLink} to="/service-intro">
                서비스 소개
              </IntroButton>
              <Button color="inherit" component={RouterLink} to="/">
                강의 듣기
              </Button>
              <Button
                color="inherit"
                onClick={handleNotificationClick}
                endIcon={<ExpandMoreIcon />}
              >
                공지사항 알림 받기
              </Button>
              <Button
                color="inherit"
                onClick={handleResumeMenu}
                endIcon={<ExpandMoreIcon />}
              >
                이력서 관리하기
              </Button>
              <Menu
                anchorEl={resumeAnchorEl}
                open={Boolean(resumeAnchorEl)}
                onClose={handleResumeClose}
              >
                {resumeItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={handleResumeClose}
                    component={RouterLink}
                    to={item.path}
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </Menu>
              <Menu
                anchorEl={notificationAnchorEl}
                open={Boolean(notificationAnchorEl)}
                onClose={handleNotificationClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/notifications/telegram");
                    handleNotificationClose();
                  }}
                >
                  텔레그램으로 받기
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/notifications/discord");
                    handleNotificationClose();
                  }}
                >
                  디스코드로 받기
                </MenuItem>
              </Menu>
              {isLoggedIn ? (
                <LogoutButton onClick={handleLogout} variant="contained">
                  로그아웃
                </LogoutButton>
              ) : (
                <LoginButton
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                >
                  로그인
                </LoginButton>
              )}
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
