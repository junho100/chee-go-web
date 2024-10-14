import React from "react";
import { TextField, Typography, Box, Button, IconButton } from "@mui/material";
import { Field, FieldArray, useFormikContext } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";

function Education() {
  const { values } = useFormikContext();

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        학력
      </Typography>
      <FieldArray name="educations">
        {({ push, remove }) => (
          <div>
            {values.educations && values.educations.length > 0
              ? values.educations.map((education, index) => (
                  <Box key={education.id || index} mb={2}>
                    <Field
                      name={`educations.${index}.schoolName`}
                      as={TextField}
                      fullWidth
                      label="학교명"
                      variant="outlined"
                    />
                    <Box mt={2}>
                      <Field
                        name={`educations.${index}.majorName`}
                        as={TextField}
                        fullWidth
                        label="전공명"
                        variant="outlined"
                      />
                    </Box>
                    <Box mt={2}>
                      <Field
                        name={`educations.${index}.startDate`}
                        as={TextField}
                        fullWidth
                        label="시작 날짜"
                        variant="outlined"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                    <Box mt={2}>
                      <Field
                        name={`educations.${index}.endDate`}
                        as={TextField}
                        fullWidth
                        label="종료 날짜"
                        variant="outlined"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                    <IconButton onClick={() => remove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))
              : null}
            <Button
              type="button"
              variant="outlined"
              onClick={() =>
                push({
                  schoolName: "",
                  majorName: "",
                  startDate: "",
                  endDate: "",
                })
              }
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
