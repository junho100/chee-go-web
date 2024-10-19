import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Link,
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

function ProgrammersResume() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await api.get("/resumes/programmers");
        setResumeData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("이력서 데이터를 가져오는 데 실패했습니다:", error);
        if (error.response && error.response.status === 404) {
          setError("저장된 이력서가 없습니다. 이력서를 작성해주세요!");
        } else {
          setError("이력서 데이터를 불러오는 데 실패했습니다.");
        }
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        프로그래머스 이력서 변환
      </Typography>
      <Typography variant="body1" paragraph>
        아래의 정보를 프로그래머스 이력서 각 섹션에 복사하여 붙여넣으세요.
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          업무 경험
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          이 정보를 "업무 경험" 섹션에 복사하여 붙여넣으세요.
        </Typography>
        {resumeData.work_experiences.map((exp, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="body1">
              <strong>회사명:</strong> {exp.company_name}
            </Typography>
            <Typography variant="body1">
              <strong>직무:</strong> {exp.position}
            </Typography>
            <Typography variant="body1">
              <strong>업무 시작일:</strong> {formatDate(exp.start_date)}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>상세 업무 및 성과:</strong>
            </Typography>
            {exp.details.map((detail, detailIndex) => (
              <Box key={detailIndex} sx={{ ml: 2, mt: 1 }}>
                <Typography variant="body2">
                  <strong>업무의 한줄 소개:</strong> {detail.name}
                </Typography>
                <Typography variant="body2">
                  <strong>시작일:</strong> {formatDate(detail.start_date)}
                </Typography>
                <Typography variant="body2">
                  <strong>종료일:</strong> {formatDate(detail.end_date)}
                </Typography>
                <Typography variant="body2">
                  <strong>상세 설명:</strong>
                </Typography>
                <Typography
                  variant="body2"
                  paragraph
                  sx={{ whiteSpace: "pre-line" }}
                >
                  {detail.content}
                </Typography>
              </Box>
            ))}
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
          이 정보를 "학력" 섹션에 복사하여 붙여넣으세요.
        </Typography>
        {resumeData.educations.map((edu, index) => (
          <Box key={index}>
            <Typography variant="body1">
              <strong>{edu.school_name}</strong>
            </Typography>
            <Typography variant="body2">
              {edu.major_name} | {formatDate(edu.start_date)} -{" "}
              {formatDate(edu.end_date)}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          프로젝트
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          이 정보를 "프로젝트" 섹션에 복사하여 붙여넣으세요.
        </Typography>
        {resumeData.projects.map((project, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="body1">
              <strong>프로젝트 이름:</strong> {project.name}
            </Typography>
            <Typography variant="body1">
              <strong>제작 연도:</strong>{" "}
              {new Date(project.start_date).getFullYear()}
            </Typography>
            <Typography variant="body1">
              <strong>프로젝트 한줄 설명:</strong> {project.summary}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>상세 업무 및 성과:</strong>
            </Typography>
            <Typography
              variant="body2"
              paragraph
              sx={{ whiteSpace: "pre-line", ml: 2 }}
            >
              {project.content}
            </Typography>
            <Typography variant="body1">
              <strong>Github 링크:</strong>{" "}
              <Link
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.github_url}
              </Link>
            </Typography>
            {index < resumeData.projects.length - 1 && (
              <Divider sx={{ my: 2 }} />
            )}
          </Box>
        ))}
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          수상, 자격증
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          이 정보를 "수상, 자격증" 섹션에 복사하여 붙여넣으세요.
        </Typography>
        {resumeData.certificates.map((cert, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>{cert.name}</strong>
            </Typography>
            <Typography variant="body2">
              {cert.issued_by} | {formatDate(cert.issued_date)}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          활동
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          이 정보를 "활동" 섹션에 복사하여 붙여넣으세요.
        </Typography>
        {resumeData.activities.map((activity, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>{activity.name}</strong>
            </Typography>
            <Typography variant="body2">
              {formatDate(activity.start_date)} -{" "}
              {formatDate(activity.end_date)}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ whiteSpace: "pre-line" }}
            >
              {activity.content}
            </Typography>
            {index < resumeData.activities.length - 1 && (
              <Divider sx={{ my: 1 }} />
            )}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

export default ProgrammersResume;
