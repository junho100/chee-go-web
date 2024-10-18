import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Projects from "./Projects";
import Skills from "./Skills";
import Activities from "./Activities";
import Certifications from "./Certifications";
import WorkExperience from "./WorkExperience";
import api from "../../utils/api";

const validationSchema = Yup.object().shape({
  // 여기에 유효성 검사 규칙을 추가합니다
});

// 새로운 컴포넌트: LocalStorageUpdater
function LocalStorageUpdater() {
  const { values } = useFormikContext();

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(values));
  }, [values]);

  return null;
}

function ResumeForm() {
  const [initialValues, setInitialValues] = useState(null);
  const formikRef = useRef();

  const fetchResumeData = async () => {
    try {
      const response = await api.get("/resumes");
      const newValues = {
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
      return newValues;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("이력서 데이터가 없습니다. 빈 데이터를 생성합니다.");
        return {
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
      } else {
        console.error("이력서 데이터를 가져오는 데 실패했습니다:", error);
        return null;
      }
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const savedValues = localStorage.getItem("resumeData");
      if (savedValues) {
        setInitialValues(JSON.parse(savedValues));
      } else {
        const newValues = await fetchResumeData();
        if (newValues) {
          setInitialValues(newValues);
          localStorage.setItem("resumeData", JSON.stringify(newValues));
        }
      }
    };

    loadInitialData();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const savedData = JSON.parse(localStorage.getItem("resumeData"));
      if (!savedData) {
        throw new Error("저장된 이력서 데이터가 없습니다.");
      }

      const formattedValues = {
        introduction: savedData.introduction,
        github_url: savedData.githubUrl,
        blog_url: savedData.blogUrl,
        educations: savedData.educations.map((edu) => ({
          school_name: edu.schoolName,
          major_name: edu.majorName,
          start_date: `${edu.startDate}-01T00:00:00Z`,
          end_date: `${edu.endDate}-01T00:00:00Z`,
        })),
        projects: savedData.projects.map((project) => ({
          name: project.name,
          summary: project.summary, // 한줄 요약 추가
          start_date: `${project.startDate}-01T00:00:00Z`,
          end_date: `${project.endDate}-01T00:00:00Z`,
          content: project.content,
          github_url: project.githubUrl,
        })),
        activities: savedData.activities.map((activity) => ({
          name: activity.name,
          content: activity.content,
          start_date: `${activity.startDate}-01T00:00:00Z`,
          end_date: `${activity.endDate}-01T00:00:00Z`,
        })),
        certificates: savedData.certifications.map((cert) => ({
          name: cert.name,
          issued_by: cert.issuedBy,
          issued_date: `${cert.issuedDate}-01T00:00:00Z`,
        })),
        work_experiences: savedData.workExperiences.map((exp) => ({
          company_name: exp.companyName,
          department: exp.department,
          position: exp.position,
          job: exp.job,
          start_date: `${exp.startDate}-01T00:00:00Z`,
          end_date: `${exp.endDate}-01T00:00:00Z`,
          details: exp.workExperienceDetails.map((detail) => ({
            name: detail.name,
            start_date: `${detail.startDate}-01T00:00:00Z`,
            end_date: `${detail.endDate}-01T00:00:00Z`,
            content: detail.content,
          })),
        })),
        keywords: savedData.skills,
      };

      const response = await api.post("/resumes", formattedValues);
      console.log("이력서가 성공적으로 저장되었습니다:", response.data);
      alert("이력서가 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("이력서 저장 중 오류가 발생했습니다:", error);
      alert("이력서 저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoadResume = async () => {
    const isConfirmed = window.confirm(
      "기존에 작성한 이력을 덮어씁니다. 실행하겠습니까?"
    );
    if (isConfirmed) {
      const newValues = await fetchResumeData();
      if (newValues && formikRef.current) {
        formikRef.current.setValues(newValues);
        localStorage.setItem("resumeData", JSON.stringify(newValues));
      }
    }
  };

  if (!initialValues) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          이력서 등록
        </Typography>
        <Box mb={2}>
          <Button variant="outlined" onClick={handleLoadResume}>
            저장된 이력서 불러오기
          </Button>
        </Box>
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <LocalStorageUpdater />
              <PersonalInfo />
              <Education />
              <Projects />
              <Skills />
              <Activities />
              <Certifications />
              <WorkExperience />
              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  저장
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default ResumeForm;
