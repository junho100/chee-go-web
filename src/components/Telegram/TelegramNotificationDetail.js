import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Paper, Button, Divider } from "@mui/material";
import { Launch as LaunchIcon } from "@mui/icons-material";

function TelegramNotificationDetail() {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/notifications/${id}`
        );
        setNotification(response.data);
      } catch (err) {
        setError("알림을 불러오는데 실패했습니다.");
        console.error("Error fetching notification:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotification();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (loading)
    return (
      <Box sx={{ textAlign: "center", p: 3 }}>
        <Typography>로딩중...</Typography>
      </Box>
    );
  if (error)
    return (
      <Box sx={{ textAlign: "center", p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  if (!notification) return null;

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            {notification.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            작성일: {formatDate(notification.date)}
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
          {notification.content}
        </Typography>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            endIcon={<LaunchIcon />}
            href={notification.url}
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
