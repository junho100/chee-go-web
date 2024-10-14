import React from "react";
import { TextField, Typography, Box, Chip, Button } from "@mui/material";
import { Field, FieldArray, useFormikContext } from "formik";

function Skills() {
  const { values } = useFormikContext();

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        보유 기술 키워드
      </Typography>
      <FieldArray name="skills">
        {({ push, remove }) => (
          <div>
            <Field name="skillInput">
              {({ field, form }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="기술 키워드 입력"
                  variant="outlined"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const value = e.target.value.trim();
                      if (value && !form.values.skills.includes(value)) {
                        push(value);
                        form.setFieldValue("skillInput", "");
                      }
                    }
                  }}
                />
              )}
            </Field>
            <Box mt={2}>
              {values.skills && values.skills.length > 0
                ? values.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => remove(index)}
                      style={{ margin: "0 4px 4px 0" }}
                    />
                  ))
                : null}
            </Box>
            <Box mt={2}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  const value = values.skillInput.trim();
                  if (value && !values.skills.includes(value)) {
                    push(value);
                    values.skillInput = "";
                  }
                }}
              >
                기술 추가
              </Button>
            </Box>
          </div>
        )}
      </FieldArray>
    </Box>
  );
}

export default Skills;
