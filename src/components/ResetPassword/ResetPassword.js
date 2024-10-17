import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encodedEmail = params.get("key");
    if (encodedEmail) {
      setEmail(atob(encodedEmail));
    } else {
      setMessage("유효하지 않은 링크입니다.");
    }
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/reset-password`, {
        email,
        password,
      });
      setMessage("비밀번호가 성공적으로 변경되었습니다.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage("오류가 발생했습니다. 다시 시도해 주세요.");
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
          새 비밀번호 설정
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="새 비밀번호"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="비밀번호 확인"
            type="password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            비밀번호 변경
          </Button>
        </form>
        {message && (
          <Typography color="primary" align="center">
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default ResetPassword;
