import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleIdCheck = async () => {
    if (id.length < 4) {
      setIdError("ID는 4자 이상이어야 합니다.");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/check-id`,
        {
          params: { id: id },
        }
      );

      if (response.status === 200) {
        if (!response.data.is_exists) {
          setIdError("");
          setSnackbar({
            open: true,
            message: "사용 가능한 ID입니다.",
            severity: "success",
          });
        } else {
          setIdError("이미 사용 중인 ID입니다.");
        }
      }
    } catch (error) {
      console.error("ID 중복 검사 실패:", error);
      setIdError("ID 중복 검사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError("유효한 이메일 주소를 입력해주세요.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < 3) {
      setPasswordError("비밀번호는 최소 3글자 이상이어야 합니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!id || !email || !password || !confirmPassword) {
      setFormError("모든 필드를 입력해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (idError || passwordError || emailError) {
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users`,
        {
          id,
          password,
          email,
        }
      );

      if (response.status === 200 || response.status === 201) {
        navigate("/resume"); // 이력서 페이지로 이동
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      setFormError("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
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
          회원가입
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <TextField
              fullWidth
              label="아이디"
              variant="outlined"
              margin="normal"
              value={id}
              onChange={(e) => setId(e.target.value)}
              error={!!idError}
              helperText={idError}
              sx={{ mr: 1 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleIdCheck}
              sx={{ mt: 2 }}
            >
              중복 검사
            </Button>
          </Box>
          <TextField
            fullWidth
            label="이메일(비밀번호 찾기 시 사용)"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            helperText={passwordError}
            required
          />
          <TextField
            fullWidth
            label="비밀번호 확인"
            type="password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            required
          />
          {formError && (
            <Typography color="error" align="center">
              {formError}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            회원가입
          </Button>
        </form>
        <Button fullWidth component={RouterLink} to="/" variant="text">
          이미 계정이 있으신가요? 로그인
        </Button>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default SignUp;
