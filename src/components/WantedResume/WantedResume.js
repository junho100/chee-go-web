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

function WantedResume() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await api.get("/resumes/wanted");
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
        원티드 이력서 변환
      </Typography>
      <Typography variant="body1" paragraph>
        아래의 정보를 원티드 이력서 각 섹션에 복사하여 붙여넣으세요.
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          간단 소개글
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          이 정보를 "간단 소개글" 섹션에 복사하여 붙여넣으세요.
        </Typography>
        <Typography variant="body1" paragraph>
          {resumeData.Introduction}
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          경력
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          이 정보를 "경력" 섹션에 복사하여 붙여넣으세요.
        </Typography>
        {resumeData.WorkExperiences.map((exp, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="h6">
              <strong>{exp.CompanyName}</strong>
            </Typography>
            <Typography variant="body1">
              {exp.Position} | {exp.StartDate.substring(0, 7)} -{" "}
              {exp.EndDate.substring(0, 7)}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              주요 성과:
            </Typography>
            {exp.Details.map((detail, detailIndex) => (
              <Box key={detailIndex} sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>{detail.Name}</strong>
                </Typography>
                <Typography variant="body2">
                  {detail.StartDate.substring(0, 7)} -{" "}
                  {detail.EndDate.substring(0, 7)}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {detail.Content}
                </Typography>
              </Box>
            ))}
            {index < resumeData.WorkExperiences.length - 1 && (
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
        {resumeData.Educations.map((edu, index) => (
          <Box key={index}>
            <Typography variant="body1">
              <strong>{edu.SchoolName}</strong>
            </Typography>
            <Typography variant="body2">
              {edu.MajorName} | {edu.StartDate.substring(0, 7)} -{" "}
              {edu.EndDate.substring(0, 7)}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          스킬
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          이 정보를 "스킬" 섹션에 복사하여 붙여넣으세요.
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {resumeData.Skills.map((skill, index) => (
            <Chip key={index} label={skill} />
          ))}
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          수상 및 기타
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          이 정보를 "수상 및 기타" 섹션에 복사하여 붙여넣으세요.
        </Typography>
        {resumeData.Certificates.map((cert, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {cert.Name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {cert.StartDate.substring(0, 7)}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, whiteSpace: "pre-wrap" }}>
              {cert.Content}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

export default WantedResume;
