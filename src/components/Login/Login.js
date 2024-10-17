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
      setError("아이디와 비밀번호를 모두 입력해주세요.");
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
        const { token } = response.data;
        localStorage.setItem("token", token);
        window.dispatchEvent(new Event("loginStateChanged"));

        // 이력서 데이터를 가져와 localStorage에 저장
        await fetchAndStoreResumeData();

        navigate("/resume");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
      } else {
        setError("로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      }
    }
  };

  const fetchAndStoreResumeData = async () => {
    try {
      const response = await api.get("/resumes");
      const resumeData = {
        introduction: response.data.introduction || "",
        githubUrl: response.data.github_url || "",
        blogUrl: response.data.blog_url || "",
        educations: Array.isArray(response.data.educations)
          ? response.data.educations.map((edu) => ({
              id: edu.id,
              schoolName: edu.school_name || "",
              majorName: edu.major_name || "",
              startDate: edu.start_date ? edu.start_date.substring(0, 7) : "",
              endDate: edu.end_date ? edu.end_date.substring(0, 7) : "",
            }))
          : [],
        // ... 다른 필드들도 같은 방식으로 변환 ...
      };
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
    } catch (error) {
      console.error("이력서 데이터를 가져오는 데 실패했습니다:", error);
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
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
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
