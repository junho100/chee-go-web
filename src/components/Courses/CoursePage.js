import React, { useState, useEffect, useRef } from "react";
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
  Divider,
  Checkbox,
  Box,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [completedVideos, setCompletedVideos] = useState(new Set());
  const playerRef = useRef(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/lectures/${courseId}`
        );
        setCourse(response.data);
        if (response.data.videos && response.data.videos.length > 0) {
          setSelectedVideo(response.data.videos[0]);
          setIsPlayerReady(true);
        }
      } catch (error) {
        console.error("강의 데이터를 불러오는 중 오류가 발생했습니다:", error);
        // 오류 처리 로직 추가 (예: 사용자에게 오류 메시지 표시 또는 강의 목록 페이지로 리다이렉트)
      }
    };

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    // 페이지 로드 시 localStorage에서 완료된 강의 목록을 불러옵니다
    const loadCompletedVideos = () => {
      const saved = localStorage.getItem(`completed_videos_${courseId}`);
      if (saved) {
        setCompletedVideos(new Set(JSON.parse(saved)));
      }
    };

    loadCompletedVideos();
  }, [courseId]);

  // 체크박스 상태 변경 핸들러
  const handleVideoCompletion = (videoId) => {
    setCompletedVideos((prev) => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(videoId)) {
        newCompleted.delete(videoId);
      } else {
        newCompleted.add(videoId);
      }

      // localStorage에 저장
      localStorage.setItem(
        `completed_videos_${courseId}`,
        JSON.stringify([...newCompleted])
      );

      return newCompleted;
    });
  };

  // 수강률 계산 함수
  const calculateProgress = () => {
    if (!course || !course.videos || course.videos.length === 0) return 0;
    return Math.round((completedVideos.size / course.videos.length) * 100);
  };

  useEffect(() => {
    if (!isPlayerReady || !selectedVideo) return;

    const initializeYouTubePlayer = () => {
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      const initPlayer = () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }

        playerRef.current = new window.YT.Player("youtube-player", {
          height: "100%",
          width: "100%",
          videoId: selectedVideo.youtubeId,
          playerVars: {
            autoplay: 0,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              playerRef.current = event.target;
            },
            onStateChange: (event) => {
              if (event.data === 0) {
                handleVideoCompletion(selectedVideo.id);
              }
            },
          },
        });
      };

      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        window.onYouTubeIframeAPIReady = initPlayer;
      }
    };

    initializeYouTubePlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [selectedVideo, isPlayerReady]);

  // 비디오 선택 핸들러 수정
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    if (playerRef.current?.loadVideoById) {
      playerRef.current.loadVideoById(video.youtubeId);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!course) {
    return <Typography>강의를 불러오는 중...</Typography>;
  }

  const progress = calculateProgress();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button variant="contained" onClick={() => navigate("/")} sx={{ mb: 2 }}>
        강의 목록으로 돌아가기
      </Button>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
          hyphens: "auto",
          mb: 3,
        }}
      >
        {course.title}
      </Typography>

      {/* 수강률 표시 영역 추가 */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          수강 진도율: {progress}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: progress === 100 ? "#4caf50" : "#1976d2",
              borderRadius: 5,
            },
          }}
        />
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3}>
            <Box
              sx={{
                position: "relative",
                paddingTop: "56.25%", // 16:9 비율
                width: "100%",
                overflow: "hidden",
              }}
            >
              <Box
                id="youtube-player"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </Box>
          </Paper>
          <Typography variant="h6" sx={{ mt: 3, mb: 2, fontWeight: "bold" }}>
            {selectedVideo.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ backgroundColor: "#f5f5f5", p: 2, borderRadius: 1 }}
          >
            {selectedVideo.description}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <List sx={{ p: 0 }}>
              {course.videos.map((video, index) => (
                <React.Fragment key={video.id}>
                  <ListItem
                    disablePadding
                    sx={{
                      backgroundColor:
                        video.id === selectedVideo.id ? "#e3f2fd" : "inherit",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <ListItemButton
                      onClick={() => handleVideoSelect(video)}
                      sx={{ py: 2 }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Checkbox
                              checked={completedVideos.has(video.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleVideoCompletion(video.id);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              sx={{ mr: 1 }}
                            />
                            <Typography
                              sx={{
                                fontWeight:
                                  video.id === selectedVideo.id
                                    ? "bold"
                                    : "normal",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                                lineHeight: 1.2,
                              }}
                            >
                              {video.title}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  {index < course.videos.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CoursePage;
