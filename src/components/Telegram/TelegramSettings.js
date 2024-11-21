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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  ButtonGroup,
} from "@mui/material";

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

  // 봇 토큰 유효성 검사 함수 수정
  const handleValidateBotToken = async () => {
    setIsValidating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (settings.botToken.length > 20) {
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
            텔레그램 앱에서 'BotFather'를 검색하여 공식 봇을 찾습니다.
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
            2. 새로운 봇 생성
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            /newbot 명령어를 입력하고 봇의 이름을 설정합니다.
          </Typography>
          <StepNavigation canProceed={true} />
        </Box>
      ),
    },
    {
      label: "봇 토큰 입력",
      content: (
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            BotFather가 제공한 HTTP API 토큰을 입력해주세요.
          </Typography>
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
            입력하세요.
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
            알림을 받고 싶은 키워드를 입력해주세요.
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
          텔레그램 알림 설정
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
