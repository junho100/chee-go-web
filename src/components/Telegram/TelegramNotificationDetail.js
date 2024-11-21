import React from "react";
import { Box, Typography, Paper, Button, Divider } from "@mui/material";
import { Launch as LaunchIcon } from "@mui/icons-material";

// Mock 데이터 (실제로는 API에서 받아올 데이터)
const mockNotification = {
  id: 1,
  title: "2024학년도 1학기 국가장학금 2차 신청 안내",
  date: "2024-02-15",
  content: `1. 신청기간: 2024. 2. 21.(수) 9시 ~ 3. 7.(목) 18시

2. 서류제출 및 가구원동의: 2024. 2. 21.(수) 9시 ~ 3. 11.(월) 18시

3. 신청대상
  - 재학생, 신입생, 편입생, 재입학생, 복학생 등
  - 소득 8구간 이하 학생
  - 직전학기 성적 80점 이상, 12학점 이상 이수

4. 지원내용
  - 소득구간별 차등지원
  - 기초/차상위: 등록금 전액
  - 1구간: 등록금 전액
  - 2구간: 등록금 전액
  - 3구간: 등록금의 80%
  - 4구간: 등록금의 60%
  - 5~6구간: 등록금의 30%
  - 7~8구간: 등록금의 20%

5. 신청방법
  - 한국장학재단 홈페이지(www.kosaf.go.kr)
  - 한국장학재단 모바일 앱

6. 문의
  - 한국장학재단 고객센터: 1599-2000
  - 학교 학생지원과: 02-XXX-XXXX`,
  url: "https://example.com/notice/1",
  createdAt: "2024-02-15T09:00:00",
};

function TelegramNotificationDetail() {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            {mockNotification.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            작성일: {formatDate(mockNotification.createdAt)}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="body1"
          component="pre"
          sx={{
            whiteSpace: "pre-line",
            fontFamily: "inherit",
            mb: 4,
          }}
        >
          {mockNotification.content}
        </Typography>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            endIcon={<LaunchIcon />}
            href={mockNotification.url}
            target="_blank"
            rel="noopener noreferrer"
            size="large"
          >
            원문 보기
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default TelegramNotificationDetail;
