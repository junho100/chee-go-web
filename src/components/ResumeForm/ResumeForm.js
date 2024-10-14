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
        skillInput: "", // 새로운 스킬 입력을 위한 필드
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
      console.error("이력서 데이터를 가져오는 데 실패했습니다:", error);
      return null;
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

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
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
