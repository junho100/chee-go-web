import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
} from "@mui/material";

function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/lectures/${courseId}`
        );
        setCourse(response.data);
        setSelectedVideo(response.data.videos[0]);
      } catch (error) {
        console.error("강의 데이터를 불러오는 중 오류가 발생했습니다:", error);
        // 오류 처리 로직 추가 (예: 사용자에게 오류 메시지 표시 또는 강의 목록 페이지로 리다이렉트)
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <Typography>강의를 불러오는 중...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        variant="contained"
        onClick={() => navigate("/courses")}
        sx={{ mb: 2 }}
      >
        강의 목록으로 돌아가기
      </Button>
      <Typography variant="h4" gutterBottom>
        {course.title}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3}>
            <iframe
              width="100%"
              height="480"
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Paper>
          <Typography variant="h6" sx={{ mt: 2 }}>
            {selectedVideo.title}
          </Typography>
          <Typography variant="body1">{selectedVideo.description}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <List>
              {course.videos.map((video) => (
                <ListItem key={video.id} disablePadding>
                  <ListItemButton
                    selected={video.id === selectedVideo.id}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <ListItemText primary={video.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CoursePage;
