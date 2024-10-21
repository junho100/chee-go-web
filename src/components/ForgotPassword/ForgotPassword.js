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
import axios from "axios";

function ForgotPassword() {
  const [id, setId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: API 연결 후 아래 주석 해제 및 구현
    // try {
    //   const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/forgot-password`, { id });
    //   if (response.status === 200) {
    //     setSnackbar({
    //       open: true,
    //       message: "비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인해주세요.",
    //       severity: "success"
    //     });
    //   }
    // } catch (error) {
    //   console.error("비밀번호 찾기 요청 실패:", error);
    //   setSnackbar({
    //     open: true,
    //     message: "비밀번호 찾기 요청에 실패했습니다. 다시 시도해주세요.",
    //     severity: "error"
    //   });
    // }

    // 임시 메시지 (API 연결 전까지 사용)
    setSnackbar({
      open: true,
      message:
        "준비 중입니다. 사이트 하단 오픈채팅방을 통해 관리자에게 문의 주세요.",
      severity: "info",
    });
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

export default ForgotPassword;
