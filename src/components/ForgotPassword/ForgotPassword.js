import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

function ForgotPassword() {
  const [id, setId] = useState("");
  // const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // try {
    //   await axios.post("/api/forgot-password", { id });
    //   setMessage("이메일이 전송되었습니다. 이메일을 확인해 주세요.");
    // } catch (error) {
    //   setMessage("오류가 발생했습니다. 다시 시도해 주세요.");
    // }
    alert("준비 중입니다. 사이트 하단 이메일을 통해 관리자에게 문의 주세요.");
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
          비밀번호 찾기
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            이메일 전송
          </Button>
        </form>
        {/* {message && (
          <Typography color="primary" align="center">
            {message}
          </Typography>
        )} */}
      </Paper>
    </Box>
  );
}

export default ForgotPassword;
