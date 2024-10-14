import React from "react";
import { TextField, Typography, Box } from "@mui/material";
import { Field, useFormikContext } from "formik";

function PersonalInfo() {
  const { values } = useFormikContext();

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        개인 정보
      </Typography>
      <Field
        name="introduction"
        as={TextField}
        fullWidth
        multiline
        rows={4}
        label="간략한 소개"
        variant="outlined"
        value={values.introduction}
      />
      <Box mt={2}>
        <Field
          name="githubUrl"
          as={TextField}
          fullWidth
          label="Github URL"
          variant="outlined"
          value={values.githubUrl}
        />
      </Box>
      <Box mt={2}>
        <Field
          name="blogUrl"
          as={TextField}
          fullWidth
          label="블로그 URL"
          variant="outlined"
          value={values.blogUrl}
        />
      </Box>
    </Box>
  );
}

export default PersonalInfo;
