import React from "react";
import { Box, Typography, Paper, Divider, Chip } from "@mui/material";

const mockData = {
  name: "홍길동",
  title: "Project Technical Lead",
  introduction:
    "10년 이상의 소프트웨어 개발 경험을 가진 기술 리더입니다. 클라우드 인프라 구축 및 최적화에 전문성을 가지고 있으며, 팀을 이끌어 성공적인 프로젝트 완수를 이루어냈습니다. 새로운 기술에 대한 열정과 끊임없는 학습으로 혁신적인 솔루션을 제공하는 것이 제 목표입니다.",
  experience: [
    {
      company: "소프트스퀘어드",
      position: "Project Technical Lead",
      period: "2023년 6월 - 현재",
      description:
        "- 클라우드 인프라 구축 및 최적화 프로젝트 리드\n- 대규모 트래픽 처리 시스템 설계 및 구현\n- 팀 생산성 30% 향상을 위한 개발 프로세스 개선",
    },
    {
      company: "테크 이노베이션",
      position: "Senior Software Engineer",
      period: "2020년 3월 - 2023년 5월",
      description:
        "- 대규모 분산 시스템 설계 및 구현\n- 마이크로서비스 아키텍처 도입으로 시스템 확장성 200% 개선\n- 실시간 데이터 처리 파이프라인 구축으로 데이터 분석 효율성 50% 향상",
    },
  ],
  education: [
    {
      school: "서울대학교",
      degree: "컴퓨터공학 학사",
      period: "2010년 3월 - 2014년 2월",
    },
  ],
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "Python",
    "Java",
    "Spring Boot",
    "MongoDB",
    "PostgreSQL",
  ],
  awards: [
    {
      title: "AWS Certified Solutions Architect - Professional",
      organization: "Amazon Web Services",
      date: "2022년 5월",
    },
    {
      title: "올해의 혁신적인 프로젝트상",
      organization: "한국소프트웨어산업협회",
      date: "2021년 12월",
    },
  ],
};

function WantedResume() {
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
          {mockData.introduction}
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          경력
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          이 정보를 "경력" 섹션에 복사하여 붙여넣으세요.
        </Typography>
        {mockData.experience.map((exp, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>{exp.company}</strong>
            </Typography>
            <Typography variant="body2">
              {exp.position} | {exp.period}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ whiteSpace: "pre-line", mt: 1 }}
            >
              {exp.description}
            </Typography>
            {index < mockData.experience.length - 1 && (
              <Divider sx={{ my: 1 }} />
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
        {mockData.education.map((edu, index) => (
          <Box key={index}>
            <Typography variant="body1">
              <strong>{edu.school}</strong>
            </Typography>
            <Typography variant="body2">
              {edu.degree} | {edu.period}
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
          {mockData.skills.map((skill, index) => (
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
        {mockData.awards.map((award, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>{award.title}</strong>
            </Typography>
            <Typography variant="body2">
              {award.organization} | {award.date}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

export default WantedResume;
