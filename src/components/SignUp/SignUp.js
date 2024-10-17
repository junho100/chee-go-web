import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function SignUp() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");

  const handleIdCheck = () => {
    // 여기에 실제 ID 중복 검사 로직을 구현해야 합니다.
    // 지금은 예시로 간단히 구현합니다.
    if (id.length < 4) {
      setIdError("ID는 4자 이상이어야 합니다.");
    } else {
      setIdError("");
      alert("사용 가능한 ID입니다.");
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

  const handleSubmit = (event) => {
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
    // 여기에 회원가입 로직을 추가하세요
    console.log("회원가입 시도:", { id, email, password });
    setFormError("");
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
    </Box>
  );
}

export default SignUp;
