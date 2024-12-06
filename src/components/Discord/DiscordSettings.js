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
} from "@mui/material";
import StepNavigation from "../common/StepNavigation";
import api from "../../utils/api";

function DiscordSettings() {
  const [activeStep, setActiveStep] = useState(0);
  const [settings, setSettings] = useState({
    userId: "",
    keywords: [],
    isValidated: false,
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const fetchDiscordConfig = async () => {
      try {
        const response = await api.get("/notifications/config");
        setSettings((prev) => ({
          ...prev,
          userId: response.data.discord_client_id || "",
          keywords: response.data.keywords || [],
          isValidated: Boolean(response.data.discord_client_id),
        }));

        if (response.data.discord_client_id) {
          setActiveStep(2);
        }
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

    fetchDiscordConfig();
  }, []);

  const handleValidateSettings = async () => {
    setIsValidating(true);
    try {
      const response = await api.post(
        "/notifications/validate-discord-client-id",
        {
          client_id: settings.userId,
        }
      );

      if (response.data.is_valid) {
        setSettings({ ...settings, isValidated: true });
        setSnackbar({
          open: true,
          message: "디스코드 설정이 유효합니다.",
          severity: "success",
        });
      } else {
        throw new Error("유효하지 않은 사용자 ID입니다.");
      }
    } catch (error) {
      setSettings({ ...settings, isValidated: false });
      setSnackbar({
        open: true,
        message: error.message || "디스코드 설정 검증에 실패했습니다.",
        severity: "error",
      });
    } finally {
      setIsValidating(false);
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

  // 설정 저장 처리
  const handleSubmit = async () => {
    try {
      let currentConfig = { data: {} };
      try {
        currentConfig = await api.get("/notifications/config");
      } catch (error) {
        // 404 에러는 무시하고 빈 config로 진행
        if (error.response?.status !== 404) {
          throw error;
        }
      }

      const response = await api.post("/notifications/config", {
        discord_client_id: settings.userId,
        token: currentConfig.data.token || "",
        chat_id: currentConfig.data.chat_id || "",
        keywords: settings.keywords,
      });

      if (response.status === 201) {
        setSnackbar({
          open: true,
          message:
            "디스코드 알림 설정이 저장되었습니다. 매일 오전 11시에 디스코드로 공지사항 알림을 보내드릴게요!",
          severity: "success",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "디스코드 알림 설정 저장에 실패했습니다.",
        severity: "error",
      });
    }
  };

  // renderStepNavigation 함수 수정
  const renderStepNavigation = (canProceed, customButtons = null) => (
    <StepNavigation
      activeStep={activeStep}
      handleNext={() => {
        if (activeStep === stepLabels.length - 1) {
          handleSubmit();
        } else {
          setActiveStep((prev) => prev + 1);
        }
      }}
      handleBack={() => setActiveStep((prev) => prev - 1)}
      stepsLength={stepLabels.length}
      canProceed={canProceed}
      customButtons={customButtons}
    />
  );

  // 스텝 레이블 배열을 상단으로 이동
  const stepLabels = ["디스코드 서버 참여", "사용자 ID 설정", "키워드 설정"];

  // 각 스텝의 컨텐츠를 렌더링하는 함수
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="body1" gutterBottom>
              1. 디스코드 서버 참여하기
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              아래 초대 링크를 통해 디스코드 서버에 참여해주세요.
            </Typography>
            <Button
              variant="contained"
              href="https://discord.gg/CpW3jTMank"
              target="_blank"
              sx={{ mt: 2, mb: 2 }}
            >
              디스코드 서버 참여하기
            </Button>
            {renderStepNavigation(true)}
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="body1" gutterBottom>
              1. 개발자 모드 활성화
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              디스코드 설정 → 앱 설정 → 고급 → 개발자 모드를 활성화해주세요.
            </Typography>
            <Box sx={{ my: 2, maxWidth: "300px" }}>
              <img
                src={require("../../assets/dis1.png")}
                alt="개발자 모드 활성화"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mt: 0.5 }}
              >
                예시: 디스코드 설정에서 개발자 모드를 활성화하는 화면
              </Typography>
            </Box>
            <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
              2. 자신의 사용자 ID 확인
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              자신의 프로필을 우클릭하고 "ID 복사하기"를 선택하여 사용자 ID를
              복사해주세요.
            </Typography>
            <Box sx={{ my: 2, maxWidth: "300px" }}>
              <img
                src={require("../../assets/dis2.png")}
                alt="사용자 ID 확인"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mt: 0.5 }}
              >
                예시: 프로필에서 사용자 ID를 복사하는 화면
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              입력한 ID가 본인의 것인지 확인하기 위해 검증 과정에서 디스코드
              메시지를 전송해요. 메시지가 정상적으로 수신되는지 확인해주세요.
            </Typography>
            <TextField
              fullWidth
              label="디스코드 사용자 ID"
              value={settings.userId}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  userId: e.target.value,
                  isValidated: false,
                })
              }
              margin="normal"
              required
              placeholder="123456789012345678"
            />
            {renderStepNavigation(
              settings.isValidated,
              <Button
                variant="contained"
                onClick={handleValidateSettings}
                disabled={!settings.userId || isValidating}
                fullWidth
                color="secondary"
              >
                {isValidating ? "검증 중..." : "설정 검증하기"}
              </Button>
            )}
          </Box>
        );
      case 2:
        return (
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
            {renderStepNavigation(true)}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          공지사항 디스코드로 알림 받기
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          현재는 홍익대학교 공지사항만 확인이 가능해요
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical">
          {stepLabels.map((label, index) => (
            <Step key={label}>
              <StepLabel
                onClick={() => index < activeStep && setActiveStep(index)}
                sx={{ cursor: index < activeStep ? "pointer" : "default" }}
              >
                {label}
              </StepLabel>
              <StepContent>{renderStepContent(index)}</StepContent>
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

export default DiscordSettings;
