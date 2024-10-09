import React from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";

const mockData = {
  name: "홍길동",
  title: "Project Technical Lead",
  location: "대한민국 서울",
  profileSummary: "열정적이고 혁신적인 프로젝트 리더",
  introduction:
    "10년 이상의 소프트웨어 개발 경험을 가진 기술 리더입니다. 클라우드 인프라 구축 및 최적화에 전문성을 가지고 있으며, 팀을 이끌어 성공적인 프로젝트 완수를 이루어냈습니다.",
  experience: [
    {
      title: "Project Technical Lead",
      company: "소프트스퀘어드",
      duration: "2023년 6월 - 현재",
      description:
        "프로젝트 클라우드 인프라 구축 운영\n- L7 switch 이용한 path based service routing 구축\n- aws lambda 이용한 고용량 대량 이미지 업로드 리사이징 아키텍처 도입 및 렌더링 최적화 (스토리지 비용 절감)",
    },
    {
      title: "Senior Software Engineer",
      company: "테크 이노베이션",
      duration: "2020년 3월 - 2023년 5월",
      description:
        "대규모 분산 시스템 설계 및 구현\n- 마이크로서비스 아키텍처 도입으로 시스템 확장성 개선\n- 실시간 데이터 처리 파이프라인 구축으로 데이터 분석 효율성 향상",
    },
    {
      title: "Software Engineer",
      company: "스타트업 솔루션즈",
      duration: "2017년 1월 - 2020년 2월",
      description:
        "웹 애플리케이션 개발 및 유지보수\n- React와 Node.js를 이용한 풀스택 개발\n- CI/CD 파이프라인 구축으로 배포 프로세스 자동화",
    },
  ],
  education: [
    {
      school: "서울대학교",
      degree: "컴퓨터공학 학사",
      duration: "2010년 3월 - 2014년 2월",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect - Professional",
      issuer: "Amazon Web Services",
      date: "2022년 5월",
    },
    {
      name: "Google Cloud Professional Cloud Architect",
      issuer: "Google",
      date: "2021년 8월",
    },
    {
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "The Linux Foundation",
      date: "2020년 11월",
    },
  ],
  projects: [
    {
      name: "대규모 이커머스 플랫폼 리뉴얼",
      duration: "2022년 1월 - 2022년 12월",
      description:
        "1000만 사용자를 대상으로 한 이커머스 플랫폼의 전면 리뉴얼 프로젝트 리드\n- 마이크로서비스 아키텍처 도입으로 시스템 확장성 200% 향상\n- 페이지 로딩 속도 50% 개선으로 사용자 경험 향상",
    },
    {
      name: "실시간 데이터 분석 시스템 구축",
      duration: "2020년 6월 - 2021년 5월",
      description:
        "대용량 로그 데이터의 실시간 처리 및 분석 시스템 구축\n- Apache Kafka와 Elasticsearch를 활용한 데이터 파이프라인 구축\n- 실시간 대시보드 개발로 비즈니스 인사이트 도출 시간 단축",
    },
    {
      name: "모바일 결제 시스템 개발",
      duration: "2018년 3월 - 2019년 2월",
      description:
        "안전하고 편리한 모바일 결제 시스템 개발\n- 블록체인 기술을 활용한 거래 안정성 확보\n- 생체인식 기술 도입으로 사용자 인증 프로세스 간소화",
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
    "Redis",
    "GraphQL",
    "CI/CD",
    "Agile/Scrum",
  ],
};

function LinkedInResume() {
  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        링크드인 이력서 변환
      </Typography>
      <Typography variant="body1" paragraph>
        아래의 정보를 링크드인의 해당 섹션에 복사하여 붙여넣으세요.
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          프로필 정보
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          이 정보를 링크드인 프로필의 상단 섹션에 입력하세요.
        </Typography>
        <Typography variant="body1">이름: {mockData.name}</Typography>
        <Typography variant="body1">직함: {mockData.title}</Typography>
        <Typography variant="body1">위치: {mockData.location}</Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          소개
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          이 정보를 "소개" 섹션에 복사하여 붙여넣으세요.
        </Typography>
        <Typography variant="body1" paragraph>
          {mockData.introduction}
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          경력사항
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          각 경력 항목을 "경력" 섹션에 개별적으로 추가하세요.
        </Typography>
        {mockData.experience.map((exp, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>직함:</strong> {exp.title}
            </Typography>
            <Typography variant="body1">
              <strong>회사:</strong> {exp.company}
            </Typography>
            <Typography variant="body1">
              <strong>기간:</strong> {exp.duration}
            </Typography>
            <Typography variant="body1">
              <strong>설명:</strong>
            </Typography>
            <Typography variant="body1" paragraph>
              {exp.description}
            </Typography>
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
        {mockData.education.map((edu, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>학교:</strong> {edu.school}
            </Typography>
            <Typography variant="body1">
              <strong>학위:</strong> {edu.degree}
            </Typography>
            <Typography variant="body1">
              <strong>기간:</strong> {edu.duration}
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
        {mockData.certifications.map((cert, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>자격증명:</strong> {cert.name}
            </Typography>
            <Typography variant="body1">
              <strong>발급기관:</strong> {cert.issuer}
            </Typography>
            <Typography variant="body1">
              <strong>취득일:</strong> {cert.date}
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
        {mockData.projects.map((project, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>프로젝트명:</strong> {project.name}
            </Typography>
            <Typography variant="body1">
              <strong>기간:</strong> {project.duration}
            </Typography>
            <Typography variant="body1">
              <strong>설명:</strong>
            </Typography>
            <Typography variant="body1" paragraph>
              {project.description}
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
          {mockData.skills.map((skill, index) => (
            <Chip key={index} label={skill} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default LinkedInResume;
