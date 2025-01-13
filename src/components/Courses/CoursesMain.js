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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function CoursesMain() {
  const [courses, setCourses] = useState([]);
  const [mainExpanded, setMainExpanded] = useState("school");
  const [gradeExpanded, setGradeExpanded] = useState(false);

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

  // 강의 분류
  const generalCourses = courses.filter((course) => !course.isForSchool);

  // 학교 강의를 학년별로 분류
  const schoolCoursesByGrade = courses
    .filter((course) => course.isForSchool)
    .reduce((acc, course) => {
      const grade = course.targetGrade;
      if (!acc[grade]) {
        acc[grade] = [];
      }
      acc[grade].push(course);
      return acc;
    }, {});

  // 강의 목록을 표시하는 컴포넌트
  const CoursesList = ({ courses, title }) => (
    <>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          pl: 2,
          borderLeft: "4px solid #1976d2",
          color: "#1976d2",
        }}
      >
        {title}
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
    </>
  );

  const handleMainAccordionChange = (panel) => (event, isExpanded) => {
    setMainExpanded(isExpanded ? panel : false);
  };

  const handleGradeAccordionChange = (grade) => (event, isExpanded) => {
    setGradeExpanded(isExpanded ? grade : false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#2c3e50",
        }}
      >
        강의 목록
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        gutterBottom
        sx={{ mb: 4 }}
      >
        컴퓨터공학 학습을 위한 강의를 만나보세요!
      </Typography>

      {/* 학교 강의 아코디언 */}
      <Accordion
        expanded={mainExpanded === "school"}
        onChange={handleMainAccordionChange("school")}
        sx={{ mb: 2, backgroundColor: "#f8f9fa" }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant="h5"
            sx={{ color: "#2c3e50", fontWeight: "bold" }}
          >
            전공 과목 예습하기
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {Object.entries(schoolCoursesByGrade)
            .sort(([gradeA], [gradeB]) => Number(gradeA) - Number(gradeB))
            .map(([grade, gradeSpecificCourses]) => (
              <Accordion
                key={grade}
                expanded={gradeExpanded === grade}
                onChange={handleGradeAccordionChange(grade)}
                sx={{
                  mb: 2,
                  "&:before": { display: "none" },
                  boxShadow: "none",
                  backgroundColor: "transparent",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.03)",
                    borderRadius: 1,
                    "&.Mui-expanded": {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#1976d2", fontWeight: "medium" }}
                  >
                    {grade}학년 강의 ({gradeSpecificCourses.length}개)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 3 }}>
                  <CoursesList
                    courses={gradeSpecificCourses}
                    title={`${grade}학년 강의 목록`}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
        </AccordionDetails>
      </Accordion>

      {/* 일반 프로그래밍 강의 아코디언 */}
      {generalCourses.length > 0 && (
        <Accordion
          expanded={mainExpanded === "general"}
          onChange={handleMainAccordionChange("general")}
          sx={{ backgroundColor: "#fff8f1" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="h5"
              sx={{ color: "#2c3e50", fontWeight: "bold" }}
            >
              개발 공부하기 ({generalCourses.length}개)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CoursesList courses={generalCourses} title="프로그래밍" />
          </AccordionDetails>
        </Accordion>
      )}
    </Container>
  );
}

export default CoursesMain;
