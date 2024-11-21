import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Chip,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function TelegramSettings() {
  const [settings, setSettings] = useState({
    botToken: "",
    chatId: "",
    keywords: ["장학금", "취업", "인턴"],
    isValidated: false,
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isValidating, setIsValidating] = useState(false);

  // API 연동 전 임시 저장 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API 연동 전 임시 로직
      console.log("저장될 설정:", settings);
      setSnackbar({
        open: true,
        message: "설정이 저장되었습니다. (테스트 메시지)",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "설정 저장에 실패했습니다. (테스트 메시지)",
        severity: "error",
      });
    }
  };

  const handleAddKeyword = () => {
    if (
      keywordInput.trim() &&
      !settings.keywords.includes(keywordInput.trim())
    ) {
      setSettings({
        ...settings,
        keywords: [...settings.keywords, keywordInput.trim()],
      });
      setKeywordInput("");
    }
  };

  const handleDeleteKeyword = (keywordToDelete) => {
    setSettings({
      ...settings,
      keywords: settings.keywords.filter(
        (keyword) => keyword !== keywordToDelete
      ),
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // 텔레그램 설정 유효성 검사
  const handleValidateSettings = async () => {
    setIsValidating(true);
    try {
      // API 연동 전 임시 로직
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 로딩 효과를 위한 지연

      // 임시 검증 로직 (실제로는 API 호출로 대체)
      if (settings.botToken.length > 0 && settings.chatId.length > 0) {
        setSettings({ ...settings, isValidated: true });
        setSnackbar({
          open: true,
          message: "텔레그램 설정이 유효합니다.",
          severity: "success",
        });
      } else {
        throw new Error("유효하지 않은 설정입니다.");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "텔레그램 설정 검증에 실패했습니다.",
        severity: "error",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          텔레그램 알림 설정
        </Typography>

        <Link
          component={RouterLink}
          to="/telegram-guide"
          sx={{ display: "block", mb: 3 }}
        >
          텔레그램 봇 설정 가이드 보기
        </Link>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              label="텔레그램 봇 토큰"
              value={settings.botToken}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  botToken: e.target.value,
                  isValidated: false,
                })
              }
              margin="normal"
              required
              disabled={settings.isValidated}
              helperText="봇 설정 가이드를 참고하여 발급받은 토큰을 입력해주세요."
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              label="Chat ID"
              value={settings.chatId}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  chatId: e.target.value,
                  isValidated: false,
                })
              }
              margin="normal"
              required
              disabled={settings.isValidated}
              helperText="봇 설정 가이드를 참고하여 확인한 Chat ID를 입력해주세요."
            />
          </Box>

          <Button
            variant="outlined"
            onClick={handleValidateSettings}
            disabled={
              isValidating ||
              settings.isValidated ||
              !settings.botToken ||
              !settings.chatId
            }
            sx={{ mb: 2 }}
          >
            {isValidating
              ? "검증 중..."
              : settings.isValidated
              ? "검증 완료"
              : "유효성 검사"}
          </Button>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              키워드 설정
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              설정한 키워드가 포함된 공지사항이 있을 경우 알림을 받습니다.
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                label="키워드"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                size="small"
                helperText="키워드를 입력하고 추가 버튼을 클릭하세요."
              />
              <Button
                variant="outlined"
                onClick={handleAddKeyword}
                sx={{
                  minWidth: "100px",
                  height: "40px", // TextField size="small"의 기본 높이와 동일하게 설정
                  alignSelf: "flex-start", // 상단 정렬
                }}
              >
                추가
              </Button>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {settings.keywords.map((keyword, index) => (
                <Chip
                  key={index}
                  label={keyword}
                  onDelete={() => handleDeleteKeyword(keyword)}
                />
              ))}
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 4 }}
            disabled={!settings.isValidated}
          >
            설정 저장
          </Button>

          {!settings.isValidated && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, textAlign: "center" }}
            >
              텔레그램 설정 유효성 검사를 완료하면 설정을 저장할 수 있습니다.
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            * 현재 개발 중인 기능입니다. 실제 알림은 아직 전송되지 않습니다.
          </Typography>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default TelegramSettings;
