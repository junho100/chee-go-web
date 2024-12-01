import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";

function CoursesMain() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/lectures`
        );
        setCourses(response.data.subjects);
      } catch (error) {
        console.error("강의 데이터를 불러오는 중 오류가 발생했습니다:", error);
        // 오류 처리 로직 추가 (예: 사용자에게 오류 메시지 표시)
      }
    };

    fetchCourses();
  }, []);

  // 완료된 비디오 개수 계산 함수로 변경
  const getCompletedVideosCount = (courseId) => {
    const savedVideos = localStorage.getItem(`completed_videos_${courseId}`);
    if (!savedVideos) return null;

    const completedCount = JSON.parse(savedVideos).length;
    return completedCount > 0 ? completedCount : null;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        강의 목록
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        컴퓨터공학 학습을 위한 강의를 만나보세요!
      </Typography>
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={course.thumbnailUrl}
                alt={course.title}
              />
              <CardContent
                sx={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {course.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    height: 60,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {course.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  강사: {course.instructor}
                </Typography>

                <Box sx={{ flex: 1 }} />

                {/* 완료된 비디오 개수 표시 영역 스타일 개선 */}
                {(() => {
                  const completedCount = getCompletedVideosCount(course.id);
                  return (
                    <Box sx={{ mt: 2, minHeight: "40px" }}>
                      {completedCount && (
                        <Box
                          sx={{
                            p: 1,
                            backgroundColor: "#e3f2fd",
                            borderRadius: 1,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#1976d2",
                              fontWeight: "medium",
                            }}
                          >
                            완료한 강의: {completedCount}개
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  );
                })()}

                <Button
                  component={Link}
                  to={`/courses/${course.id}`}
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  강의 보기
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CoursesMain;
