import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function TelegramGuide() {
  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          텔레그램 봇 설정 가이드
        </Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>
          1. 텔레그램 봇 토큰 발급받기
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="1) 텔레그램에서 'BotFather' 검색"
              secondary="텔레그램 앱에서 'BotFather'를 검색하여 공식 봇을 찾습니다."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="2) 새로운 봇 생성"
              secondary="/newbot 명령어를 입력하고 봇의 이름을 설정합니다."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="3) 토큰 저장"
              secondary="생성된 봇의 HTTP API 토큰을 저장합니다. (예: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz)"
            />
          </ListItem>
        </List>

        <Typography variant="h6" sx={{ mt: 3 }}>
          2. Chat ID 확인하기
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="1) 생성한 봇과 대화 시작"
              secondary="텔레그램에서 생성한 봇을 검색하여 대화를 시작합니다."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="2) /start 명령어 입력"
              secondary="봇과의 대화창에서 /start 명령어를 입력합니다."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="3) Chat ID 확인"
              secondary={
                <span>
                  다음 링크에 접속하여 Chat ID를 확인합니다:
                  <Link
                    href={`https://api.telegram.org/bot[YOUR_BOT_TOKEN]/getUpdates`}
                    target="_blank"
                    sx={{ ml: 1 }}
                  >
                    Chat ID 확인하기
                  </Link>{" "}
                  (봇 토큰을 입력해야 합니다)
                </span>
              }
            />
          </ListItem>
        </List>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            component={RouterLink}
            to="/telegram-settings"
            variant="contained"
            color="primary"
            size="large"
          >
            텔레그램 설정하러 가기
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default TelegramGuide;
