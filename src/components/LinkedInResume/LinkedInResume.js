import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";
import api from "../../utils/api";

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}월`;
}

function LinkedInResume() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await api.get("/resumes/linkedin");
        setResumeData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("이력서 데이터를 가져오는 데 실패했습니다:", error);
        setError("이력서 데이터를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        링크드인 이력서 변환
      </Typography>
      <Typography variant="body1" paragraph>
        아래의 정보를 링크드인 이력서 각 섹션에 복사하여 붙여넣으세요.
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          소개
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          이 정보를 "소개" 섹션에 복사하여 붙여넣으세요.
        </Typography>
        <Typography variant="body1" paragraph>
          {resumeData.introduction}
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          경력사항
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          각 경력 항목을 "경력" 섹션에 개별적으로 추가하세요.
        </Typography>
        {resumeData.work_experiences.map((exp, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="body1">
              <strong>직함:</strong> {exp.position}
            </Typography>
            <Typography variant="body1">
              <strong>회사:</strong> {exp.company_name}
            </Typography>
            <Typography variant="body1">
              <strong>기간:</strong> {formatDate(exp.start_date)} -{" "}
              {formatDate(exp.end_date)}
            </Typography>
            <Typography variant="body1">
              <strong>설명:</strong>
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ whiteSpace: "pre-line" }}
            >
              {exp.content}
            </Typography>
            {index < resumeData.work_experiences.length - 1 && (
              <Divider sx={{ my: 2 }} />
            )}
          </Box>
        ))}
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          학력
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          각 학력 정보를 "학력" 섹션에 개별적으로 추가하세요.
        </Typography>
        {resumeData.educations.map((edu, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>학교:</strong> {edu.school_name}
            </Typography>
            <Typography variant="body1">
              <strong>학위:</strong> {edu.major_name}
            </Typography>
            <Typography variant="body1">
              <strong>기간:</strong> {formatDate(edu.start_date)} -{" "}
              {formatDate(edu.end_date)}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          자격증
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          각 자격증을 "자격증" 섹션에 개별적으로 추가하세요.
        </Typography>
        {resumeData.certificates.map((cert, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>자격증명:</strong> {cert.name}
            </Typography>
            <Typography variant="body1">
              <strong>발급기관:</strong> {cert.issued_by}
            </Typography>
            <Typography variant="body1">
              <strong>취득일:</strong> {formatDate(cert.issued_date)}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          프로젝트
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          각 프로젝트를 "프로젝트" 섹션에 개별적으로 추가하세요.
        </Typography>
        {resumeData.projects.map((project, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>프로젝트명:</strong> {project.name}
            </Typography>
            <Typography variant="body1">
              <strong>기간:</strong> {formatDate(project.start_date)} -{" "}
              {formatDate(project.end_date)}
            </Typography>
            <Typography variant="body1">
              <strong>설명:</strong>
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ whiteSpace: "pre-line" }}
            >
              {project.content}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          보유기술
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          이 기술들을 "기술" 섹션에 추가하세요.
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {resumeData.skills.map((skill, index) => (
            <Chip key={index} label={skill} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default LinkedInResume;
