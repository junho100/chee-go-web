import React from "react";
import { TextField, Typography, Box, Button, IconButton } from "@mui/material";
import { Field, FieldArray } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";

function Projects() {
  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        프로젝트
      </Typography>
      <FieldArray name="projects">
        {({ push, remove, form }) => (
          <div>
            {form.values.projects.map((_, index) => (
              <Box key={index} mb={2}>
                <Field
                  name={`projects.${index}.name`}
                  as={TextField}
                  fullWidth
                  label="프로젝트명"
                  variant="outlined"
                />
                <Box mt={2}>
                  <Field
                    name={`projects.${index}.startDate`}
                    as={TextField}
                    fullWidth
                    label="시작 날짜"
                    variant="outlined"
                    type="month"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
                <Box mt={2}>
                  <Field
                    name={`projects.${index}.endDate`}
                    as={TextField}
                    fullWidth
                    label="종료 날짜"
                    variant="outlined"
                    type="month"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
                <Box mt={2}>
                  <Field
                    name={`projects.${index}.description`}
                    as={TextField}
                    fullWidth
                    multiline
                    rows={4}
                    label="내용"
                    variant="outlined"
                  />
                </Box>
                <Box mt={2}>
                  <Field
                    name={`projects.${index}.githubUrl`}
                    as={TextField}
                    fullWidth
                    label="Github URL"
                    variant="outlined"
                  />
                </Box>
                <IconButton onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              type="button"
              variant="outlined"
              onClick={() =>
                push({
                  name: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                  githubUrl: "",
                })
              }
            >
              프로젝트 추가
            </Button>
          </div>
        )}
      </FieldArray>
    </Box>
  );
}

export default Projects;
