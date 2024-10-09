import React from "react";
import { TextField, Typography, Box, Button, IconButton } from "@mui/material";
import { Field, FieldArray } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";

function Education() {
  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        학력
      </Typography>
      <FieldArray name="education">
        {({ push, remove, form }) => (
          <div>
            {form.values.education.map((_, index) => (
              <Box key={index} mb={2}>
                <Field
                  name={`education.${index}.schoolName`}
                  as={TextField}
                  fullWidth
                  label="학교명"
                  variant="outlined"
                />
                <Box mt={2}>
                  <Field
                    name={`education.${index}.major`}
                    as={TextField}
                    fullWidth
                    label="전공명"
                    variant="outlined"
                  />
                </Box>
                <Box mt={2}>
                  <Field
                    name={`education.${index}.period`}
                    as={TextField}
                    fullWidth
                    label="기간"
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
              onClick={() => push({ schoolName: "", major: "", period: "" })}
            >
              학력 추가
            </Button>
          </div>
        )}
      </FieldArray>
    </Box>
  );
}

export default Education;
