import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import api from "../../utils/api";
import pr1Image from "../../assets/pr1.png";
import pr2Image from "../../assets/pr2.png";
import pr3Image from "../../assets/pr3.png";
import pr3Jpeg from "../../assets/pr3.jpeg";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 500,
  color: theme.palette.primary.main,
  backgroundColor: "transparent",
  border: "none",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "underline",
  },
}));

function ServiceIntro() {
  const navigate = useNavigate();

  const fetchAndStoreResumeData = async () => {
    try {
      const response = await api.get("/resumes");
      const resumeData = {
        introduction: response.data.introduction || "",
        githubUrl: response.data.github_url || "",
        blogUrl: response.data.blog_url || "",
        educations: Array.isArray(response.data.educations)
          ? response.data.educations.map((edu) => ({
              id: edu.id,
              schoolName: edu.school_name || "",
              majorName: edu.major_name || "",
              startDate: edu.start_date ? edu.start_date.substring(0, 7) : "",
              endDate: edu.end_date ? edu.end_date.substring(0, 7) : "",
            }))
          : [],
        projects: Array.isArray(response.data.projects)
          ? response.data.projects.map((project) => ({
              id: project.id,
              name: project.name || "",
              summary: project.summary || "",
              startDate: project.start_date
                ? project.start_date.substring(0, 7)
                : "",
              endDate: project.end_date ? project.end_date.substring(0, 7) : "",
              content: project.content || "",
              githubUrl: project.github_url || "",
            }))
          : [],
        skills: Array.isArray(response.data.keywords)
          ? response.data.keywords
          : [],
        skillInput: "",
        activities: Array.isArray(response.data.activities)
          ? response.data.activities.map((activity) => ({
              id: activity.id,
              name: activity.name || "",
              startDate: activity.start_date
                ? activity.start_date.substring(0, 7)
                : "",
              endDate: activity.end_date
                ? activity.end_date.substring(0, 7)
                : "",
              content: activity.content || "",
            }))
          : [],
        certifications: Array.isArray(response.data.certificates)
          ? response.data.certificates.map((cert) => ({
              id: cert.id,
              name: cert.name || "",
              issuedBy: cert.issued_by || "",
              issuedDate: cert.issued_date
                ? cert.issued_date.substring(0, 7)
                : "",
            }))
          : [],
        workExperiences: Array.isArray(response.data.work_experiences)
          ? response.data.work_experiences.map((exp) => ({
              id: exp.id,
              companyName: exp.company_name || "",
              department: exp.department || "",
              position: exp.position || "",
              job: exp.job || "",
              startDate: exp.start_date ? exp.start_date.substring(0, 7) : "",
              endDate: exp.end_date ? exp.end_date.substring(0, 7) : "",
              workExperienceDetails: Array.isArray(exp.work_experience_details)
                ? exp.work_experience_details.map((detail) => ({
                    id: detail.id,
                    name: detail.name || "",
                    startDate: detail.start_date
                      ? detail.start_date.substring(0, 7)
                      : "",
                    endDate: detail.end_date
                      ? detail.end_date.substring(0, 7)
                      : "",
                    content: detail.content || "",
                  }))
                : [],
            }))
          : [],
      };
      localStorage.setItem("resumeData", JSON.stringify(resumeData));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const emptyResumeData = {
          introduction: "",
          githubUrl: "",
          blogUrl: "",
          educations: [],
          projects: [],
          skills: [],
          skillInput: "",
          activities: [],
          certifications: [],
          workExperiences: [],
        };
        localStorage.setItem("resumeData", JSON.stringify(emptyResumeData));
      } else {
        console.error("이력서 데이터를 가져오는 데 실패했습니다:", error);
      }
    }
  };

  const imageStyle = {
    width: "80%",
    height: "auto",
    marginBottom: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const handleResumeButtonClick = async () => {
    const isLoggedIn = localStorage.getItem("token"); // 토큰 존재 여부로 로그인 상태 확인

    if (isLoggedIn) {
      await fetchAndStoreResumeData();
      navigate("/resume");
    } else {
      navigate("/login");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          취Go 서비스 소개
        </Typography>
        <Typography variant="body1" paragraph>
          취Go는 대학 생활의 불편함을 해소해주는 서비스에요.
        </Typography>

        {/* 서비스 1: CS 강의 */}
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          1. 기술 면접을 위한 CS 강의
        </Typography>
        <Typography variant="body1" paragraph>
          전공 공부 예습, 복습에 활용할 수 있는 강의를 제공해요.
        </Typography>
        <Box mt={1} mb={2}>
          <StyledButton onClick={() => navigate("/")}>
            회원가입 없이 강의 들으러 가기
          </StyledButton>
        </Box>

        {/* 서비스 2: 학교 공지사항 알림 */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          2. 학교 공지사항 알림
        </Typography>
        <Typography variant="body1" paragraph>
          중요한 학교 공지사항을 놓치지 않도록 실시간으로 알려드려요. 학사일정,
          장학금, 취업 공고 등 필요한 정보를 바로 확인할 수 있어요.
        </Typography>
        <Box sx={{ mb: 3 }}>
          <img src={pr3Jpeg} alt="공지사항 알림 예시" style={imageStyle} />
          <Typography variant="caption" align="center" display="block">
            공지사항 알림 예시
          </Typography>
        </Box>
        <Box mt={1} mb={2}>
          <StyledButton onClick={() => navigate("/telegram-settings")}>
            공지사항 알림 받으러 가기
          </StyledButton>
        </Box>

        {/* 서비스 3: 이력서 변환 */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          3. 구직 플랫폼별 이력서 변환
        </Typography>
        <Typography variant="body1" paragraph>
          구직 플랫폼마다 요구하는 정보와 형식이 다양해서 관리하기가 어려워요.
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ mb: 3 }}>
            <img src={pr1Image} alt="구직 플랫폼 예시 1" style={imageStyle} />
            <Typography variant="caption" align="center" display="block">
              예시 1
            </Typography>
          </Box>
          <Box>
            <img src={pr2Image} alt="구직 플랫폼 예시 2" style={imageStyle} />
            <Typography variant="caption" align="center" display="block">
              예시 2
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" paragraph>
          이력서 정보를 한 번만 등록하면, 다양한 구직 플랫폼에 맞게 이력서를
          자동으로 변환하여 보여줘요. 변환된 이력서의 정보를 쉽게 복사하여 각
          구직 플랫폼에 붙여넣기 할 수 있어, 편리하게 관리할 수 있어요.
        </Typography>
        <Box sx={{ mb: 3 }}>
          <img src={pr3Image} alt="취Go 서비스 예시" style={imageStyle} />
          <Typography variant="caption" align="center" display="block">
            취Go 서비스 예시
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          취Go가 이를 자동으로 변환해주어 여러분의 시간과 노력을 절약해드릴게요!
        </Typography>
        <Box mt={2}>
          <StyledButton onClick={handleResumeButtonClick}>
            이력서 작성하러 가기
          </StyledButton>
        </Box>
      </Paper>
    </Container>
  );
}

export default ServiceIntro;
