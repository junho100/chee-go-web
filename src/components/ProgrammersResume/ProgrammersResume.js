import React from "react";
import { Box, Typography, Paper, Divider, Link } from "@mui/material";

const mockData = {
  name: "홍길동",
  title: "Project Technical Lead",
  experience: [
    {
      company: "소프트스퀘어드",
      position: "Project Technical Lead",
      startDate: "2023년 6월",
      details: [
        {
          title: "클라우드 인프라 구축 및 최적화",
          startDate: "2023년 6월",
          endDate: "현재",
          description:
            "- L7 switch 이용한 path based service routing 구축\n- aws lambda 이용한 고용량 대량 이미지 업로드 리사이징 아키텍처 도입 및 렌더링 최적화 (스토리지 비용 절감)",
        },
        {
          title: "대규모 트래픽 처리 시스템 개발",
          startDate: "2023년 7월",
          endDate: "2023년 12월",
          description:
            "- 초당 10만 건의 트랜잭션을 처리할 수 있는 시스템 설계 및 구현\n- 캐싱 전략 도입으로 데이터베이스 부하 70% 감소",
        },
      ],
    },
    {
      company: "테크 이노베이션",
      position: "Senior Software Engineer",
      startDate: "2020년 3월",
      details: [
        {
          title: "대규모 분산 시스템 설계 및 구현",
          startDate: "2020년 3월",
          endDate: "2023년 5월",
          description:
            "- 마이크로서비스 아키텍처 도입으로 시스템 확장성 개선\n- 실시간 데이터 처리 파이프라인 구축으로 데이터 분석 효율성 향상",
        },
      ],
    },
  ],
  education: [
    {
      school: "서울대학교",
      degree: "컴퓨터공학 학사",
      duration: "2010년 3월 - 2014년 2월",
    },
  ],
  projects: [
    {
      name: "대규모 이커머스 플랫폼 리뉴얼",
      year: "2022",
      summary:
        "1000만 사용자를 대상으로 한 이커머스 플랫폼의 전면 리뉴얼 프로젝트",
      details:
        "- 마이크로서비스 아키텍처 도입으로 시스템 확장성 200% 향상\n- 페이지 로딩 속도 50% 개선으로 사용자 경험 향상\n- 실시간 재고 관리 시스템 구축으로 재고 정확도 99.9% 달성\n- A/B 테스팅 프레임워크 구축으로 사용자 인터페이스 최적화",
      githubLink: "https://github.com/username/ecommerce-platform",
    },
    {
      name: "실시간 데이터 분석 시스템",
      year: "2021",
      summary: "대용량 로그 데이터의 실시간 처리 및 분석 시스템 구축 프로젝트",
      details:
        "- Apache Kafka와 Elasticsearch를 활용한 데이터 파이프라인 구축\n- 실시간 대시보드 개발로 비즈니스 인사이트 도출 시간 90% 단축\n- 머신러닝 모델 통합으로 이상 감지 및 예측 분석 기능 추가\n- 데이터 처리 속도 300% 향상, 시스템 안정성 99.99% 달성",
      githubLink: "https://github.com/username/realtime-data-analysis",
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
  ],
  activities: [
    {
      name: "오픈소스 프로젝트 기여",
      description: "Kubernetes 프로젝트에 기여: 버그 수정 및 문서화 개선",
      duration: "2021년 - 현재",
    },
    {
      name: "기술 컨퍼런스 발표",
      description: 'AWS re:Invent 2022 - "대규모 분산 시스템 설계 사례" 발표',
      date: "2022년 11월",
    },
  ],
};

function ProgrammersResume() {
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
        {mockData.experience.map((exp, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="body1">
              <strong>회사명:</strong> {exp.company}
            </Typography>
            <Typography variant="body1">
              <strong>직무:</strong> {exp.position}
            </Typography>
            <Typography variant="body1">
              <strong>업무 시작일:</strong> {exp.startDate}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>상세 업무 및 성과:</strong>
            </Typography>
            {exp.details.map((detail, detailIndex) => (
              <Box key={detailIndex} sx={{ ml: 2, mt: 1 }}>
                <Typography variant="body2">
                  <strong>업무의 한줄 소개:</strong> {detail.title}
                </Typography>
                <Typography variant="body2">
                  <strong>시작일:</strong> {detail.startDate}
                </Typography>
                <Typography variant="body2">
                  <strong>종료일:</strong> {detail.endDate}
                </Typography>
                <Typography variant="body2">
                  <strong>상세 설명:</strong>
                </Typography>
                <Typography
                  variant="body2"
                  paragraph
                  sx={{ whiteSpace: "pre-line" }}
                >
                  {detail.description}
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
              {edu.degree} | {edu.duration}
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
        {mockData.projects.map((project, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="body1">
              <strong>프로젝트 이름:</strong> {project.name}
            </Typography>
            <Typography variant="body1">
              <strong>제작 연도:</strong> {project.year}
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
              {project.details}
            </Typography>
            <Typography variant="body1">
              <strong>Github 링크:</strong>{" "}
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.githubLink}
              </Link>
            </Typography>
            {index < mockData.projects.length - 1 && <Divider sx={{ my: 2 }} />}
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
        {mockData.certifications.map((cert, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <Typography variant="body1">
              <strong>{cert.name}</strong>
            </Typography>
            <Typography variant="body2">
              {cert.issuer} | {cert.date}
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
        {mockData.activities.map((activity, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>{activity.name}</strong>
            </Typography>
            <Typography variant="body2">
              {activity.duration || activity.date}
            </Typography>
            <Typography variant="body1" paragraph>
              {activity.description}
            </Typography>
            {index < mockData.activities.length - 1 && (
              <Divider sx={{ my: 1 }} />
            )}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

export default ProgrammersResume;
