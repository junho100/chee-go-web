import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Chip,
  Snackbar,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  ButtonGroup,
} from "@mui/material";
import api from "../../utils/api";

function TelegramSettings() {
  const [activeStep, setActiveStep] = useState(0);
  const [settings, setSettings] = useState({
    botToken: "",
    chatId: "",
    keywords: ["장학금", "취업", "인턴"],
    isValidated: false,
    botTokenValidated: false,
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const fetchTelegramConfig = async () => {
      try {
        const response = await api.get("/notifications/config");
        setSettings((prev) => ({
          ...prev,
          botToken: response.data.token,
          chatId: response.data.chat_id,
          keywords: response.data.keywords,
          isValidated: true,
          botTokenValidated: true,
        }));
        setActiveStep(3);
      } catch (error) {
        if (error.response?.status !== 404) {
          setSnackbar({
            open: true,
            message: "설정 정보를 불러오는데 실패했습니다.",
            severity: "error",
          });
        }
      }
    };

    fetchTelegramConfig();
  }, []);

  // API 연동 전 임시 저장 처리
  const handleSubmit = async () => {
    try {
      // 먼저 현재 설정을 가져옴
      const currentConfig = await api.get("/notifications/config");

      // 현재 설정에 텔레그램 설정을 업데이트
      const response = await api.post("/notifications/config", {
        telegram_chat_id: settings.chatId,
        discord_client_id: currentConfig.data.discord_client_id || "", // 기존 디스코드 설정 유지
        keywords: settings.keywords,
      });

      if (response.status === 201) {
        setSnackbar({
          open: true,
          message:
            "텔레그램 알림 설정이 저장되었습니다. 매일 오전 11시에 텔레그램으로 공지사항 알림을 보내드릴게요!",
          severity: "success",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "텔레그램 알림 설정 저장에 실패했습니다.",
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
      const response = await api.post("/notifications/validate-chat-id", {
        token: settings.botToken,
        chat_id: settings.chatId,
      });

      if (response.data.is_valid) {
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
      setSettings({ ...settings, isValidated: false });
      setSnackbar({
        open: true,
        message: error.message || "텔레그램 설정 검증에 실패했습니다.",
        severity: "error",
      });
    } finally {
      setIsValidating(false);
    }
  };

  // 봇 토큰 유효성 검사 함수 수정
  const handleValidateBotToken = async () => {
    setIsValidating(true);
    try {
      const response = await api.post("/notifications/validate-token", {
        token: settings.botToken,
      });

      if (response.data.is_valid) {
        setSettings({ ...settings, botTokenValidated: true });
        setSnackbar({
          open: true,
          message: "봇 토큰이 유효합니다.",
          severity: "success",
        });
      } else {
        throw new Error("유효하지 않은 봇 토큰입니다.");
      }
    } catch (error) {
      setSettings({ ...settings, botTokenValidated: false });
      setSnackbar({
        open: true,
        message: error.message || "봇 토큰 검증에 실패했습니다.",
        severity: "error",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const StepNavigation = ({ canProceed, customButtons }) => (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {customButtons}
      <ButtonGroup fullWidth>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{ flex: 1 }}
        >
          이전
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!canProceed}
            sx={{ flex: 1 }}
          >
            다음
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!settings.isValidated}
            sx={{ flex: 1 }}
          >
            설정 완료
          </Button>
        )}
      </ButtonGroup>
    </Box>
  );

  const steps = [
    {
      label: "텔레그램 봇 생성",
      content: (
        <Box>
          <Typography variant="body1" gutterBottom>
            1. 텔레그램에서 'BotFather' 검색
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            텔레그램 앱에서 'BotFather'를 검색하여 공식 봇을 찾아주세요.
          </Typography>
          <Box sx={{ my: 2, maxWidth: "300px" }}>
            <img
              src={require("../../assets/tele1.png")}
              alt="BotFather 검색"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Box>
          <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
            2. 새로운 봇 생성
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            /newbot 명령어를 입력하고 봇의 이름을 설정해주세요.
          </Typography>
          <Box sx={{ my: 2, maxWidth: "300px" }}>
            <img
              src={require("../../assets/tele2.png")}
              alt="새로운 봇 생성"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Box>
          <StepNavigation canProceed={true} />
        </Box>
      ),
    },
    {
      label: "봇 토큰 입력",
      content: (
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            BotFather가 제공한 HTTP API 토큰을 입력해주세요. 예시는 입력창을
            클릭하면 확인할 수 있어요.
          </Typography>
          <Box sx={{ my: 2, maxWidth: "300px" }}>
            <img
              src={require("../../assets/tele3.png")}
              alt="봇 토큰 예시"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Box>
          <TextField
            fullWidth
            label="텔레그램 봇 토큰"
            value={settings.botToken}
            onChange={(e) =>
              setSettings({
                ...settings,
                botToken: e.target.value,
                botTokenValidated: false,
              })
            }
            margin="normal"
            required
            placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
          />
          <StepNavigation
            canProceed={settings.botTokenValidated}
            customButtons={
              <Button
                variant="contained"
                onClick={handleValidateBotToken}
                disabled={!settings.botToken || isValidating}
                fullWidth
                color="secondary"
              >
                {isValidating ? "검증 중..." : "봇 토큰 검증하기"}
              </Button>
            }
          />
        </Box>
      ),
    },
    {
      label: "Chat ID 확인",
      content: (
        <Box>
          <Typography variant="body1" gutterBottom>
            1. 생성한 봇과 대화 시작
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            텔레그램에서 생성한 봇을 검색하여 대화를 시작하고 /start 명령어를
            입력해주세요. <br /> 명령어 입력 후 아래 "CHAT ID 확인하기" 버튼을
            눌러 Chat ID를 확인하세요. <br /> Chat ID가 확인되지 않으신다면,
            봇에게 메시지를 몇개 보내주신 후 다시 시도해주세요.
          </Typography>
          {settings.botToken && (
            <Button
              variant="outlined"
              href={`https://api.telegram.org/bot${settings.botToken}/getUpdates`}
              target="_blank"
              sx={{ mt: 2, mb: 2 }}
            >
              Chat ID 확인하기
            </Button>
          )}
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
            placeholder="123456789"
          />
          <StepNavigation
            canProceed={settings.isValidated}
            customButtons={
              <Button
                variant="contained"
                onClick={handleValidateSettings}
                disabled={
                  !settings.botToken || !settings.chatId || isValidating
                }
                fullWidth
                color="secondary"
              >
                {isValidating ? "검증 중..." : "설정 검증하기"}
              </Button>
            }
          />
        </Box>
      ),
    },
    {
      label: "키워드 설정",
      content: (
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            알림을 받고 싶은 키워드를 입력해주세요. 키워드가 제목에 포함된
            공지사항을 알림으로 받을 수 있어요.
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              label="키워드"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              size="small"
            />
            <Button variant="outlined" onClick={handleAddKeyword}>
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
          <StepNavigation canProceed={settings.keywords.length > 0} />
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          공지사항 텔레그램으로 알림 받기
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          현재는 홍익대학교 공지사항만 확인이 가능해요
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                onClick={() => index < activeStep && setActiveStep(index)}
                sx={{ cursor: index < activeStep ? "pointer" : "default" }}
              >
                {step.label}
              </StepLabel>
              <StepContent>{step.content}</StepContent>
            </Step>
          ))}
        </Stepper>
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
