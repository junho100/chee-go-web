import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../utils/api";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.post("/users/me", {
          token: token,
        });
        if (response.status === 201) {
          navigate("/resume");
        }
      } catch (error) {
        console.error("로그인 상태 확인 중 오류 발생:", error);
        localStorage.removeItem("token");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ID와 비밀번호가 비어있는지 확인
    if (!id.trim() || !password.trim()) {
      setError("아이디와 비밀번��를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          id,
          password,
        }
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        window.dispatchEvent(new Event("loginStateChanged"));
        navigate("/service-intro"); // 여기를 /service-intro로 변경
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
      } else {
        setError("로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      }
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          mb: 4,
          px: 2, // 좌우 패딩 추가
          wordBreak: "keep-all", // 단어 단위로 줄바꿈
          whiteSpace: "pre-line", // 필요한 경우 줄바꿈 허용
          textAlign: "center", // 텍스트 중앙 정렬
        }}
      >
        이력서를 구직 플랫폼에 맞게 변환해드려요!
      </Typography>
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          로그인
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="아이디"
            variant="outlined"
            margin="normal"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
        </form>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleSignUp}
          sx={{ mb: 2 }}
        >
          회원가입
        </Button>
        <Button
          fullWidth
          variant="text"
          color="primary"
          onClick={handleForgotPassword}
        >
          비밀번호 찾기
        </Button>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError("")}
          message={error}
        />
      </Paper>
    </Box>
  );
}

export default Login;
