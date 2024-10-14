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
      startDate: "2023년 6월",
      endDate: "현재",
      achievements: [
        {
          name: "클라우드 인프라 구축 및 최적화 프로젝트",
          startDate: "2023년 6월",
          endDate: "2023년 12월",
          details:
            "AWS를 활용한 클라우드 인프라 구축 및 최적화로 시스템 성능 50% 향상 및 운영 비용 30% 절감 달성",
        },
        {
          name: "대규모 트래픽 처리 시스템 설계 및 구현",
          startDate: "2024년 1월",
          endDate: "현재",
          details:
            "초당 100만 요청을 처리할 수 있는 확장 가능한 아키텍처 설계 및 구현, 시스템 안정성 99.99% 달성",
        },
        {
          name: "개발 프로세스 개선",
          startDate: "2023년 9월",
          endDate: "2023년 11월",
          details:
            "CI/CD 파이프라인 구축 및 코드 리뷰 프로세스 개선으로 팀 생산성 30% 향상",
        },
      ],
    },
    {
      company: "테크 이노베이션",
      position: "Senior Software Engineer",
      startDate: "2020년 3월",
      endDate: "2023년 5월",
      achievements: [
        {
          name: "대규모 분산 시스템 설계 및 구현",
          startDate: "2020년 3월",
          endDate: "2021년 6월",
          details:
            "Kubernetes와 Docker를 활용한 마이크로서비스 아키텍처 도입으로 시스템 확장성 200% 개선",
        },
        {
          name: "실시간 데이터 처리 파이프라인 구축",
          startDate: "2021년 7월",
          endDate: "2022년 12월",
          details:
            "Apache Kafka와 Spark를 이용한 실시간 데이터 처리 파이프라인 구축으로 데이터 분석 효율성 50% 향상",
        },
      ],
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
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="h6">
              <strong>{exp.company}</strong>
            </Typography>
            <Typography variant="body1">
              {exp.position} | {exp.startDate} - {exp.endDate}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              주요 성과:
            </Typography>
            {exp.achievements.map((achievement, achIndex) => (
              <Box key={achIndex} sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>{achievement.name}</strong>
                </Typography>
                <Typography variant="body2">
                  {achievement.startDate} - {achievement.endDate}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {achievement.details}
                </Typography>
              </Box>
            ))}
            {index < mockData.experience.length - 1 && (
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
