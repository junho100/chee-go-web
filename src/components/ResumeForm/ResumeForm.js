import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Projects from "./Projects";
import Skills from "./Skills";
import Activities from "./Activities";
import Certifications from "./Certifications";
import WorkExperience from "./WorkExperience";

const validationSchema = Yup.object().shape({
  // 여기에 유효성 검사 규칙을 추가합니다
});

const initialValues = {
  introduction: "",
  education: [{ schoolName: "", major: "", period: "" }],
  projects: [{ name: "", period: "", description: "", githubUrl: "" }],
  skills: [],
  activities: [{ name: "", period: "", details: "" }],
  certifications: [{ name: "", organization: "", date: "" }],
  workExperience: [
    {
      companyName: "",
      department: "",
      position: "",
      jobTitle: "",
      tasks: [{ title: "", period: "", details: "" }],
    },
  ],
  githubUrl: "",
  blogUrl: "",
};

function ResumeForm() {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          이력서 등록
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
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
                  제출
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
